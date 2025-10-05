"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  BookOpen,
  Loader2,
} from "lucide-react";

const FacultyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState(["all"]);
  const [stats, setStats] = useState({
    total_faculty: 0,
    total_departments: 0,
    total_subjects_assigned: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Base URL - hardcoded
  const API_BASE_URL = "http://localhost:5000/api";

  // Fetch faculty data
  useEffect(() => {
    fetchFaculty();
    fetchDepartments();
    fetchStats();
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/faculty`);
      const data = await response.json();

      if (data.success) {
        setFaculty(data.data);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch faculty data");
      }
    } catch (err) {
      console.error("Error fetching faculty:", err);
      setError("Failed to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/faculty/departments`);
      const data = await response.json();

      if (data.success) {
        const deptNames = data.data.map((dept) => dept.dept_name);
        setDepartments(["all", ...deptNames]);
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/faculty/stats`);
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const filteredFaculty = faculty.filter((member) => {
    const matchesSearch =
      member.faculty_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.faculty_code?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading faculty data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md">
          <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchFaculty}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
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
              Faculty Management
            </h2>
            <p className="text-gray-400">Manage and view all faculty members</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            <Plus className="w-5 h-5" />
            Add Faculty
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <GraduationCap className="w-8 h-8 text-purple-400 mb-2" />
            <p className="text-gray-400 text-sm">Total Faculty</p>
            <p className="text-3xl font-bold text-white">
              {stats.total_faculty}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <GraduationCap className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-gray-400 text-sm">Departments</p>
            <p className="text-3xl font-bold text-white">
              {stats.total_departments}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <GraduationCap className="w-8 h-8 text-cyan-400 mb-2" />
            <p className="text-gray-400 text-sm">Subjects Assigned</p>
            <p className="text-3xl font-bold text-white">
              {stats.total_subjects_assigned}
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
                placeholder="Search by name or faculty code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
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

        {/* No Results */}
        {filteredFaculty.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No Faculty Found
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedDepartment !== "all"
                ? "Try adjusting your filters"
                : "No faculty members in the system yet"}
            </p>
          </div>
        )}

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((member) => (
            <div
              key={member.faculty_id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                  {getInitials(member.faculty_name)}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Name & Department */}
              <h3 className="text-xl font-bold text-white mb-1">
                {member.faculty_name}
              </h3>
              <p className="text-purple-400 text-sm mb-4">
                {member.department || "No Department"}
              </p>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="font-medium">Code:</span>{" "}
                  {member.faculty_code}
                </div>
                {member.department && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-medium">Dept:</span>{" "}
                    {member.department}
                  </div>
                )}
              </div>

              {/* Contact */}
              <div className="space-y-2 mb-4 pb-4 border-b border-white/10">
                {member.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Phone className="w-4 h-4" />
                    {member.phone}
                  </div>
                )}
              </div>

              {/* Subjects */}
              {member.subjects && member.subjects.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">Subjects Teaching:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyPage;
