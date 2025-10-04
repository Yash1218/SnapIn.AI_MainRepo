"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Lock,
  Database,
  Palette,
  Mail,
  Shield,
  Save,
} from "lucide-react";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+91 98765 43210",
    institution: "XYZ University",
    emailNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    attendanceAlerts: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "system", label: "System", icon: Database },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
          <p className="text-gray-400">
            Manage your account and system preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 sticky top-8">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              {/* Profile Section */}
              {activeSection === "profile" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Profile Settings
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Update your personal information
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                      <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                        AU
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all mb-2">
                          Change Photo
                        </button>
                        <p className="text-gray-400 text-sm">
                          JPG, PNG or GIF. Max 2MB
                        </p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Institution Name
                        </label>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === "notifications" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Bell className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Notification Preferences
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Manage how you receive notifications
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-cyan-400" />
                        <div>
                          <p className="text-white font-medium">
                            Email Notifications
                          </p>
                          <p className="text-gray-400 text-sm">
                            Receive notifications via email
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-block w-14 h-8">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>

                    {/* SMS Notifications */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-white font-medium">
                            SMS Notifications
                          </p>
                          <p className="text-gray-400 text-sm">
                            Receive notifications via SMS
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-block w-14 h-8">
                        <input
                          type="checkbox"
                          name="smsNotifications"
                          checked={formData.smsNotifications}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>

                    {/* Weekly Reports */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-medium">
                            Weekly Reports
                          </p>
                          <p className="text-gray-400 text-sm">
                            Receive weekly attendance summaries
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-block w-14 h-8">
                        <input
                          type="checkbox"
                          name="weeklyReports"
                          checked={formData.weeklyReports}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>

                    {/* Attendance Alerts */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-orange-400" />
                        <div>
                          <p className="text-white font-medium">
                            Attendance Alerts
                          </p>
                          <p className="text-gray-400 text-sm">
                            Get alerts for low attendance
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-block w-14 h-8">
                        <input
                          type="checkbox"
                          name="attendanceAlerts"
                          checked={formData.attendanceAlerts}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeSection === "security" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Security Settings
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Manage your password and security preferences
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                        placeholder="Confirm new password"
                      />
                    </div>

                    {/* Two-Factor Auth */}
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 mt-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-white font-medium">
                              Two-Factor Authentication
                            </p>
                            <p className="text-gray-400 text-sm">
                              Add an extra layer of security
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all">
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Section */}
              {activeSection === "appearance" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Appearance Settings
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Customize the look and feel
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-4">
                        Theme
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <button className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border-2 border-cyan-500 text-white hover:scale-105 transition-transform">
                          <div className="w-full h-20 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] rounded-lg mb-3"></div>
                          <p className="font-medium">Dark (Current)</p>
                        </button>
                        <button className="p-4 bg-white rounded-xl border-2 border-white/20 text-gray-800 hover:scale-105 transition-transform opacity-50 cursor-not-allowed">
                          <div className="w-full h-20 bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg mb-3"></div>
                          <p className="font-medium">Light (Soon)</p>
                        </button>
                        <button className="p-4 bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl border-2 border-white/20 text-white hover:scale-105 transition-transform opacity-50 cursor-not-allowed">
                          <div className="w-full h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mb-3"></div>
                          <p className="font-medium">Auto (Soon)</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* System Section */}
              {activeSection === "system" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        System Settings
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Manage system configurations
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">
                            Database Backup
                          </p>
                          <p className="text-gray-400 text-sm">
                            Last backup: 2 hours ago
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all">
                          Backup Now
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Clear Cache</p>
                          <p className="text-gray-400 text-sm">
                            Remove temporary files
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-all">
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">
                            System Version
                          </p>
                          <p className="text-gray-400 text-sm">
                            v2.5.0 (Latest)
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">
                          Up to date
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
                <button className="px-6 py-3 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 transition-all">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
