"use client";

import { useState } from "react";
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
} from "lucide-react";

const FacultyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const [faculty, setFaculty] = useState([
    {
      id: 1,
      name: "Dr. Robert Anderson",
      employeeId: "FAC001",
      department: "Computer Science",
      designation: "Professor",
      email: "robert.a@example.com",
      phone: "+91 98765 11111",
      courses: ["Data Structures", "Algorithms", "Database Systems"],
      experience: "15 years",
    },
    {
      id: 2,
      name: "Dr. Emily Carter",
      employeeId: "FAC002",
      department: "Electrical Engineering",
      designation: "Associate Professor",
      email: "emily.c@example.com",
      phone: "+91 98765 22222",
      courses: ["Circuit Theory", "Digital Electronics"],
      experience: "10 years",
    },
    {
      id: 3,
      name: "Prof. Michael Brown",
      employeeId: "FAC003",
      department: "Mechanical Engineering",
      designation: "Assistant Professor",
      email: "michael.b@example.com",
      phone: "+91 98765 33333",
      courses: ["Thermodynamics", "Fluid Mechanics"],
      experience: "8 years",
    },
    {
      id: 4,
      name: "Dr. Sarah Wilson",
      employeeId: "FAC004",
      department: "Civil Engineering",
      designation: "Professor",
      email: "sarah.w@example.com",
      phone: "+91 98765 44444",
      courses: ["Structural Analysis", "Construction Management"],
      experience: "12 years",
    },
    {
      id: 5,
      name: "Prof. David Martinez",
      employeeId: "FAC005",
      department: "Business Administration",
      designation: "Associate Professor",
      email: "david.m@example.com",
      phone: "+91 98765 55555",
      courses: ["Marketing", "Business Strategy"],
      experience: "9 years",
    },
  ]);

  const departments = [
    "all",
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration",
  ];

  const filteredFaculty = faculty.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <GraduationCap className="w-8 h-8 text-purple-400 mb-2" />
            <p className="text-gray-400 text-sm">Total Faculty</p>
            <p className="text-3xl font-bold text-white">{faculty.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <GraduationCap className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-gray-400 text-sm">Professors</p>
            <p className="text-3xl font-bold text-white">
              {faculty.filter((f) => f.designation === "Professor").length}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <GraduationCap className="w-8 h-8 text-cyan-400 mb-2" />
            <p className="text-gray-400 text-sm">Associate Professors</p>
            <p className="text-3xl font-bold text-white">
              {
                faculty.filter((f) => f.designation === "Associate Professor")
                  .length
              }
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <GraduationCap className="w-8 h-8 text-orange-400 mb-2" />
            <p className="text-gray-400 text-sm">Assistant Professors</p>
            <p className="text-3xl font-bold text-white">
              {
                faculty.filter((f) => f.designation === "Assistant Professor")
                  .length
              }
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
                placeholder="Search by name or employee ID..."
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

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((member) => (
            <div
              key={member.id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
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

              {/* Name & Designation */}
              <h3 className="text-xl font-bold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-purple-400 text-sm mb-4">
                {member.designation}
              </p>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="font-medium">ID:</span> {member.employeeId}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="font-medium">Dept:</span> {member.department}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="font-medium">Exp:</span> {member.experience}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2 mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Mail className="w-4 h-4" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Phone className="w-4 h-4" />
                  {member.phone}
                </div>
              </div>

              {/* Courses */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="font-medium">Courses Teaching:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.courses.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyPage;
