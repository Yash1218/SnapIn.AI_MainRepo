"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Download,
  Filter,
  Search,
} from "lucide-react";

const AttendanceStudent = () => {
  const [selectedMonth, setSelectedMonth] = useState("May 2025");
  const [searchQuery, setSearchQuery] = useState("");

  const attendanceData = [
    {
      date: "May 15, 2025",
      day: "Monday",
      classes: [
        {
          subject: "Data Structures",
          time: "09:00 AM",
          status: "Present",
          faculty: "Dr. Smith",
        },
        {
          subject: "Database Systems",
          time: "11:00 AM",
          status: "Present",
          faculty: "Prof. Johnson",
        },
        {
          subject: "Web Development",
          time: "02:00 PM",
          status: "Absent",
          faculty: "Dr. Williams",
        },
      ],
    },
    {
      date: "May 14, 2025",
      day: "Sunday",
      classes: [
        {
          subject: "Operating Systems",
          time: "10:00 AM",
          status: "Present",
          faculty: "Dr. Brown",
        },
        {
          subject: "Machine Learning",
          time: "01:00 PM",
          status: "Present",
          faculty: "Prof. Davis",
        },
      ],
    },
    {
      date: "May 13, 2025",
      day: "Saturday",
      classes: [
        {
          subject: "Software Engineering",
          time: "09:00 AM",
          status: "Present",
          faculty: "Dr. Wilson",
        },
        {
          subject: "Algorithm Design",
          time: "11:00 AM",
          status: "Present",
          faculty: "Prof. Taylor",
        },
        {
          subject: "Computer Networks",
          time: "03:00 PM",
          status: "Present",
          faculty: "Dr. Anderson",
        },
      ],
    },
  ];

  const stats = {
    overall: 87.5,
    thisMonth: 90.0,
    thisWeek: 85.0,
    presentDays: 42,
    absentDays: 6,
    totalClasses: 178,
  };

  const subjectWiseAttendance = [
    { subject: "Data Structures", attendance: 92, total: 45, attended: 41 },
    { subject: "Database Systems", attendance: 88, total: 40, attended: 35 },
    { subject: "Web Development", attendance: 85, total: 38, attended: 32 },
    { subject: "Operating Systems", attendance: 90, total: 42, attended: 38 },
    { subject: "Machine Learning", attendance: 84, total: 35, attended: 29 },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Attendance Records
          </h2>
          <p className="text-gray-400 text-lg">
            Track your attendance and maintain your academic performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium">Overall</p>
            </div>
            <p className="text-3xl font-bold text-cyan-400">{stats.overall}%</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium">This Month</p>
            </div>
            <p className="text-3xl font-bold text-purple-400">
              {stats.thisMonth}%
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium">This Week</p>
            </div>
            <p className="text-3xl font-bold text-green-400">
              {stats.thisWeek}%
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium">Present</p>
            </div>
            <p className="text-3xl font-bold text-blue-400">
              {stats.presentDays}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium">Absent</p>
            </div>
            <p className="text-3xl font-bold text-red-400">
              {stats.absentDays}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium">Total</p>
            </div>
            <p className="text-3xl font-bold text-orange-400">
              {stats.totalClasses}
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Attendance History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                  />
                </div>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none transition-all"
                >
                  <option value="May 2025">May 2025</option>
                  <option value="April 2025">April 2025</option>
                  <option value="March 2025">March 2025</option>
                </select>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105">
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Export</span>
                </button>
              </div>
            </div>

            {/* Attendance Records */}
            <div className="space-y-4">
              {attendanceData.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 px-6 py-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-bold text-lg">
                          {day.date}
                        </h3>
                        <p className="text-gray-400 text-sm">{day.day}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-cyan-400 font-bold">
                          {
                            day.classes.filter((c) => c.status === "Present")
                              .length
                          }
                          /{day.classes.length}
                        </p>
                        <p className="text-gray-400 text-sm">Classes</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    {day.classes.map((cls, clsIdx) => (
                      <div
                        key={clsIdx}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              cls.status === "Present"
                                ? "bg-green-500/20"
                                : "bg-red-500/20"
                            }`}
                          >
                            {cls.status === "Present" ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-semibold">
                              {cls.subject}
                            </p>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <span>{cls.faculty}</span>
                              <span>•</span>
                              <span>{cls.time}</span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-lg text-sm font-bold ${
                            cls.status === "Present"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {cls.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Subject-wise Attendance */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">
                Subject-wise Attendance
              </h3>
              <div className="space-y-5">
                {subjectWiseAttendance.map((subject, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {subject.subject}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {subject.attended}/{subject.total} classes
                        </p>
                      </div>
                      <span className="text-cyan-400 font-bold text-lg">
                        {subject.attendance}%
                      </span>
                    </div>
                    <div className="relative w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg"
                        style={{ width: `${subject.attendance}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Tips */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-bold text-white mb-4">
                📚 Attendance Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Maintain at least 75% attendance to be eligible for exams
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Check your schedule daily to avoid missing classes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Regular attendance improves academic performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStudent;
