"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Edit,
  Save,
  X,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";

const FacultyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Dr. John Anderson",
    email: "john.anderson@university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    designation: "Associate Professor",
    employeeId: "FAC2019001",
    officeRoom: "Faculty Block - Room 305",
    joinDate: "January 15, 2019",
    specialization: "Data Structures, Algorithms, Machine Learning",
    qualification: "Ph.D. in Computer Science",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    classReminders: true,
    attendanceAlerts: true,
    systemUpdates: false,
  });

  const achievements = [
    {
      title: "Best Faculty Award",
      year: "2023",
      color: "from-yellow-500 to-orange-600",
    },
    {
      title: "Research Excellence",
      year: "2022",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Teaching Excellence",
      year: "2021",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const stats = [
    { label: "Years of Experience", value: "5+", icon: Calendar },
    { label: "Courses Taught", value: "12", icon: BookOpen },
    { label: "Students Mentored", value: "500+", icon: User },
    { label: "Research Papers", value: "15", icon: Award },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Add API call to save profile data
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
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
            Manage your profile and settings
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                JA
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {profileData.name}
                </h3>
                <p className="text-cyan-400 text-lg font-medium mb-1">
                  {profileData.designation}
                </p>
                <p className="text-gray-400 text-sm">
                  {profileData.department} • {profileData.employeeId}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden mb-8">
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
                activeTab === "achievements"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
                activeTab === "security"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
                activeTab === "notifications"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Notifications
            </button>
          </div>

          <div className="p-8">
            {/* Profile Information Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
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
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
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
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Office Room
                    </label>
                    <input
                      type="text"
                      value={profileData.officeRoom}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          officeRoom: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Department
                    </label>
                    <input
                      type="text"
                      value={profileData.department}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          department: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Qualification
                    </label>
                    <input
                      type="text"
                      value={profileData.qualification}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          qualification: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Specialization
                  </label>
                  <textarea
                    value={profileData.specialization}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        specialization: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all disabled:opacity-50 resize-none"
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === "achievements" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all hover:scale-105"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}
                      ></div>
                      <div className="relative z-10">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-white font-bold text-lg text-center mb-2">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-400 text-sm text-center">
                          {achievement.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
                  <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    Recent Publications
                  </h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <h5 className="text-white font-semibold mb-1">
                        Advanced Data Structures in Modern Computing
                      </h5>
                      <p className="text-gray-400 text-sm">
                        Published in IEEE Transactions • 2023
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <h5 className="text-white font-semibold mb-1">
                        Machine Learning Applications in Education
                      </h5>
                      <p className="text-gray-400 text-sm">
                        Published in ACM Computing Surveys • 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-orange-400" />
                    <h4 className="text-white font-bold">Change Password</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Keep your account secure by using a strong password
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                      />
                      <button
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showOldPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>

                  <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Bell className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-white font-bold">
                      Notification Preferences
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Manage how you receive notifications
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <div>
                        <h5 className="text-white font-semibold capitalize mb-1">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h5>
                        <p className="text-gray-400 text-sm">
                          Receive {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            [key]: !value,
                          })
                        }
                        className={`relative w-14 h-7 rounded-full transition-all ${
                          value
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                            : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-all ${
                            value ? "right-1" : "left-1"
                          }`}
                        ></div>
                      </button>
                    </div>
                  ))}
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium">
                  Save Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfilePage;
