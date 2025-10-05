"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  PieChart,
  Filter,
  Users,
  BookOpen,
} from "lucide-react";

const FacultyReportsPage = () => {
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [reportType, setReportType] = useState("attendance");

  const courses = [
    { code: "all", name: "All Courses" },
    { code: "CS301", name: "Data Structures" },
    { code: "CS302", name: "Algorithms" },
    { code: "CS401", name: "Database Systems" },
    { code: "CS305", name: "Web Development" },
    { code: "CS402", name: "Software Engineering" },
  ];

  const attendanceData = [
    {
      course: "Data Structures",
      code: "CS301",
      rate: 87.5,
      trend: "up",
      change: "+2.3%",
    },
    {
      course: "Algorithms",
      code: "CS302",
      rate: 85.2,
      trend: "up",
      change: "+1.8%",
    },
    {
      course: "Database Systems",
      code: "CS401",
      rate: 88.9,
      trend: "up",
      change: "+3.1%",
    },
    {
      course: "Web Development",
      code: "CS305",
      rate: 82.3,
      trend: "down",
      change: "-1.2%",
    },
    {
      course: "Software Engineering",
      code: "CS402",
      rate: 90.1,
      trend: "up",
      change: "+2.7%",
    },
  ];

  const monthlyStats = [
    { month: "Jan", attendance: 85, performance: 78 },
    { month: "Feb", attendance: 87, performance: 82 },
    { month: "Mar", attendance: 84, performance: 80 },
    { month: "Apr", attendance: 88, performance: 85 },
    { month: "May", attendance: 86, performance: 83 },
    { month: "Jun", attendance: 89, performance: 87 },
  ];

  const topPerformers = [
    { name: "Sarah Davis", rollNo: "CS2021004", attendance: 98, grade: "A+" },
    { name: "John Smith", rollNo: "CS2021001", attendance: 96, grade: "A+" },
    { name: "Emma Johnson", rollNo: "CS2021002", attendance: 95, grade: "A" },
    { name: "James Wilson", rollNo: "CS2021005", attendance: 94, grade: "A" },
    {
      name: "Olivia Martinez",
      rollNo: "CS2021008",
      attendance: 93,
      grade: "A",
    },
  ];

  const lowAttendance = [
    { name: "Michael Brown", rollNo: "CS2021003", attendance: 65, grade: "C" },
    { name: "Emily Taylor", rollNo: "CS2021006", attendance: 68, grade: "C+" },
    {
      name: "Daniel Anderson",
      rollNo: "CS2021007",
      attendance: 72,
      grade: "B-",
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Reports & Analytics
          </h2>
          <p className="text-gray-400 text-lg">
            View detailed reports and performance analytics
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-cyan-400" />
              <span className="text-3xl font-bold text-white">24</span>
            </div>
            <p className="text-gray-300 font-medium">Total Reports</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-white">86.8%</span>
            </div>
            <p className="text-gray-300 font-medium">Avg Attendance</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-white">240</span>
            </div>
            <p className="text-gray-300 font-medium">Total Students</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-orange-400" />
              <span className="text-3xl font-bold text-white">5</span>
            </div>
            <p className="text-gray-300 font-medium">Active Courses</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all"
              >
                <option value="attendance">Attendance Report</option>
                <option value="performance">Performance Report</option>
                <option value="summary">Summary Report</option>
              </select>
            </div>

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
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Time Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="semester">This Semester</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Course Attendance Overview */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Course Attendance Overview
                </h3>
                <p className="text-gray-400 text-sm">
                  Attendance rates across all courses
                </p>
              </div>
              <BarChart3 className="w-6 h-6 text-cyan-400" />
            </div>

            <div className="space-y-5">
              {attendanceData.map((course, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-white font-semibold text-base">
                        {course.course}
                      </h4>
                      <p className="text-gray-500 text-xs">{course.code}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                          course.trend === "up"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {course.trend === "up" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span className="text-xs font-bold">
                          {course.change}
                        </span>
                      </div>
                      <span className="text-cyan-400 font-bold text-xl">
                        {course.rate}%
                      </span>
                    </div>
                  </div>
                  <div className="relative w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg"
                      style={{ width: `${course.rate}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Monthly Trend</h3>
              <PieChart className="w-5 h-5 text-purple-400" />
            </div>
            <div className="space-y-3">
              {monthlyStats.slice(-6).map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div>
                    <p className="text-white font-semibold">{stat.month}</p>
                    <p className="text-gray-400 text-xs">2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-bold">
                      {stat.attendance}%
                    </p>
                    <p className="text-gray-500 text-xs">Attendance</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top and Low Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performers */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-8 border border-green-500/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Top Performers
                </h3>
                <p className="text-gray-400 text-sm">
                  Students with excellent attendance
                </p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="space-y-4">
              {topPerformers.map((student, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{student.name}</p>
                      <p className="text-gray-400 text-xs">{student.rollNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-lg">
                      {student.attendance}%
                    </p>
                    <p className="text-gray-400 text-xs">
                      Grade: {student.grade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Attendance Alert */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Attention Required
                </h3>
                <p className="text-gray-400 text-sm">
                  Students with low attendance
                </p>
              </div>
              <TrendingDown className="w-6 h-6 text-orange-400" />
            </div>
            <div className="space-y-4">
              {lowAttendance.map((student, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{student.name}</p>
                      <p className="text-gray-400 text-xs">{student.rollNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 font-bold text-lg">
                      {student.attendance}%
                    </p>
                    <p className="text-gray-400 text-xs">
                      Grade: {student.grade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium">
              Send Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyReportsPage;
