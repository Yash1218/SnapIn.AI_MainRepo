const express = require("express");
const router = express.Router();
const { getAdminDashboard } = require("../controllers/adminController");

// Endpoint to fetch admin dashboard
router.get("/dashboard", getAdminDashboard);

module.exports = router;
