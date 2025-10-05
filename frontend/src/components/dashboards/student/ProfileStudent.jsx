"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Camera,
  Edit,
  Save,
  X,
  Shield,
  Bell,
  Lock,
} from "lucide-react";

const ProfileStudent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, Campus City, ST 12345",
    rollNumber: "CS2021001",
    department: "Computer Science",
    semester: "6th Semester",
    batch: "2021-2025",
    dateOfBirth: "January 15, 2003",
    bloodGroup: "O+",
    emergencyContact: "+1 (555) 987-6543",
  });

  const achievements = [
    {
      title: "Perfect Attendance",
      description: "100% attendance in Spring 2024",
      icon: Award,
      color: "from-yellow-500 to-orange-600",
    },
    {
      title: "Dean's List",
      description: "Academic Excellence Award",
      icon: BookOpen,
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Top Performer",
      description: "Ranked in Top 10% of class",
      icon: Award,
      color: "from-green-500 to-emerald-600",
    },
  ];

  const academicInfo = [
    { label: "Current CGPA", value: "8.7", color: "text-cyan-400" },
    { label: "Credits Completed", value: "120/160", color: "text-green-400" },
    { label: "Current Semester", value: "6th", color: "text-purple-400" },
    { label: "Expected Graduation", value: "2025", color: "text-orange-400" },
  ];

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Bell },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form logic here
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Profile
          </h2>
          <p className="text-gray-400 text-lg">
            Manage your personal information and settings
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
              <div className="relative group">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl border-4 border-[#1E293B] flex items-center justify-center overflow-hidden">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">
                      {profileData.name}
                    </h3>
                    <p className="text-gray-400 text-lg mb-2">
                      {profileData.department} • {profileData.rollNumber}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {profileData.batch}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        {profileData.semester}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                      isEditing
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50"
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <X className="w-5 h-5" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit className="w-5 h-5" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {academicInfo.map((info, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <p className="text-gray-400 text-sm mb-2">{info.label}</p>
              <p className={`text-3xl font-bold ${info.color}`}>{info.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 mb-8 overflow-hidden">
          <div className="flex border-b border-white/10 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500/10 to-blue-600/10 text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "personal" && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Personal Information
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profileData.name}
                          disabled={!isEditing}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              name: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={profileData.email}
                          disabled={!isEditing}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={profileData.phone}
                          disabled={!isEditing}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profileData.dateOfBirth}
                          disabled={!isEditing}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              dateOfBirth: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          value={profileData.address}
                          disabled={!isEditing}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              address: e.target.value,
                            })
                          }
                          rows="3"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none transition-all disabled:opacity-50 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-4 pt-4">
                      <button
                        onClick={handleCancel}
                        className="px-6 py-3 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 hover:text-white transition-all"
                      >
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
                  )}
                </div>
              </div>
            )}

            {activeTab === "academic" && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Academic Information
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        value={profileData.rollNumber}
                        disabled
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        value={profileData.department}
                        disabled
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Current Semester
                      </label>
                      <input
                        type="text"
                        value={profileData.semester}
                        disabled
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Batch
                      </label>
                      <input
                        type="text"
                        value={profileData.batch}
                        disabled
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white opacity-50"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl border border-cyan-500/20">
                    <p className="text-gray-300 text-sm">
                      Academic information cannot be edited. Please contact the
                      administration office for any changes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Security Settings
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-medium">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Email Notifications",
                      description: "Receive updates via email",
                    },
                    {
                      title: "Attendance Reminders",
                      description: "Get notified before each class",
                    },
                    {
                      title: "Grade Updates",
                      description: "Notifications for new grades",
                    },
                    {
                      title: "Assignment Deadlines",
                      description: "Reminders for upcoming deadlines",
                    },
                  ].map((setting, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <div>
                        <p className="text-white font-semibold">
                          {setting.title}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {setting.description}
                        </p>
                      </div>
                      <label className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">
                Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <achievement.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20">
              <h3 className="text-lg font-bold text-white mb-4">
                Emergency Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">
                    {profileData.emergencyContact}
                  </span>
                </div>
                <button className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-medium">
                  Update Emergency Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStudent;
