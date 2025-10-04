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
    const [departments] = await db.query(
      "SELECT dept_name AS name FROM Department"
    );

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

    // 4️⃣ Respond with structured data
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
        attendance: 0, // or calculate per department if needed
      })),
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching admin dashboard data",
    });
  }
};
