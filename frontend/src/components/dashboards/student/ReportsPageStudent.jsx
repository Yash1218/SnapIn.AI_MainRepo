"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react";

const ReportsPageStudent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("semester");

  const monthlyData = [
    { month: "Aug", attendance: 92, classes: 25 },
    { month: "Sep", attendance: 88, classes: 28 },
    { month: "Oct", attendance: 87, classes: 20 },
  ];

  const subjectPerformance = [
    {
      subject: "Data Structures",
      attendance: 87.5,
      present: 28,
      absent: 4,
      total: 32,
    },
    {
      subject: "Web Development",
      attendance: 93.8,
      present: 30,
      absent: 2,
      total: 32,
    },
    {
      subject: "Database Systems",
      attendance: 86.7,
      present: 26,
      absent: 4,
      total: 30,
    },
    {
      subject: "Operating Systems",
      attendance: 89.3,
      present: 25,
      absent: 3,
      total: 28,
    },
    {
      subject: "Computer Networks",
      attendance: 85.0,
      present: 17,
      absent: 3,
      total: 20,
    },
    {
      subject: "Software Engineering",
      attendance: 90.5,
      present: 19,
      absent: 2,
      total: 21,
    },
  ];

  const availableReports = [
    {
      title: "Monthly Attendance Report",
      description: "Detailed attendance breakdown for the current month",
      date: "October 2025",
      icon: Calendar,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Semester Performance Report",
      description: "Complete semester attendance and performance analysis",
      date: "Fall 2025",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Subject-wise Analysis",
      description: "Individual subject attendance and progress report",
      date: "Current Semester",
      icon: BarChart3,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Attendance Trends",
      description: "Visual representation of attendance patterns",
      date: "Last 3 Months",
      icon: PieChart,
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Reports & Analytics
          </h2>
          <p className="text-gray-400 text-lg">
            View and download your attendance reports
          </p>
        </div>

        {/* Period Selector */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 mb-8">
          <div className="flex gap-2">
            {["week", "month", "semester", "year"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${
                  selectedPeriod === period
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-2">Overall Attendance</p>
            <p className="text-4xl font-bold text-white mb-1">87.5%</p>
            <p className="text-green-400 text-sm">+2.5% from last month</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-2">Total Classes</p>
            <p className="text-4xl font-bold text-white mb-1">178</p>
            <p className="text-gray-400 text-sm">This semester</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-2">Reports Generated</p>
            <p className="text-4xl font-bold text-white mb-1">12</p>
            <p className="text-gray-400 text-sm">Available for download</p>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Monthly Attendance Trend
          </h3>
          <div className="space-y-6">
            {monthlyData.map((data, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">{data.month}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">
                        {data.month} 2025
                      </p>
                      <p className="text-gray-400 text-sm">
                        {data.classes} classes
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-bold text-2xl">
                      {data.attendance}%
                    </p>
                    <p className="text-gray-400 text-sm">Attendance</p>
                  </div>
                </div>
                <div className="relative w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${data.attendance}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Subject-wise Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">
                    Subject
                  </th>
                  <th className="text-center py-4 px-4 text-gray-400 font-semibold">
                    Present
                  </th>
                  <th className="text-center py-4 px-4 text-gray-400 font-semibold">
                    Absent
                  </th>
                  <th className="text-center py-4 px-4 text-gray-400 font-semibold">
                    Total
                  </th>
                  <th className="text-right py-4 px-4 text-gray-400 font-semibold">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjectPerformance.map((subject, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <p className="text-white font-semibold">
                        {subject.subject}
                      </p>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-green-400 font-bold">
                        {subject.present}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-red-400 font-bold">
                        {subject.absent}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-gray-300 font-semibold">
                        {subject.total}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-24 bg-gray-700/50 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full"
                            style={{ width: `${subject.attendance}%` }}
                          ></div>
                        </div>
                        <span className="text-cyan-400 font-bold w-16 text-right">
                          {subject.attendance}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Available Reports */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">
            Available Reports
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableReports.map((report, idx) => (
              <div
                key={idx}
                className="group bg-white/5 rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-102"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${report.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <report.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg mb-1">
                      {report.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-2">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </div>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPageStudent;
