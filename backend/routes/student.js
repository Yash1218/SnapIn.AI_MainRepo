const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all students
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Student"); // Replace 'students' with your actual table name
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
