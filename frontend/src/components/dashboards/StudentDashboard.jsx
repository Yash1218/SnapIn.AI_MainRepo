"use client";

import { STUDENT_NAV } from "@/utils/constants";

const StudentDashboard = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-white">Attendance System</h1>
          <p className="text-sm text-gray-400">Student Dashboard</p>
        </div>

        <nav className="space-y-2">
          {STUDENT_NAV.map((item, idx) => (
            <button
              key={idx}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={onLogout}
          className="w-full mt-8 px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Student Dashboard
          </h2>
          <p className="text-gray-400 text-lg">
            Track your attendance and progress
          </p>

          {/* Add your student content here */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">
                Attendance Rate
              </h3>
              <p className="text-4xl font-bold text-cyan-400 mb-2">87.5%</p>
              <p className="text-gray-400">Current semester average</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">
                Classes Attended
              </h3>
              <p className="text-4xl font-bold text-green-400 mb-2">156/178</p>
              <p className="text-gray-400">Total classes this semester</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">
                Today's Schedule
              </h3>
              <p className="text-gray-400">5 classes scheduled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
