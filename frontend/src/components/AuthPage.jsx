"use client";

import { useState } from "react";

const AuthPage = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleLogin = () => {
    onLogin(formData.role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">
            Please {authMode === "login" ? "login" : "sign up"} to continue
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Login Form */}
          <div
            className={`bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 transition-all duration-300 ${
              authMode === "login"
                ? "border-cyan-400 shadow-lg shadow-cyan-500/30"
                : "border-white/10"
            }`}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Role
                </label>
                <select
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="student" className="bg-gray-800">
                    Student
                  </option>
                  <option value="faculty" className="bg-gray-800">
                    Faculty
                  </option>
                  <option value="admin" className="bg-gray-800">
                    Admin
                  </option>
                </select>
              </div>
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Login
              </button>
            </div>
            <p className="text-gray-400 text-center mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => setAuthMode("signup")}
                className="text-cyan-400 hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Signup Form */}
          <div
            className={`bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 transition-all duration-300 ${
              authMode === "signup"
                ? "border-purple-400 shadow-lg shadow-purple-500/30"
                : "border-white/10"
            }`}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Role
                </label>
                <select className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-all">
                  <option value="student" className="bg-gray-800">
                    Student
                  </option>
                  <option value="faculty" className="bg-gray-800">
                    Faculty
                  </option>
                  <option value="admin" className="bg-gray-800">
                    Admin
                  </option>
                </select>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                Sign Up
              </button>
            </div>
            <p className="text-gray-400 text-center mt-6">
              Already have an account?{" "}
              <button
                onClick={() => setAuthMode("login")}
                className="text-purple-400 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
