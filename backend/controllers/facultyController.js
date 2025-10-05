const db = require("../db");

// Get all faculty with their departments and subjects
const getAllFaculty = async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT
        f.faculty_id,
        f.faculty_code,
        f.faculty_name,
        f.email,
        f.phone,
        d.dept_name as department,
        GROUP_CONCAT(DISTINCT s.subject_name SEPARATOR '|||') as subjects
      FROM Faculty f
      LEFT JOIN Faculty_Subject_Division fsd ON f.faculty_id = fsd.faculty_id
      LEFT JOIN Subject s ON fsd.subject_id = s.subject_id
      LEFT JOIN Division \`div\` ON fsd.division_id = \`div\`.division_id
      LEFT JOIN Year y ON \`div\`.year_id = y.year_id
      LEFT JOIN Department d ON y.dept_id = d.dept_id
      GROUP BY f.faculty_id, f.faculty_code, f.faculty_name, f.email, f.phone, d.dept_name
      ORDER BY f.faculty_name
    `;

    const [results] = await db.query(query);

    // Process results to format subjects as array
    const processedResults = results.map((faculty) => ({
      ...faculty,
      subjects: faculty.subjects ? faculty.subjects.split("|||") : [],
    }));

    res.status(200).json({
      success: true,
      data: processedResults,
    });
  } catch (error) {
    console.error("Error in getAllFaculty:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get faculty by ID
const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT DISTINCT
        f.faculty_id,
        f.faculty_code,
        f.faculty_name,
        f.email,
        f.phone,
        d.dept_name as department,
        GROUP_CONCAT(DISTINCT s.subject_name SEPARATOR '|||') as subjects
      FROM Faculty f
      LEFT JOIN Faculty_Subject_Division fsd ON f.faculty_id = fsd.faculty_id
      LEFT JOIN Subject s ON fsd.subject_id = s.subject_id
      LEFT JOIN Division \`div\` ON fsd.division_id = \`div\`.division_id
      LEFT JOIN Year y ON \`div\`.year_id = y.year_id
      LEFT JOIN Department d ON y.dept_id = d.dept_id
      WHERE f.faculty_id = ?
      GROUP BY f.faculty_id, f.faculty_code, f.faculty_name, f.email, f.phone, d.dept_name
    `;

    const [results] = await db.query(query, [id]);

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    const faculty = {
      ...results[0],
      subjects: results[0].subjects ? results[0].subjects.split("|||") : [],
    };

    res.status(200).json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    console.error("Error in getFacultyById:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get faculty statistics
const getFacultyStats = async (req, res) => {
  try {
    const query = `
      SELECT 
        COUNT(DISTINCT f.faculty_id) as total_faculty,
        COUNT(DISTINCT d.dept_id) as total_departments,
        COUNT(DISTINCT fsd.subject_id) as total_subjects_assigned
      FROM Faculty f
      LEFT JOIN Faculty_Subject_Division fsd ON f.faculty_id = fsd.faculty_id
      LEFT JOIN Division \`div\` ON fsd.division_id = \`div\`.division_id
      LEFT JOIN Year y ON \`div\`.year_id = y.year_id
      LEFT JOIN Department d ON y.dept_id = d.dept_id
    `;

    const [results] = await db.query(query);

    res.status(200).json({
      success: true,
      data: results[0],
    });
  } catch (error) {
    console.error("Error in getFacultyStats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get unique departments for filter
const getDepartments = async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT d.dept_id, d.dept_name
      FROM Department d
      INNER JOIN Year y ON d.dept_id = y.dept_id
      INNER JOIN Division \`div\` ON y.year_id = \`div\`.year_id
      INNER JOIN Faculty_Subject_Division fsd ON \`div\`.division_id = fsd.division_id
      ORDER BY d.dept_name
    `;

    const [results] = await db.query(query);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error in getDepartments:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllFaculty,
  getFacultyById,
  getFacultyStats,
  getDepartments,
};
