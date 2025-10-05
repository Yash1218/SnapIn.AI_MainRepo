"use client";

import { useState } from "react";
import {
  BookOpen,
  Users,
  Clock,
  Calendar,
  TrendingUp,
  Search,
  Filter,
  Edit,
  Eye,
  BarChart3,
} from "lucide-react";

const FacultyCoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("current");

  const courses = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS301",
      semester: "Fall 2024",
      students: 45,
      schedule: "Mon, Wed, Fri - 09:00 AM",
      room: "Lab 101",
      attendance: 87.5,
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: 2,
      name: "Algorithms",
      code: "CS302",
      semester: "Fall 2024",
      students: 50,
      schedule: "Tue, Thu - 11:30 AM",
      room: "Room 204",
      attendance: 85.2,
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: 3,
      name: "Database Systems",
      code: "CS401",
      semester: "Fall 2024",
      students: 48,
      schedule: "Mon, Wed - 02:00 PM",
      room: "Lab 203",
      attendance: 88.9,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 4,
      name: "Web Development",
      code: "CS305",
      semester: "Fall 2024",
      students: 42,
      schedule: "Tue, Thu - 03:30 PM",
      room: "Lab 105",
      attendance: 82.3,
      color: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      name: "Software Engineering",
      code: "CS402",
      semester: "Fall 2024",
      students: 55,
      schedule: "Wed, Fri - 11:00 AM",
      room: "Room 301",
      attendance: 90.1,
      color: "from-pink-500 to-rose-600",
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Courses
          </h2>
          <p className="text-gray-400 text-lg">
            Manage and view all your assigned courses
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-cyan-400" />
              <span className="text-3xl font-bold text-white">
                {courses.length}
              </span>
            </div>
            <p className="text-gray-300 font-medium">Total Courses</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-white">
                {courses.reduce((sum, course) => sum + course.students, 0)}
              </span>
            </div>
            <p className="text-gray-300 font-medium">Total Students</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-white">
                {(
                  courses.reduce((sum, course) => sum + course.attendance, 0) /
                  courses.length
                ).toFixed(1)}
                %
              </span>
            </div>
            <p className="text-gray-300 font-medium">Avg Attendance</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-orange-400" />
              <span className="text-3xl font-bold text-white">15</span>
            </div>
            <p className="text-gray-300 font-medium">Classes/Week</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all"
              >
                <option value="current">Current Semester</option>
                <option value="all">All Semesters</option>
                <option value="fall2024">Fall 2024</option>
                <option value="spring2024">Spring 2024</option>
              </select>
              <button className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Course Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${course.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {course.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{course.code}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/20 transition-all">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Course Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Students</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {course.students}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs">Attendance</span>
                  </div>
                  <p className="text-2xl font-bold text-green-400">
                    {course.attendance}%
                  </p>
                </div>
              </div>

              {/* Schedule Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm">{course.schedule}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">Room: {course.room}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium">
                  Mark Attendance
                </button>
                <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Stats
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyCoursesPage;
