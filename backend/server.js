const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors()); // allow all origins
app.use(express.json());

// Import student routes
const dashboardRoutes = require("./routes/dashboard");
const studentRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");

app.use("/api/student", studentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes); // ✅ add this line

// Test route

app.get("/", (req, res) => {
  res.send("API is working!");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
