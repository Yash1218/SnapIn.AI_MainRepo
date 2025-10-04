"use client";

import { ChevronRight } from "lucide-react";
import { FEATURES } from "@/utils/constants";

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-0 -left-48"></div>
          <div className="absolute w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-0 -right-48"></div>
          <div className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Automated Attendance
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Streamline your institution's attendance tracking with AI-powered
            automation and real-time analytics
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={onNavigate}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Get Started <ChevronRight className="inline ml-2" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 relative z-10">
        <h2 className="text-5xl font-bold text-center text-white mb-6">
          Everything You Need
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
          Powerful features designed to simplify attendance management
        </p>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-purple-400/50 transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-3xl p-12 text-center shadow-2xl shadow-purple-500/30 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Automate Your Attendance?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of institutions already using our platform
          </p>
          <button
            onClick={onNavigate}
            className="px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
