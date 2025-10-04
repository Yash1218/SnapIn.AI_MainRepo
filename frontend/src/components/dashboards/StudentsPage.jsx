"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock student data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      rollNo: "CS2021001",
      department: "Computer Science",
      year: "3rd Year",
      email: "john.doe@example.com",
      phone: "+91 98765 43210",
      attendance: 92,
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNo: "EE2021045",
      department: "Electrical Engineering",
      year: "2nd Year",
      email: "jane.smith@example.com",
      phone: "+91 98765 43211",
      attendance: 88,
    },
    {
      id: 3,
      name: "Mike Johnson",
      rollNo: "ME2020023",
      department: "Mechanical Engineering",
      year: "4th Year",
      email: "mike.j@example.com",
      phone: "+91 98765 43212",
      attendance: 85,
    },
    {
      id: 4,
      name: "Sarah Williams",
      rollNo: "CE2021067",
      department: "Civil Engineering",
      year: "3rd Year",
      email: "sarah.w@example.com",
      phone: "+91 98765 43213",
      attendance: 90,
    },
    {
      id: 5,
      name: "Robert Brown",
      rollNo: "BA2022012",
      department: "Business Administration",
      year: "1st Year",
      email: "robert.b@example.com",
      phone: "+91 98765 43214",
      attendance: 86,
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

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || student.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <Users className="w-8 h-8 text-cyan-400 mb-2" />
            <p className="text-gray-400 text-sm">Total Students</p>
            <p className="text-3xl font-bold text-white">{students.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <Users className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-gray-400 text-sm">Active Students</p>
            <p className="text-3xl font-bold text-white">{students.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <Users className="w-8 h-8 text-purple-400 mb-2" />
            <p className="text-gray-400 text-sm">Avg Attendance</p>
            <p className="text-3xl font-bold text-white">
              {Math.round(
                students.reduce((acc, s) => acc + s.attendance, 0) /
                  students.length
              )}
              %
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <Users className="w-8 h-8 text-orange-400 mb-2" />
            <p className="text-gray-400 text-sm">Departments</p>
            <p className="text-3xl font-bold text-white">
              {departments.length - 1}
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
                    Contact
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
                {filteredStudents.map((student) => (
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
                          {student.name.charAt(0)}
                        </div>
                        <span className="text-white font-medium">
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {student.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {student.year}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Mail className="w-4 h-4" />
                          {student.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Phone className="w-4 h-4" />
                          {student.phone}
                        </div>
                      </div>
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
                        <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
