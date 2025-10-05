"use client";

import { useState } from "react";
import {
  BookOpen,
  Users,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  FileText,
  Video,
  Search,
  Filter,
} from "lucide-react";

const CoursesStudent = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: 1,
      name: "Data Structures & Algorithms",
      code: "CS301",
      faculty: "Dr. Sarah Smith",
      credits: 4,
      attendance: 92,
      grade: "A",
      color: "from-cyan-500 to-blue-600",
      schedule: "Mon, Wed, Fri - 09:00 AM",
      students: 45,
      completed: 75,
      total: 100,
      assignments: 8,
      exams: 2,
    },
    {
      id: 2,
      name: "Database Management Systems",
      code: "CS302",
      faculty: "Prof. John Johnson",
      credits: 4,
      attendance: 88,
      grade: "A-",
      color: "from-purple-500 to-indigo-600",
      schedule: "Tue, Thu - 11:00 AM",
      students: 50,
      completed: 68,
      total: 100,
      assignments: 6,
      exams: 2,
    },
    {
      id: 3,
      name: "Web Development",
      code: "CS303",
      faculty: "Dr. Emily Williams",
      credits: 3,
      attendance: 85,
      grade: "B+",
      color: "from-green-500 to-emerald-600",
      schedule: "Mon, Wed - 02:00 PM",
      students: 40,
      completed: 82,
      total: 100,
      assignments: 10,
      exams: 1,
    },
    {
      id: 4,
      name: "Operating Systems",
      code: "CS304",
      faculty: "Dr. Michael Brown",
      credits: 4,
      attendance: 90,
      grade: "A",
      color: "from-orange-500 to-red-600",
      schedule: "Tue, Thu, Sat - 10:00 AM",
      students: 48,
      completed: 60,
      total: 100,
      assignments: 7,
      exams: 3,
    },
    {
      id: 5,
      name: "Machine Learning",
      code: "CS305",
      faculty: "Prof. Lisa Davis",
      credits: 3,
      attendance: 84,
      grade: "B+",
      color: "from-pink-500 to-rose-600",
      schedule: "Wed, Fri - 01:00 PM",
      students: 35,
      completed: 55,
      total: 100,
      assignments: 5,
      exams: 2,
    },
    {
      id: 6,
      name: "Software Engineering",
      code: "CS306",
      faculty: "Dr. Robert Wilson",
      credits: 3,
      attendance: 87,
      grade: "A-",
      color: "from-blue-500 to-cyan-600",
      schedule: "Mon, Thu - 03:00 PM",
      students: 42,
      completed: 70,
      total: 100,
      assignments: 9,
      exams: 2,
    },
  ];

  const stats = {
    totalCourses: 6,
    totalCredits: 21,
    avgGrade: "A-",
    avgAttendance: 87.7,
  };

  const filters = [
    { id: "all", label: "All Courses" },
    { id: "active", label: "Active" },
    { id: "high", label: "High Performance" },
    { id: "low", label: "Needs Attention" },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Courses
          </h2>
          <p className="text-gray-400 text-lg">
            Manage your enrolled courses and track your progress
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium">Total Courses</p>
            </div>
            <p className="text-4xl font-bold text-white">
              {stats.totalCourses}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium">Total Credits</p>
            </div>
            <p className="text-4xl font-bold text-white">
              {stats.totalCredits}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium">Avg Grade</p>
            </div>
            <p className="text-4xl font-bold text-white">{stats.avgGrade}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium">
                Avg Attendance
              </p>
            </div>
            <p className="text-4xl font-bold text-white">
              {stats.avgAttendance}%
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              {/* Course Header */}
              <div className={`bg-gradient-to-r ${course.color} p-6`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-white/80 text-sm font-medium mb-1">
                      {course.code}
                    </p>
                    <h3 className="text-white font-bold text-xl mb-2">
                      {course.name}
                    </h3>
                    <p className="text-white/90 text-sm">{course.faculty}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Credits</p>
                    <p className="text-white font-bold text-lg">
                      {course.credits}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Grade</p>
                    <p className="text-cyan-400 font-bold text-lg">
                      {course.grade}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Attendance</p>
                    <p className="text-green-400 font-bold text-lg">
                      {course.attendance}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Students</p>
                    <p className="text-white font-bold text-lg">
                      {course.students}
                    </p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-white/5 rounded-lg">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-300 text-sm">{course.schedule}</p>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-400">Course Progress</span>
                    <span className="text-cyan-400 font-bold">
                      {course.completed}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${course.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${course.completed}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center justify-between mb-4 p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">
                      {course.assignments} Assignments
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">
                      {course.exams} Exams
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-all">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">Materials</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                    <Video className="w-4 h-4" />
                    <span className="text-sm font-medium">Join Class</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesStudent;
