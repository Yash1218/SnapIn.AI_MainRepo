"use client";

import { useState, useEffect } from "react";
import { STUDENT_NAV, STUDENT_QUICK_ACTIONS } from "@/utils/constants";
import AttendanceStudent from "./student/AttendanceStudent";
import CoursesStudent from "./student/CoursesStudent";
import ScheduleStudent from "./student/ScheduleStudent";
import ProfileStudent from "./student/ProfileStudent";
import {
  CheckCircle,
  Calendar,
  TrendingUp,
  Award,
  ArrowUp,
  ArrowDown,
  Clock,
} from "lucide-react";

const StudentDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    attendanceRate: 0,
    classesAttended: 0,
    totalClasses: 0,
    todayClasses: 0,
  });
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [recentAttendance, setRecentAttendance] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch student dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulated API call - replace with actual endpoint
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Demo data
        setStats({
          attendanceRate: 87.5,
          classesAttended: 156,
          totalClasses: 178,
          todayClasses: 5,
        });

        setUpcomingClasses([
          {
            subject: "Data Structures",
            time: "09:00 AM",
            room: "Room 301",
            faculty: "Dr. Smith",
            color: "from-cyan-500 to-blue-600",
          },
          {
            subject: "Algorithm Design",
            time: "11:00 AM",
            room: "Room 205",
            faculty: "Prof. Johnson",
            color: "from-purple-500 to-indigo-600",
          },
          {
            subject: "Database Systems",
            time: "02:00 PM",
            room: "Lab 401",
            faculty: "Dr. Williams",
            color: "from-green-500 to-emerald-600",
          },
        ]);

        setRecentAttendance([
          {
            subject: "Operating Systems",
            date: "Today",
            status: "Present",
            time: "08:00 AM",
          },
          {
            subject: "Web Development",
            date: "Yesterday",
            status: "Present",
            time: "10:00 AM",
          },
          {
            subject: "Machine Learning",
            date: "2 days ago",
            status: "Absent",
            time: "01:00 PM",
          },
          {
            subject: "Software Engineering",
            date: "3 days ago",
            status: "Present",
            time: "03:00 PM",
          },
        ]);

        setMonthlyData([
          { month: "Jan", attendance: 85 },
          { month: "Feb", attendance: 88 },
          { month: "Mar", attendance: 86 },
          { month: "Apr", attendance: 90 },
          { month: "May", attendance: 87.5 },
        ]);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statsArray = [
    {
      label: "Attendance Rate",
      value: `${stats.attendanceRate}%`,
      icon: TrendingUp,
      color: "from-cyan-500 to-blue-600",
      change: "+2.5%",
      changeType: "increase",
      bgGlow: "shadow-cyan-500/20",
      description: "Current semester",
    },
    {
      label: "Classes Attended",
      value: `${stats.classesAttended}/${stats.totalClasses}`,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      change: "+8",
      changeType: "increase",
      bgGlow: "shadow-green-500/20",
      description: "This month",
    },
    {
      label: "Today's Schedule",
      value: stats.todayClasses,
      icon: Calendar,
      color: "from-purple-500 to-indigo-600",
      change: "5 classes",
      changeType: "neutral",
      bgGlow: "shadow-purple-500/20",
      description: "Classes scheduled",
    },
    {
      label: "Performance Score",
      value: "A+",
      icon: Award,
      color: "from-orange-500 to-red-600",
      change: "Top 10%",
      changeType: "increase",
      bgGlow: "shadow-orange-500/20",
      description: "Overall rating",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Header */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Student Dashboard
                </h2>
                <p className="text-gray-400 text-lg">
                  Welcome back! Track your attendance and academic progress.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsArray.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:shadow-2xl ${stat.bgGlow} hover:scale-105`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <stat.icon className="w-7 h-7 text-white" />
                        </div>
                        {stat.changeType !== "neutral" && (
                          <div
                            className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                              stat.changeType === "increase"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {stat.changeType === "increase" ? (
                              <ArrowUp className="w-3 h-3" />
                            ) : (
                              <ArrowDown className="w-3 h-3" />
                            )}
                            <span className="text-xs font-bold">
                              {stat.change}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2 font-medium">
                        {stat.label}
                      </p>
                      <p className="text-4xl font-bold text-white mb-1">
                        {stat.value}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Upcoming Classes - Takes 2 columns */}
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Today's Schedule
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Your upcoming classes for today
                      </p>
                    </div>
                    <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                      <span className="text-cyan-400 text-sm font-medium">
                        {upcomingClasses.length} Classes
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {upcomingClasses.map((cls, idx) => (
                      <div
                        key={idx}
                        className="group relative bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${cls.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
                        ></div>
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 bg-gradient-to-r ${cls.color} rounded-lg flex items-center justify-center`}
                            >
                              <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-lg mb-1">
                                {cls.subject}
                              </h4>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-400">
                                  {cls.faculty}
                                </span>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-400">
                                  {cls.room}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-cyan-400 font-bold text-xl">
                              {cls.time}
                            </div>
                            <button className="mt-2 px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30 transition-all">
                              Mark Attendance
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Info - Takes 1 column */}
                <div className="space-y-6">
                  {/* Monthly Progress */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Monthly Progress
                      </h3>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      {monthlyData.map((month, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between mb-2 text-sm">
                            <span className="text-gray-300">{month.month}</span>
                            <span className="text-cyan-400 font-bold">
                              {month.attendance}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${month.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Attendance */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Recent Attendance
                      </h3>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {recentAttendance.map((record, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 ${
                                record.status === "Present"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              } rounded-full`}
                            ></div>
                            <div>
                              <p className="text-gray-300 text-sm font-medium">
                                {record.subject}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {record.date} • {record.time}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-full ${
                              record.status === "Present"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {record.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {STUDENT_QUICK_ACTIONS.map((action, idx) => (
                    <button
                      key={idx}
                      className={`group relative overflow-hidden flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${action.color} text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                    >
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                      <action.icon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold relative z-10">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "attendance":
        return <AttendanceStudent />;
      case "courses":
        return <CoursesStudent />;
      case "schedule":
        return <ScheduleStudent />;
      case "profile":
        return <ProfileStudent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SnapIn.AI</h1>
            </div>
          </div>
          <p className="text-sm text-gray-400 ml-13">Student Portal</p>
        </div>

        <nav className="space-y-2 flex-1">
          {STUDENT_NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#3B82F6] to-[#9333EA] text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "text-gray-400 hover:bg-white/5 hover:text-white hover:scale-105"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all hover:scale-105 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default StudentDashboard;
