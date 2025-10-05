"use client";

import { useState, useEffect } from "react";
import { ADMIN_NAV, QUICK_ACTIONS } from "@/utils/constants";
import StudentsPage from "./StudentsPage";
import FacultyPage from "./FacultyPage";
import AnalyticsPage from "./AnalyticsPage";
import SettingsPage from "./SettingsPage";
import {
  Users,
  GraduationCap,
  CheckCircle,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalAttendance: 0,
    avgAttendance: 0,
  });
  const [departments, setDepartments] = useState([]);
  const [todaySummary, setTodaySummary] = useState({
    classesTotal: 0,
    attendanceMarked: 0,
    absent: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/dashboard");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Dashboard data received:", data);

        if (data.success) {
          setStats({
            totalStudents: data.stats.students || 0,
            totalFaculty: data.stats.faculty || 0,
            totalAttendance: data.stats.totalAttendance || 0,
            avgAttendance: parseFloat(data.stats.avgAttendance) || 0,
          });

          // Set departments from backend
          if (data.departments && data.departments.length > 0) {
            setDepartments(
              data.departments.map((dept) => ({
                name: dept.name,
                attendance: dept.attendance || 0,
              }))
            );
          } else {
            setDepartments([
              { name: "Computer Science", attendance: 0 },
              { name: "Electrical Engineering", attendance: 0 },
              { name: "Mechanical Engineering", attendance: 0 },
              { name: "Civil Engineering", attendance: 0 },
              { name: "Business Administration", attendance: 0 },
            ]);
          }

          // Set today's summary from backend
          if (data.todaySummary) {
            setTodaySummary({
              classesTotal: data.todaySummary.classesTotal || 0,
              attendanceMarked: data.todaySummary.attendanceMarked || 0,
              absent: data.todaySummary.absent || 0,
            });
          }

          // Set recent activities from backend
          if (data.recentActivities && data.recentActivities.length > 0) {
            setRecentActivities(data.recentActivities);
          } else {
            setRecentActivities([
              {
                action: "No recent activity",
                time: "N/A",
                color: "bg-gray-500",
              },
            ]);
          }
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        // Use fallback/demo data when backend is not available
        setStats({
          totalStudents: 1234,
          totalFaculty: 87,
          totalAttendance: 45678,
          avgAttendance: 87.5,
        });

        setDepartments([
          { name: "Computer Science", attendance: 92 },
          { name: "Electrical Engineering", attendance: 88 },
          { name: "Mechanical Engineering", attendance: 85 },
          { name: "Civil Engineering", attendance: 90 },
          { name: "Business Administration", attendance: 86 },
        ]);

        setTodaySummary({
          classesTotal: 24,
          attendanceMarked: 18,
          absent: 6,
        });

        setRecentActivities([
          {
            action: "New student added",
            time: "2m ago",
            color: "bg-green-500",
          },
          {
            action: "Attendance marked",
            time: "15m ago",
            color: "bg-blue-500",
          },
          {
            action: "Report generated",
            time: "1h ago",
            color: "bg-purple-500",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Refresh data every 30 seconds for live updates
    const interval = setInterval(fetchDashboardData, 30000);

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
      label: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "from-cyan-500 to-blue-600",
      change: "+12%",
      changeType: "increase",
      bgGlow: "shadow-cyan-500/20",
    },
    {
      label: "Total Faculty",
      value: stats.totalFaculty,
      icon: GraduationCap,
      color: "from-purple-500 to-indigo-600",
      change: "+5%",
      changeType: "increase",
      bgGlow: "shadow-purple-500/20",
    },
    {
      label: "Attendance Records",
      value: stats.totalAttendance,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      change: "+18%",
      changeType: "increase",
      bgGlow: "shadow-green-500/20",
    },
    {
      label: "Average Attendance",
      value: `${stats.avgAttendance}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      change: "+2.3%",
      changeType: "increase",
      bgGlow: "shadow-orange-500/20",
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
                  Dashboard Overview
                </h2>
                <p className="text-gray-400 text-lg">
                  Welcome back! Here's what's happening today.
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
                      </div>
                      <p className="text-gray-400 text-sm mb-2 font-medium">
                        {stat.label}
                      </p>
                      <p className="text-4xl font-bold text-white mb-1">
                        {stat.value}
                      </p>
                      <p className="text-gray-500 text-xs">vs last month</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Department Overview - Takes 2 columns */}
                {departments.length > 0 && (
                  <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          Department Performance
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Attendance overview by department
                        </p>
                      </div>
                      <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                        <span className="text-cyan-400 text-sm font-medium">
                          Live Data
                        </span>
                      </div>
                    </div>
                    <div className="space-y-5">
                      {departments.map((dept, idx) => (
                        <div key={idx} className="group">
                          <div className="flex justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm`}
                              >
                                {idx + 1}
                              </div>
                              <div>
                                <span className="text-white font-semibold text-base block">
                                  {dept.name}
                                </span>
                                <span className="text-gray-500 text-xs">
                                  Department
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-cyan-400 font-bold text-2xl block">
                                {dept.attendance}%
                              </span>
                              <span className="text-gray-500 text-xs">
                                Attendance
                              </span>
                            </div>
                          </div>
                          <div className="relative w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                            <div
                              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg"
                              style={{ width: `${dept.attendance}%` }}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Stats - Takes 1 column */}
                <div className="space-y-6">
                  {/* Today's Summary - NOW WITH LIVE DATA */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Today's Summary
                      </h3>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">
                          Classes Today
                        </span>
                        <span className="text-white font-bold text-lg">
                          {todaySummary.classesTotal}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Present</span>
                        <span className="text-green-400 font-bold text-lg">
                          {todaySummary.attendanceMarked}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Absent</span>
                        <span className="text-red-400 font-bold text-lg">
                          {todaySummary.absent}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity - NOW WITH LIVE DATA */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Recent Activity
                      </h3>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {recentActivities.length > 0 ? (
                        recentActivities.slice(0, 5).map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 ${activity.color} rounded-full animate-pulse`}
                            ></div>
                            <div className="flex-1">
                              <p className="text-gray-300 text-sm">
                                {activity.action}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm text-center py-4">
                          No recent activity
                        </p>
                      )}
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
                  {QUICK_ACTIONS.map((action, idx) => (
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
      case "students":
        return <StudentsPage />;
      case "faculty":
        return <FacultyPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "settings":
        return <SettingsPage />;
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
          <p className="text-sm text-gray-400 ml-13">Admin Dashboard</p>
        </div>

        <nav className="space-y-2 flex-1">
          {ADMIN_NAV.map((item) => (
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

export default AdminDashboard;
