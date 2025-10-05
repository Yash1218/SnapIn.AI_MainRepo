// controllers/studentController.js
const db = require("../db");

// Get all students with optional filters
const getAllStudents = async (req, res) => {
  try {
    const { search, department } = req.query;

    let query = `
      SELECT 
        s.student_id as id,
        s.student_code,
        s.roll_no as rollNo,
        s.student_name as name,
        s.division_id,
        COALESCE(dep.dept_name, 'N/A') as department,
        COALESCE(y.year_name, 'N/A') as year,
        COALESCE(
          ROUND(
            (COUNT(CASE WHEN a.status = 'Present' THEN 1 END) * 100.0) / 
            NULLIF(COUNT(a.attendance_id), 0),
            0
          ),
          0
        ) as attendance
      FROM Student s
      LEFT JOIN Division d ON s.division_id = d.division_id
      LEFT JOIN Year y ON d.year_id = y.year_id
      LEFT JOIN Department dep ON y.dept_id = dep.dept_id
      LEFT JOIN Attendance a ON s.student_id = a.student_id
      WHERE 1=1
    `;

    const params = [];

    // Add search filter
    if (search) {
      query += ` AND (s.student_name LIKE ? OR s.roll_no LIKE ? OR s.student_code LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    // Add department filter
    if (department && department !== "all") {
      query += ` AND dep.dept_name = ?`;
      params.push(department);
    }

    query += ` 
      GROUP BY s.student_id, s.student_code, s.roll_no, s.student_name, 
               s.division_id, dep.dept_name, y.year_name
      ORDER BY s.roll_no ASC
    `;

    const [students] = await db.query(query, params);

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching students",
      error: error.message,
    });
  }
};
// Get single student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT 
        s.student_id as id,
        s.student_code,
        s.roll_no as rollNo,
        s.student_name as name,
        s.division_id,
        dep.dept_name as department,
        dep.dept_id as departmentId,
        y.year_name as year,
        y.year_id as yearId,
        d.division_name,
        COALESCE(
          ROUND(
            (COUNT(CASE WHEN a.status = 'Present' THEN 1 END) * 100.0) / 
            NULLIF(COUNT(a.attendance_id), 0),
            0
          ),
          0
        ) as attendance,
        COUNT(a.attendance_id) as totalClasses,
        COUNT(CASE WHEN a.status = 'Present' THEN 1 END) as presentCount,
        COUNT(CASE WHEN a.status = 'Absent' THEN 1 END) as absentCount
      FROM Student s
      LEFT JOIN Division d ON s.division_id = d.division_id
      LEFT JOIN Year y ON d.year_id = y.year_id
      LEFT JOIN Department dep ON y.dept_id = dep.dept_id
      LEFT JOIN Attendance a ON s.student_id = a.student_id
      WHERE s.student_id = ?
      GROUP BY s.student_id, s.student_code, s.roll_no, s.student_name, 
               s.division_id, dep.dept_name, dep.dept_id, y.year_name, 
               y.year_id, d.division_name
    `;

    const [students] = await db.query(query, [id]);

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: students[0],
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching student",
      error: error.message,
    });
  }
};
// Create new student
const createStudent = async (req, res) => {
  try {
    const { studentCode, rollNo, studentName, divisionId } = req.body;

    if (!studentCode || !rollNo || !studentName || !divisionId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const [existingCode] = await db.query(
      "SELECT student_id FROM Student WHERE student_code = ?",
      [studentCode]
    );

    if (existingCode.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Student code already exists",
      });
    }

    const [existingRoll] = await db.query(
      "SELECT student_id FROM Student WHERE roll_no = ?",
      [rollNo]
    );

    if (existingRoll.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Roll number already exists",
      });
    }

    const query = `
      INSERT INTO Student (student_code, roll_no, student_name, division_id)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      studentCode,
      rollNo,
      studentName,
      divisionId,
    ]);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: {
        id: result.insertId,
        studentCode,
        rollNo,
        studentName,
        divisionId,
      },
    });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({
      success: false,
      message: "Error creating student",
      error: error.message,
    });
  }
};
// Update student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentCode, rollNo, studentName, divisionId } = req.body;

    const [existing] = await db.query(
      "SELECT student_id FROM Student WHERE student_id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (studentCode) {
      const [conflict] = await db.query(
        "SELECT student_id FROM Student WHERE student_code = ? AND student_id != ?",
        [studentCode, id]
      );

      if (conflict.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Student code already exists",
        });
      }
    }

    if (rollNo) {
      const [conflict] = await db.query(
        "SELECT student_id FROM Student WHERE roll_no = ? AND student_id != ?",
        [rollNo, id]
      );

      if (conflict.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Roll number already exists",
        });
      }
    }

    const query = `
      UPDATE Student 
      SET student_code = COALESCE(?, student_code),
          roll_no = COALESCE(?, roll_no),
          student_name = COALESCE(?, student_name),
          division_id = COALESCE(?, division_id)
      WHERE student_id = ?
    `;

    await db.query(query, [studentCode, rollNo, studentName, divisionId, id]);

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({
      success: false,
      message: "Error updating student",
      error: error.message,
    });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if student exists
    const [existing] = await db.query(
      "SELECT student_id FROM Student WHERE student_id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Delete student (attendance records will be handled by CASCADE if set up)
    await db.query("DELETE FROM Student WHERE student_id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting student",
      error: error.message,
    });
  }
};

// Get student statistics
const getStudentStats = async (req, res) => {
  try {
    const [stats] = await db.query(`
      SELECT 
        COUNT(DISTINCT s.student_id) as totalStudents,
        COUNT(DISTINCT s.student_id) as activeStudents,
        COUNT(DISTINCT dep.dept_id) as totalDepartments,
        COALESCE(
          ROUND(AVG(
            CASE 
              WHEN attendance_counts.total_classes > 0 
              THEN (attendance_counts.present_count * 100.0) / attendance_counts.total_classes
              ELSE 0 
            END
          ), 0),
          0
        ) as avgAttendance
      FROM Student s
      LEFT JOIN Division d ON s.division_id = d.division_id
      LEFT JOIN Year y ON d.year_id = y.year_id
      LEFT JOIN Department dep ON y.dept_id = dep.dept_id
      LEFT JOIN (
        SELECT 
          student_id,
          COUNT(attendance_id) as total_classes,
          COUNT(CASE WHEN status = 'Present' THEN 1 END) as present_count
        FROM Attendance
        GROUP BY student_id
      ) attendance_counts ON s.student_id = attendance_counts.student_id
    `);

    res.status(200).json({
      success: true,
      data: stats[0],
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const [departments] = await db.query(`
      SELECT DISTINCT dep.dept_name as department
      FROM Department dep
      INNER JOIN Year y ON dep.dept_id = y.dept_id
      INNER JOIN Division d ON y.year_id = d.year_id
      INNER JOIN Student s ON d.division_id = s.division_id
      ORDER BY dep.dept_name ASC
    `);

    res.status(200).json({
      success: true,
      data: departments.map((d) => d.department),
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching departments",
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStats,
  getDepartments,
};
