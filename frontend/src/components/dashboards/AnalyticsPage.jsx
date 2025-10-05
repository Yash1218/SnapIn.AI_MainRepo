"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  BarChart3,
} from "lucide-react";

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [animatedStats, setAnimatedStats] = useState({
    averageAttendance: 0,
    totalClasses: 0,
    presentCount: 0,
    absentCount: 0,
  });
  const [barsAnimated, setBarsAnimated] = useState(false);

  // Mock analytics data
  const overallStats = {
    averageAttendance: 87.5,
    trend: 2.3,
    totalClasses: 1248,
    presentCount: 1092,
    absentCount: 156,
  };

  const departmentAnalytics = [
    { name: "Computer Science", attendance: 92, students: 450, change: 3.2 },
    {
      name: "Electrical Engineering",
      attendance: 88,
      students: 320,
      change: -1.5,
    },
    {
      name: "Mechanical Engineering",
      attendance: 85,
      students: 380,
      change: 1.8,
    },
    { name: "Civil Engineering", attendance: 90, students: 290, change: 2.1 },
    {
      name: "Business Administration",
      attendance: 86,
      students: 240,
      change: -0.8,
    },
  ];

  const monthlyTrend = [
    { month: "Jan", attendance: 85 },
    { month: "Feb", attendance: 7 },
    { month: "Mar", attendance: 10 },
    { month: "Apr", attendance: 50 },
    { month: "May", attendance: 100 },
    { month: "Jun", attendance: 87.5 },
  ];

  const topPerformers = [
    { name: "Computer Science", value: 92 },
    { name: "Civil Engineering", value: 90 },
    { name: "Electrical Engineering", value: 88 },
  ];

  const lowPerformers = [
    { name: "Mechanical Engineering", value: 85 },
    { name: "Business Administration", value: 86 },
  ];

  // Animate numbers on mount
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        averageAttendance: Math.min(
          overallStats.averageAttendance * progress,
          overallStats.averageAttendance
        ),
        totalClasses: Math.min(
          Math.floor(overallStats.totalClasses * progress),
          overallStats.totalClasses
        ),
        presentCount: Math.min(
          Math.floor(overallStats.presentCount * progress),
          overallStats.presentCount
        ),
        absentCount: Math.min(
          Math.floor(overallStats.absentCount * progress),
          overallStats.absentCount
        ),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(overallStats);
      }
    }, interval);

    // Trigger bar animation after a short delay
    setTimeout(() => setBarsAnimated(true), 300);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Analytics Dashboard
            </h2>
            <p className="text-gray-400">
              Comprehensive attendance insights and trends
            </p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
              <option value="year">This Year</option>
            </select>
            <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Overall Attendance</p>
                <p className="text-4xl font-bold text-white">
                  {animatedStats.averageAttendance.toFixed(1)}%
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <PieChart className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+{overallStats.trend}% from last period</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <Calendar className="w-8 h-8 text-purple-400 mb-2" />
            <p className="text-gray-400 text-sm mb-1">Total Classes</p>
            <p className="text-3xl font-bold text-white">
              {animatedStats.totalClasses}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-gray-400 text-sm mb-1">Present</p>
            <p className="text-3xl font-bold text-white">
              {animatedStats.presentCount}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <TrendingDown className="w-8 h-8 text-red-400 mb-2" />
            <p className="text-gray-400 text-sm mb-1">Absent</p>
            <p className="text-3xl font-bold text-white">
              {animatedStats.absentCount}
            </p>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Attendance Trend</h3>
            <BarChart3 className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="h-64 flex items-end justify-between gap-4">
            {monthlyTrend.map((data, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full bg-gray-700/50 rounded-t-xl relative overflow-hidden transition-all duration-1000 ease-out"
                  style={{
                    height: barsAnimated
                      ? `${(data.attendance / 100) * 240}px`
                      : "0px",
                    transitionDelay: `${idx * 100}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 to-blue-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-400 to-blue-500 animate-pulse opacity-50"></div>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm">
                    {data.attendance}%
                  </p>
                  <p className="text-gray-400 text-xs">{data.month}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Analytics */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Department Performance
          </h3>
          <div className="space-y-6">
            {departmentAnalytics.map((dept, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-white font-medium">
                        {dept.name}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({dept.students} students)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        dept.change > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {dept.change > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{Math.abs(dept.change)}%</span>
                    </div>
                    <span className="text-cyan-400 font-bold min-w-[60px] text-right">
                      {dept.attendance}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: barsAnimated ? `${dept.attendance}%` : "0%",
                      transitionDelay: `${idx * 100}ms`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top & Low Performers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Performers */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Top Performers</h3>
            </div>
            <div className="space-y-4">
              {topPerformers.map((dept, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-500/20 transition-all duration-300 hover:bg-green-500/20"
                  style={{
                    opacity: barsAnimated ? 1 : 0,
                    transform: barsAnimated
                      ? "translateY(0)"
                      : "translateY(20px)",
                    transitionDelay: `${idx * 150}ms`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {idx + 1}
                    </div>
                    <span className="text-white font-medium">{dept.name}</span>
                  </div>
                  <span className="text-green-400 font-bold text-xl">
                    {dept.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Performers */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Needs Attention</h3>
            </div>
            <div className="space-y-4">
              {lowPerformers.map((dept, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-orange-500/10 rounded-xl border border-orange-500/20 transition-all duration-300 hover:bg-orange-500/20"
                  style={{
                    opacity: barsAnimated ? 1 : 0,
                    transform: barsAnimated
                      ? "translateY(0)"
                      : "translateY(20px)",
                    transitionDelay: `${idx * 150}ms`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      !
                    </div>
                    <span className="text-white font-medium">{dept.name}</span>
                  </div>
                  <span className="text-orange-400 font-bold text-xl">
                    {dept.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
