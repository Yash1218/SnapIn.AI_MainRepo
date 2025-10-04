const db = require("../db");

const getDashboardData = async (req, res) => {
  try {
    const [[studentCount]] = await db.query(
      "SELECT COUNT(*) AS totalStudents FROM Student"
    );
    const [[facultyCount]] = await db.query(
      "SELECT COUNT(*) AS totalFaculty FROM Faculty"
    );
    const [[attendanceCount]] = await db.query(
      "SELECT COUNT(*) AS totalAttendance FROM Attendance"
    );

    // Example: average attendance percentage
    const [[avgAttendance]] = await db.query(`
      SELECT 
        ROUND((COUNT(CASE WHEN status='Present' THEN 1 END) / COUNT(*)) * 100, 2) AS avgAttendance 
      FROM Attendance
    `);

    res.json({
      totalStudents: studentCount.totalStudents || 0,
      totalFaculty: facultyCount.totalFaculty || 0,
      totalAttendance: attendanceCount.totalAttendance || 0,
      avgAttendance: avgAttendance.avgAttendance || 0,
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { getDashboardData };
