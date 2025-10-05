"use client";

import { useState, useEffect } from "react";
import { FACULTY_NAV } from "@/utils/constants";
import FacultyCoursesPage from "./faculty/FacultyCoursesPage";
import FacultyAttendancePage from "./faculty/FacultyAttendancePage";
import FacultySchedulePage from "./faculty/FacultySchedulePage";
import FacultyReportsPage from "./faculty/FacultyReportsPage";
import FacultyProfilePage from "./faculty/FacultyProfilePage";
import {
  CheckCircle,
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  ArrowUp,
  Clock,
  Award,
} from "lucide-react";

const FacultyDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    classesToday: 0,
    avgAttendance: 0,
  });
  const [todayClasses, setTodayClasses] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingClass, setUpcomingClass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulated data - replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStats({
          totalCourses: 5,
          totalStudents: 240,
          classesToday: 3,
          avgAttendance: 85.7,
        });

        setTodayClasses([
          {
            id: 1,
            course: "Data Structures",
            time: "09:00 AM",
            room: "Lab 101",
            students: 45,
            status: "completed",
          },
          {
            id: 2,
            course: "Algorithms",
            time: "11:30 AM",
            room: "Room 204",
            students: 50,
            status: "upcoming",
          },
          {
            id: 3,
            course: "Database Systems",
            time: "02:00 PM",
            room: "Lab 203",
            students: 48,
            status: "upcoming",
          },
        ]);

        setUpcomingClass({
          course: "Algorithms",
          time: "11:30 AM",
          room: "Room 204",
          students: 50,
          duration: "90 min",
        });

        setRecentActivities([
          {
            action: "Attendance marked for Data Structures",
            time: "10m ago",
            color: "bg-green-500",
          },
          {
            action: "Assignment uploaded",
            time: "1h ago",
            color: "bg-blue-500",
          },
          {
            action: "Student query resolved",
            time: "2h ago",
            color: "bg-purple-500",
          },
        ]);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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
      label: "My Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "from-cyan-500 to-blue-600",
      change: "+1",
      changeType: "increase",
      bgGlow: "shadow-cyan-500/20",
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "from-purple-500 to-indigo-600",
      change: "+15",
      changeType: "increase",
      bgGlow: "shadow-purple-500/20",
    },
    {
      label: "Classes Today",
      value: stats.classesToday,
      icon: Calendar,
      color: "from-green-500 to-emerald-600",
      change: "0",
      changeType: "neutral",
      bgGlow: "shadow-green-500/20",
    },
    {
      label: "Avg Attendance",
      value: `${stats.avgAttendance}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      change: "+3.2%",
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
                  Faculty Dashboard
                </h2>
                <p className="text-gray-400 text-lg">
                  Welcome back! Here's your teaching schedule for today.
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
                            {stat.changeType === "increase" && (
                              <ArrowUp className="w-3 h-3" />
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
                      <p className="text-gray-500 text-xs">This semester</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Today's Schedule - Takes 2 columns */}
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Today's Schedule
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Your classes for today
                      </p>
                    </div>
                    <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                      <span className="text-cyan-400 text-sm font-medium">
                        {todayClasses.length} Classes
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {todayClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className="group relative bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-bold text-lg mb-1">
                                {cls.course}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {cls.time}
                                </span>
                                <span>Room: {cls.room}</span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {cls.students} students
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            {cls.status === "completed" ? (
                              <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                                Completed
                              </span>
                            ) : (
                              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm font-medium">
                                Mark Attendance
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                  {/* Upcoming Class */}
                  {upcomingClass && (
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">
                          Next Class
                        </h3>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Course</p>
                          <p className="text-white font-bold text-xl">
                            {upcomingClass.course}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-gray-400 text-xs mb-1">Time</p>
                            <p className="text-cyan-400 font-semibold">
                              {upcomingClass.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs mb-1">Room</p>
                            <p className="text-cyan-400 font-semibold">
                              {upcomingClass.room}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <span className="text-gray-400 text-sm">
                            Students
                          </span>
                          <span className="text-white font-bold">
                            {upcomingClass.students}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Stats */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Quick Stats
                      </h3>
                      <Award className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">
                          Classes This Week
                        </span>
                        <span className="text-white font-bold text-lg">15</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">
                          Attendance Rate
                        </span>
                        <span className="text-green-400 font-bold text-lg">
                          85.7%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">
                          Pending Reviews
                        </span>
                        <span className="text-orange-400 font-bold text-lg">
                          8
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Recent Activity
                      </h3>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {recentActivities.map((activity, idx) => (
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
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              {/* <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button className="group relative overflow-hidden flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                    <CheckCircle className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold relative z-10">
                      Mark Attendance
                    </span>
                  </button>
                  <button className="group relative overflow-hidden flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                    <BookOpen className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold relative z-10">
                      View Courses
                    </span>
                  </button>
                  <button className="group relative overflow-hidden flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                    <Calendar className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold relative z-10">
                      View Schedule
                    </span>
                  </button>
                  <button className="group relative overflow-hidden flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                    <TrendingUp className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold relative z-10">
                      Generate Report
                    </span>
                  </button>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        );
      case "courses":
        return <FacultyCoursesPage />;
      case "attendance":
        return <FacultyAttendancePage />;
      case "schedule":
        return <FacultySchedulePage />;
      case "reports":
        return <FacultyReportsPage />;
      case "profile":
        return <FacultyProfilePage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col h-screen sticky top-0">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SnapIn.AI</h1>
            </div>
          </div>
          <p className="text-sm text-gray-400 ml-13">Faculty Dashboard</p>
        </div>

        {/* Scrollable nav */}
        <nav className="space-y-2 flex-1 overflow-y-auto px-6">
          {FACULTY_NAV.map((item) => (
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

        {/* Fixed logout at bottom */}
        <div className="p-6 pt-4 border-t border-white/10 mt-auto">
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

export default FacultyDashboard;
