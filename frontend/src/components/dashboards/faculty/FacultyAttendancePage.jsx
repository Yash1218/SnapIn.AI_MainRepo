"use client";

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Users,
  Calendar,
  Search,
  Filter,
  Download,
  Clock,
  UserCheck,
  UserX,
} from "lucide-react";

const FacultyAttendancePage = () => {
  const [selectedCourse, setSelectedCourse] = useState("CS301");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [attendance, setAttendance] = useState({
    1: true,
    2: true,
    3: false,
    4: true,
    5: true,
    6: false,
    7: true,
    8: true,
  });

  const courses = [
    { code: "CS301", name: "Data Structures" },
    { code: "CS302", name: "Algorithms" },
    { code: "CS401", name: "Database Systems" },
    { code: "CS305", name: "Web Development" },
  ];

  const students = [
    { id: 1, name: "John Smith", rollNo: "CS2021001", image: "JS" },
    { id: 2, name: "Emma Johnson", rollNo: "CS2021002", image: "EJ" },
    { id: 3, name: "Michael Brown", rollNo: "CS2021003", image: "MB" },
    { id: 4, name: "Sarah Davis", rollNo: "CS2021004", image: "SD" },
    { id: 5, name: "James Wilson", rollNo: "CS2021005", image: "JW" },
    { id: 6, name: "Emily Taylor", rollNo: "CS2021006", image: "ET" },
    { id: 7, name: "Daniel Anderson", rollNo: "CS2021007", image: "DA" },
    { id: 8, name: "Olivia Martinez", rollNo: "CS2021008", image: "OM" },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const markAllPresent = () => {
    const newAttendance = {};
    students.forEach((student) => {
      newAttendance[student.id] = true;
    });
    setAttendance(newAttendance);
  };

  const markAllAbsent = () => {
    const newAttendance = {};
    students.forEach((student) => {
      newAttendance[student.id] = false;
    });
    setAttendance(newAttendance);
  };

  const presentCount = Object.values(attendance).filter((val) => val).length;
  const absentCount = students.length - presentCount;
  const attendancePercentage = ((presentCount / students.length) * 100).toFixed(
    1
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Mark Attendance
          </h2>
          <p className="text-gray-400 text-lg">
            Mark and manage student attendance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-white">
                {students.length}
              </span>
            </div>
            <p className="text-gray-300 font-medium">Total Students</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <UserCheck className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-white">
                {presentCount}
              </span>
            </div>
            <p className="text-gray-300 font-medium">Present</p>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20">
            <div className="flex items-center justify-between mb-4">
              <UserX className="w-8 h-8 text-red-400" />
              <span className="text-3xl font-bold text-white">
                {absentCount}
              </span>
            </div>
            <p className="text-gray-300 font-medium">Absent</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-white">
                {attendancePercentage}%
              </span>
            </div>
            <p className="text-gray-300 font-medium">Attendance Rate</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Select Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all"
              >
                {courses.map((course) => (
                  <option key={course.code} value={course.code}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Select Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Search Students
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Name or Roll No..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button className="w-full px-4 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex gap-3">
            <button
              onClick={markAllPresent}
              className="px-6 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 hover:bg-green-500/20 transition-all text-sm font-medium"
            >
              Mark All Present
            </button>
            <button
              onClick={markAllAbsent}
              className="px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium"
            >
              Mark All Absent
            </button>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">Student List</h3>
          </div>

          <div className="divide-y divide-white/10">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="p-6 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {student.image}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">
                        {student.name}
                      </h4>
                      <p className="text-gray-400 text-sm">{student.rollNo}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        attendance[student.id]
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {attendance[student.id] ? "Present" : "Absent"}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleAttendance(student.id)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          attendance[student.id]
                            ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                            : "bg-white/5 border border-white/10 text-gray-400 hover:bg-green-500/10 hover:border-green-500/20 hover:text-green-400"
                        }`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleAttendance(student.id)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          !attendance[student.id]
                            ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                            : "bg-white/5 border border-white/10 text-gray-400 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400"
                        }`}
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all font-medium">
            Cancel
          </button>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-medium shadow-lg shadow-cyan-500/30">
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyAttendancePage;
