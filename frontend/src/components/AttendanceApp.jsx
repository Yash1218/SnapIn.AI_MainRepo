"use client";

import { useState } from "react";
import LandingPage from "./LandingPage";
import AuthPage from "./AuthPage";
import AdminDashboard from "./dashboards/AdminDashboard";
import FacultyDashboard from "./dashboards/FacultyDashboard";
import StudentDashboard from "./dashboards/StudentDashboard";

const AttendanceApp = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [userRole, setUserRole] = useState("");

  return (
    <div>
      {currentPage === "landing" && (
        <LandingPage onNavigate={() => setCurrentPage("auth")} />
      )}
      {currentPage === "auth" && (
        <AuthPage
          onLogin={(role) => {
            setUserRole(role);
            setCurrentPage("dashboard");
          }}
        />
      )}
      {currentPage === "dashboard" && userRole === "admin" && (
        <AdminDashboard onLogout={() => setCurrentPage("landing")} />
      )}
      {currentPage === "dashboard" && userRole === "faculty" && (
        <FacultyDashboard onLogout={() => setCurrentPage("landing")} />
      )}
      {currentPage === "dashboard" && userRole === "student" && (
        <StudentDashboard onLogout={() => setCurrentPage("landing")} />
      )}
    </div>
  );
};

export default AttendanceApp;
