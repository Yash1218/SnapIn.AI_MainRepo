const db = require("../db");

// Get admin dashboard data
exports.getAdminDashboard = async (req, res) => {
  try {
    // 1️⃣ Count total faculty
    const [facultyCount] = await db.query(
      "SELECT COUNT(*) AS count FROM Faculty"
    );

    // 2️⃣ Count total students
    const [studentCount] = await db.query(
      "SELECT COUNT(*) AS count FROM Student"
    );

    // 3️⃣ Get departments with attendance percentage
    const [departments] = await db.query(`
      SELECT 
        d.dept_name AS name,
        CASE 
          WHEN COUNT(a.attendance_id) = 0 THEN 0
          ELSE ROUND(
            (SUM(CASE WHEN a.status = 'Present' OR a.status = 1 THEN 1 ELSE 0 END) * 100.0) 
            / COUNT(a.attendance_id), 
            2
          )
        END AS attendance
      FROM Department d
      LEFT JOIN Year y ON d.dept_id = y.dept_id
      LEFT JOIN Division dv ON y.year_id = dv.year_id
      LEFT JOIN Student s ON dv.division_id = s.division_id
      LEFT JOIN Attendance a ON s.student_id = a.student_id
      GROUP BY d.dept_id, d.dept_name
      ORDER BY attendance DESC
    `);

    // 4️⃣ Get total attendance records
    const [attendanceCountResult] = await db.query(
      "SELECT COUNT(*) AS totalAttendance FROM Attendance"
    );

    // 5️⃣ Get average attendance overall
    const [avgAttendanceResult] = await db.query(`
      SELECT 
        CASE 
          WHEN COUNT(*) = 0 THEN 0
          ELSE (
            SUM(CASE WHEN status = 'Present' OR status = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)
          )
        END AS avgAttendance
      FROM Attendance
    `);

    // 6️⃣ Get today's summary data

    // Check if today's data exists, otherwise use most recent date
    const [latestDate] = await db.query(`
      SELECT MAX(DATE(date)) as latest_date 
      FROM Attendance
    `);

    const dateToUse = latestDate[0].latest_date || "CURDATE()";

    // Count distinct classes (unique timetable_id)
    const [todayClasses] = await db.query(
      `
      SELECT COUNT(DISTINCT timetable_id) AS count
      FROM Attendance
      WHERE DATE(date) = ?
    `,
      [dateToUse]
    );

    // Count students marked present
    const [todayPresentCount] = await db.query(
      `
      SELECT COUNT(*) AS count
      FROM Attendance
      WHERE DATE(date) = ?
        AND (status = 'Present' OR status = 1)
    `,
      [dateToUse]
    );

    // Count students marked absent
    const [todayAbsentCount] = await db.query(
      `
      SELECT COUNT(*) AS count
      FROM Attendance
      WHERE DATE(date) = ?
        AND (status = 'Absent' OR status = 0)
    `,
      [dateToUse]
    );

    const todayClassesTotal = todayClasses[0].count || 0;
    const todayPresent = todayPresentCount[0].count || 0;
    const todayAbsent = todayAbsentCount[0].count || 0;

    // 7️⃣ Get recent activity (last 10 activities from attendance only for now)
    const [recentActivities] = await db.query(`
      SELECT 
        'attendance' AS activity_type,
        CONCAT('Attendance marked for class') AS description,
        MAX(date) AS created_at
      FROM Attendance
      WHERE date >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
      GROUP BY timetable_id, DATE(date)
      ORDER BY created_at DESC
      LIMIT 10
    `);

    // Format recent activities with time ago
    const formattedActivities = recentActivities.map((activity) => {
      const now = new Date();
      const activityTime = new Date(activity.created_at);
      const diffMs = now - activityTime;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      let timeAgo;
      if (diffMins < 1) timeAgo = "Just now";
      else if (diffMins < 60) timeAgo = `${diffMins}m ago`;
      else if (diffHours < 24) timeAgo = `${diffHours}h ago`;
      else timeAgo = `${diffDays}d ago`;

      return {
        action: activity.description,
        time: timeAgo,
        color: "bg-blue-500",
      };
    });

    // 8️⃣ Respond with structured data
    res.json({
      success: true,
      stats: {
        faculty: facultyCount[0].count,
        students: studentCount[0].count,
        totalAttendance: attendanceCountResult[0].totalAttendance,
        avgAttendance: parseFloat(
          avgAttendanceResult[0].avgAttendance || 0
        ).toFixed(2),
      },
      departments: departments.map((dept) => ({
        name: dept.name,
        attendance: parseFloat(dept.attendance) || 0,
      })),
      todaySummary: {
        classesTotal: todayClassesTotal,
        attendanceMarked: todayPresent,
        absent: todayAbsent,
        summaryDate: dateToUse, // Send the date being displayed
      },
      recentActivities: formattedActivities,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching admin dashboard data",
    });
  }
};
