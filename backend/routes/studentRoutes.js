// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStats,
  getDepartments,
} = require("../controllers/studentController");

// Add authentication middleware if you have one
// const { protect, authorize } = require('../middleware/auth');

// Public routes or add protect middleware
router.get("/students", getAllStudents);
router.get("/students/stats", getStudentStats);
router.get("/students/departments", getDepartments);
router.get("/students/:id", getStudentById);
router.post("/students", createStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

module.exports = router;
