import os
import threading
import time as t
from datetime import datetime, time, timedelta
import cv2
import face_recognition
import mysql.connector
import numpy as np

# ------------- Configuration -------------
STUDENT_IMAGE_FOLDER = r"C:/Users/Aniruddha/Downloads/Tennet/SnapIn.AI/Student_Images"

# optional: STUDENT_IMAGE_URL_BASE if you want to download images from a server
# STUDENT_IMAGE_URL_BASE = "https://dhanwardhan.com/snapin/Student_Images/"

# DB credentials
DB_CONFIG = {
    "host": "dhanwardhan.com",
    "user": "dhanwusu_AuAtt_Admin",
    "password": "Dhan_AuAtt@321",
    "database": "dhanwusu_AuAtt_sys_db",
    "raise_on_warnings": True,
}

# ------------- Globals -------------
running_status = {}  # timetable_id -> bool (thread should run)
cached_faces = {"encodings": [], "ids": [], "last_loaded": None}
marked_students_by_class = {}  # timetable_id -> set(roll_no)
marked_lock = threading.Lock()
cache_lock = threading.Lock()  

# ------------- DB helper -------------
def create_connection():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        if conn.is_connected():
            return conn
    except mysql.connector.Error as e:
        print(f"❌ Error connecting to MySQL: {e}")
    return None

# ------------- Face cache loader -------------
def load_faces_from_folder(folder_path, reload_interval_minutes=60):
    global cached_faces
    # Use a lock to prevent multiple threads from reloading the cache at once
    with cache_lock:
        now = datetime.now()
        # Check if cache is still valid inside the lock
        if cached_faces["last_loaded"] and (now - cached_faces["last_loaded"]) < timedelta(minutes=reload_interval_minutes):
            print("♻️ Using cached face encodings.")
            return cached_faces["encodings"], cached_faces["ids"]

        encodings = []
        ids = []

        if not os.path.isdir(folder_path):
            print(f"❌ Image folder not found at '{folder_path}'")
            return encodings, ids

        print(f"🧠 Loading faces from {folder_path}...")
        for fname in os.listdir(folder_path):
            if fname.lower().endswith((".jpg", ".jpeg", ".png")):
                path = os.path.join(folder_path, fname)
                roll_no = os.path.splitext(fname)[0]
                try:
                    img = face_recognition.load_image_file(path)
                    e = face_recognition.face_encodings(img)
                    if e:
                        encodings.append(e[0])
                        ids.append(roll_no)
                    else:
                        print(f"⚠️ No faces found in {fname}. Skipping.")
                except Exception as ex:
                    print(f"❌ Error processing {fname}: {ex}")

        cached_faces["encodings"] = encodings
        cached_faces["ids"] = ids
        cached_faces["last_loaded"] = now
        print(f"✅ Loaded {len(ids)} known faces (refreshed).")
        return encodings, ids

# ------------- Attendance DB marker -------------
def mark_attendance_in_db(student_roll_no, timetable_id):
    """Marks attendance only if the student belongs to the class/division of the timetable."""
    connection = create_connection()
    if not connection:
        return

    cursor = None
    try:
        cursor = connection.cursor(dictionary=True, buffered=True)
        today_date = datetime.now().date()

        # Get timetable's division_id (logic is unchanged)
        cursor.execute("""
            SELECT d.division_id, CONCAT(y.year_name, ' - Div ', d.division_name) AS class_name
            FROM Timetable tt
            JOIN Division d ON tt.division_id = d.division_id
            JOIN Year y ON d.year_id = y.year_id
            WHERE tt.timetable_id = %s
        """, (timetable_id,))
        timetable_info = cursor.fetchone()

        if not timetable_info:
            return

        timetable_division_id = timetable_info["division_id"]
        timetable_class_name = timetable_info["class_name"]

        # Find student details (logic is unchanged)
        cursor.execute("""
            SELECT s.student_id, s.roll_no, s.student_name, d.division_id,
                   CONCAT(y.year_name, ' - Div ', d.division_name) AS student_class
            FROM Student s
            JOIN Division d ON s.division_id = d.division_id
            JOIN Year y ON d.year_id = y.year_id
            WHERE s.roll_no = %s
        """, (student_roll_no,))
        student = cursor.fetchone()

        if not student:
            return

        student_id = student["student_id"]
        roll_no = student["roll_no"]
        name = student["student_name"]

        # Skip if student belongs to a different division (logic is unchanged)
        if student["division_id"] != timetable_division_id:
            print(f"🚫 Skipping Roll No {roll_no} ({name}): "
                  f"belongs to {student['student_class']}, not {timetable_class_name}")
            return

        # --- CHANGE ---
        # The database check for duplicates has been removed.
        # We now rely on the in-memory set from run_camera.

        # ✅ Insert attendance
        try:
            insert_query = """
                INSERT INTO Attendance (student_id, timetable_id, date, status)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(insert_query, (student_id, timetable_id, today_date, 'Present'))
            connection.commit()
            print(f"✅ Attendance MARKED for Roll No: {roll_no} ({name}) [{timetable_class_name}]")
        
        except mysql.connector.Error as err:
            # This handles the edge case where the script restarts and tries to insert a duplicate.
            # The database's UNIQUE constraint will reject it.
            if err.errno == 1062: # Error code for 'Duplicate entry'
                 print(f"ℹ️ DB rejected duplicate entry for Roll No: {roll_no} ({name}). Already marked.")
            else:
                 print(f"❌ DB Insert Error for {roll_no}: {err}")


    except mysql.connector.Error as e:
        print(f"❌ Database Error: {e}")
    finally:
        if connection and connection.is_connected():
            if cursor:
                cursor.close()
            connection.close()

# ------------- Camera thread (with bounding boxes) -------------
def run_camera(camera_url, class_name, timetable_id):
    """
    Runs the camera loop for a single class.
    Shows an OpenCV window with bounding boxes and roll numbers.
    Prevents duplicate marking per timetable_id using marked_students_by_class.
    """
    global running_status, marked_students_by_class, marked_lock

    try:
        try:
            camera_source = int(camera_url)
        except Exception:
            camera_source = camera_url  # IP stream or complex string

        print(f"🎥 Initializing camera for {class_name} → {camera_source}")
        cap = cv2.VideoCapture(camera_source)
        # optional: set resolution to reduce load
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        cap.set(cv2.CAP_PROP_FPS, 10)

        if not cap.isOpened():
            print(f"❌ Cannot access camera {camera_source} for {class_name}")
            running_status[timetable_id] = False
            return

        print(f"✅ Camera started for {class_name} ({camera_source})")

        # Load known faces (uses cache)
        known_encodings, known_ids = load_faces_from_folder(STUDENT_IMAGE_FOLDER)
        if not known_ids:
            print(f"⚠️ No known faces loaded. Stopping camera for {class_name}.")
            running_status[timetable_id] = False
            cap.release()
            return

        # window_name = f"{class_name} (ID {timetable_id})"
        # cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)

        # Ensure a per-class set exists
        with marked_lock:
            if timetable_id not in marked_students_by_class:
                marked_students_by_class[timetable_id] = set()

        while running_status.get(timetable_id, False):
            ret, frame = cap.read()
            if not ret:
                t.sleep(0.1)
                continue

            # Detect on smaller frame for speed
            small = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
            rgb_small = cv2.cvtColor(small, cv2.COLOR_BGR2RGB)

            face_locs = face_recognition.face_locations(rgb_small,model="cnn")
            face_encs = face_recognition.face_encodings(rgb_small, face_locs)

            # Quick stats for overlay
            detected_count = len(face_locs)
            labeled = 0

            for (top, right, bottom, left), enc in zip(face_locs, face_encs):
                if len(known_encodings) == 0:
                    continue
                dists = face_recognition.face_distance(known_encodings, enc)
                best_idx = np.argmin(dists)
                match = False
                if len(dists) > 0:
                    match = face_recognition.compare_faces([known_encodings[best_idx]], enc, tolerance=0.6)[0]

                label_text = "Unknown"

                if match:
                    student_roll_no = known_ids[best_idx]  # filename-based roll_no
                    # thread-safe check & add
                    added = False
                    with marked_lock:
                        sset = marked_students_by_class.setdefault(timetable_id, set())
                        if student_roll_no not in sset:
                            sset.add(student_roll_no)
                            added = True

                    # If newly added, mark in DB
                    if added:
                        # mark attendance asynchronously to avoid blocking detection loop
                        threading.Thread(target=mark_attendance_in_db, args=(student_roll_no, timetable_id), daemon=True).start()

                    # label for display (we display roll_no)
                    label_text = str(student_roll_no)
                    labeled += 1

                # scale coords back to full frame
                top *= 4; right *= 4; bottom *= 4; left *= 4

                # draw box & label
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
                cv2.rectangle(frame, (left, bottom - 22), (right, bottom), (0, 255, 0), cv2.FILLED)
                cv2.putText(frame, label_text, (left + 6, bottom - 6), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)

            # show stats on top
            status_text = f"{class_name} | Detected: {detected_count} | Labeled: {labeled}"
            cv2.putText(frame, status_text, (10, 24), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 2)

            # cv2.imshow(window_name, frame)

            # poll key (escape won't stop the process; it only closes the window if you press 'q')
            # if cv2.waitKey(1) & 0xFF == ord('q'):
            #     print(f"🖱 Manual stop requested for {class_name}")
            #     running_status[timetable_id] = False
            #     break

        cap.release()
        # cv2.destroyWindow(window_name)
        print(f"🛑 Camera stopped for {class_name}.")

    except Exception as e:
        print(f"💥 Error in camera thread ({class_name}): {e}")

# ------------- Timetable fetch -------------
def ensure_time(value):
    """Convert potential timedelta (from some MySQL configs) to datetime.time."""
    if isinstance(value, timedelta):
        total_seconds = int(value.total_seconds()) % 86400
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        seconds = total_seconds % 60
        return time(hours, minutes, seconds)
    return value

def fetch_timetable_for_today():
    conn = create_connection()
    if not conn:
        return []
    try:
        cursor = conn.cursor(dictionary=True)
        dow = datetime.now().strftime("%a")
        q = """
            SELECT 
                tt.timetable_id, tt.start_time, tt.end_time, tt.camera_url,
                CONCAT(y.year_name, ' - Div ', d.division_name) AS class_name
            FROM Timetable tt
            JOIN Division d ON tt.division_id = d.division_id
            JOIN Year y ON d.year_id = y.year_id
            WHERE tt.day_of_week = %s
        """
        cursor.execute(q, (dow,))
        rows = cursor.fetchall()
        timetable = []
        for r in rows:
            timetable.append({
                "timetable_id": r["timetable_id"],
                "class_name": r["class_name"],
                "start": ensure_time(r["start_time"]),
                "end": ensure_time(r["end_time"]),
                "camera_url": r["camera_url"]
            })
        return timetable
    except mysql.connector.Error as e:
        print(f"❌ Error fetching timetable: {e}")
        return []
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# ------------- Scheduler -------------
def attendance_scheduler():
    global running_status, marked_students_by_class

    attendance_duration = timedelta(minutes=10)
    run_start_time = time(9, 0)
    run_end_time = time(18, 0)

    timetable = []
    last_fetch_time = None
    last_active_date = None

    print("✅ Attendance System Started. Waiting for operational hours (9 AM - 6 PM).")

    while True:
        now = datetime.now()

        # New day detection (reset)
        if last_active_date is None or now.date() != last_active_date:
            print(f"📆 New day detected: {now.date()}. Resetting scheduler state.")
            timetable = []
            running_status.clear()
            with marked_lock:
                marked_students_by_class.clear()
            last_fetch_time = None
            last_active_date = now.date()

        # operational hours
        if run_start_time <= now.time() <= run_end_time:
            # refresh timetable every 5 minutes
            if last_fetch_time is None or (datetime.now() - last_fetch_time).total_seconds() > 300:
                print(f"🔄 Refreshing timetable for {now.date()}...")
                timetable = fetch_timetable_for_today()
                last_fetch_time = datetime.now()
                if not timetable:
                    print("⚠️ No classes scheduled for today.")
                else:
                    print("📅 Today's Timetable:", timetable)

            # iterate classes and start/stop threads
            for cls in timetable:
                class_id = cls["timetable_id"]
                class_name = cls["class_name"]
                class_start = datetime.combine(now.date(), cls["start"])
                class_end = datetime.combine(now.date(), cls["end"])
                is_active = class_start <= now < class_end

                if is_active:
                    attendance_window_end = class_start + attendance_duration
                    if now < attendance_window_end and not running_status.get(class_id, False):
                        print(f"🚀 Starting attendance for {class_name} (Timetable ID: {class_id})")
                        running_status[class_id] = True
                        with marked_lock:
                            marked_students_by_class[class_id] = set()
                        thread = threading.Thread(target=run_camera, args=(cls["camera_url"], class_name, class_id), daemon=True)
                        thread.start()
                        # give camera a moment to initialize before launching another
                        t.sleep(1)

                # ended -> stop thread & cleanup
                elif not is_active and running_status.get(class_id, False):
                    print(f"🛑 Class session for Timetable ID {class_id} ({class_name}) has ended.")
                    running_status[class_id] = False
                    # cleanup
                    with marked_lock:
                        if class_id in marked_students_by_class:
                            marked_students_by_class.pop(class_id, None)
                            print(f"🧹 Cleared marked students for Timetable ID {class_id}")

            # re-check missed classes if time jumped forward
            for cls in timetable:
                class_id = cls["timetable_id"]
                class_name = cls["class_name"]
                class_start = datetime.combine(now.date(), cls["start"])
                class_end = datetime.combine(now.date(), cls["end"])
                if class_start <= now < class_end and not running_status.get(class_id, False):
                    print(f"⏱ Time jump detected: Starting missed class {class_name} (Timetable ID: {class_id})")
                    running_status[class_id] = True
                    with marked_lock:
                        marked_students_by_class[class_id] = set()
                    thread = threading.Thread(target=run_camera, args=(cls["camera_url"], class_name, class_id), daemon=True)
                    thread.start()
                    t.sleep(1)

            t.sleep(5)

        else:
            # outside working hours
            if any(running_status.values()):
                print("🌙 Operational hours ended. Stopping all active cameras.")
                for key in list(running_status.keys()):
                    running_status[key] = False

            if timetable or marked_students_by_class:
                print("🔁 Resetting daily schedule. Ready for tomorrow.")
                timetable = []
                running_status.clear()
                with marked_lock:
                    marked_students_by_class.clear()
                last_fetch_time = None

            # short sleep so that clock changes are picked quickly
            t.sleep(30)

# ------------- Main -------------
if __name__ == "__main__":
    # Make sure the image folder exists
    os.makedirs(STUDENT_IMAGE_FOLDER, exist_ok=True)

    # Start scheduler (this loop runs forever)
    attendance_scheduler()