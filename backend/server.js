const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const dashboardRoutes = require("./routes/dashboard");
const studentRoutes = require("./routes/studentRoutes"); // or ./routes/studentRoutes
const adminRoutes = require("./routes/admin");
const facultyRoutes = require("./routes/facultyRoutes");

// Mount routes - CHANGED THIS LINE
app.use("/api", studentRoutes); // Changed from /api/student to /api
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "API is working!",
    endpoints: {
      students: "/api/students",
      stats: "/api/students/stats",
      departments: "/api/students/departments",
    },
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.url} not found`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ Students API: http://localhost:${PORT}/api/students`);
});
