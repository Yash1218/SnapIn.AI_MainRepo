"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";

const StudentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState(["all"]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    avgAttendance: 0,
    totalDepartments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API base URL - adjust according to your backend
  const API_URL = "http://localhost:5000/api"; // Remove process.env part

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedDepartment !== "all")
        params.append("department", selectedDepartment);

      const response = await fetch(`${API_URL}/students?${params}`);
      const data = await response.json();

      if (data.success) {
        setStudents(data.data);
      } else {
        setError(data.message || "Failed to fetch students");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/students/stats`);
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_URL}/students/departments`);
      const data = await response.json();

      if (data.success) {
        setDepartments(["all", ...data.data]);
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        fetchStudents();
        fetchStats();
        alert("Student deleted successfully");
      } else {
        alert(data.message || "Failed to delete student");
      }
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Error deleting student");
    }
  };

  // Initial load
  useEffect(() => {
    fetchStudents();
    fetchStats();
    fetchDepartments();
  }, []);

  // Fetch when filters change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedDepartment]);

  if (loading && students.length === 0) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Students Management
            </h2>
            <p className="text-gray-400">Manage and view all student records</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Student
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-xl p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <Users className="w-8 h-8 text-cyan-400 mb-2" />
            <p className="text-gray-400 text-sm">Total Students</p>
            <p className="text-3xl font-bold text-white">
              {stats.totalStudents}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <Users className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-gray-400 text-sm">Active Students</p>
            <p className="text-3xl font-bold text-white">
              {stats.activeStudents}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <Users className="w-8 h-8 text-purple-400 mb-2" />
            <p className="text-gray-400 text-sm">Avg Attendance</p>
            <p className="text-3xl font-bold text-white">
              {Math.round(stats.avgAttendance)}%
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <Users className="w-8 h-8 text-orange-400 mb-2" />
            <p className="text-gray-400 text-sm">Departments</p>
            <p className="text-3xl font-bold text-white">
              {stats.totalDepartments}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="bg-gray-800">
                    {dept === "all" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Roll No
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Year
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Attendance
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <p className="text-gray-400">No students found</p>
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {student.rollNo}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {student.name ? student.name.charAt(0) : "S"}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-white font-medium">
                              {student.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              {student.student_code}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {student.department}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {student.year}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-2 w-20">
                            <div
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full"
                              style={{ width: `${student.attendance}%` }}
                            ></div>
                          </div>
                          <span className="text-cyan-400 font-bold text-sm">
                            {student.attendance}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
