const express = require("express");
const router = express.Router();
const {
  getAllFaculty,
  getFacultyById,
  getFacultyStats,
  getDepartments,
} = require("../controllers/facultyController");

// Get all faculty
router.get("/", getAllFaculty);

// Get faculty statistics
router.get("/stats", getFacultyStats);

// Get departments for filter
router.get("/departments", getDepartments);

// Get faculty by ID
router.get("/:id", getFacultyById);

module.exports = router;
