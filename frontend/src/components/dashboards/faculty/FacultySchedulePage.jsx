"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

const FacultySchedulePage = () => {
  const [selectedView, setSelectedView] = useState("week");
  const [currentWeek, setCurrentWeek] = useState(0);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const schedule = {
    Monday: [
      {
        time: "09:00 AM",
        course: "Data Structures",
        code: "CS301",
        room: "Lab 101",
        students: 45,
        duration: 90,
        color: "from-cyan-500 to-blue-600",
      },
      {
        time: "02:00 PM",
        course: "Database Systems",
        code: "CS401",
        room: "Lab 203",
        students: 48,
        duration: 60,
        color: "from-green-500 to-emerald-600",
      },
    ],
    Tuesday: [
      {
        time: "11:00 AM",
        course: "Algorithms",
        code: "CS302",
        room: "Room 204",
        students: 50,
        duration: 90,
        color: "from-purple-500 to-indigo-600",
      },
      {
        time: "03:00 PM",
        course: "Web Development",
        code: "CS305",
        room: "Lab 105",
        students: 42,
        duration: 90,
        color: "from-orange-500 to-red-600",
      },
    ],
    Wednesday: [
      {
        time: "09:00 AM",
        course: "Data Structures",
        code: "CS301",
        room: "Lab 101",
        students: 45,
        duration: 90,
        color: "from-cyan-500 to-blue-600",
      },
      {
        time: "11:00 AM",
        course: "Software Engineering",
        code: "CS402",
        room: "Room 301",
        students: 55,
        duration: 60,
        color: "from-pink-500 to-rose-600",
      },
      {
        time: "02:00 PM",
        course: "Database Systems",
        code: "CS401",
        room: "Lab 203",
        students: 48,
        duration: 60,
        color: "from-green-500 to-emerald-600",
      },
    ],
    Thursday: [
      {
        time: "11:00 AM",
        course: "Algorithms",
        code: "CS302",
        room: "Room 204",
        students: 50,
        duration: 90,
        color: "from-purple-500 to-indigo-600",
      },
      {
        time: "03:00 PM",
        course: "Web Development",
        code: "CS305",
        room: "Lab 105",
        students: 42,
        duration: 90,
        color: "from-orange-500 to-red-600",
      },
    ],
    Friday: [
      {
        time: "09:00 AM",
        course: "Data Structures",
        code: "CS301",
        room: "Lab 101",
        students: 45,
        duration: 90,
        color: "from-cyan-500 to-blue-600",
      },
      {
        time: "11:00 AM",
        course: "Software Engineering",
        code: "CS402",
        room: "Room 301",
        students: 55,
        duration: 60,
        color: "from-pink-500 to-rose-600",
      },
    ],
    Saturday: [],
  };

  const totalClasses = Object.values(schedule).flat().length;
  const uniqueCourses = [
    ...new Set(
      Object.values(schedule)
        .flat()
        .map((c) => c.code)
    ),
  ].length;
  const totalHours =
    Object.values(schedule)
      .flat()
      .reduce((sum, c) => sum + c.duration, 0) / 60;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Schedule
          </h2>
          <p className="text-gray-400 text-lg">
            View and manage your weekly teaching schedule
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-cyan-400" />
              <span className="text-3xl font-bold text-white">
                {totalClasses}
              </span>
            </div>
            <p className="text-gray-300 font-medium">Classes This Week</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-white">
                {uniqueCourses}
              </span>
            </div>
            <p className="text-gray-300 font-medium">Different Courses</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-white">
                {totalHours.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-300 font-medium">Teaching Hours</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-orange-400" />
              <span className="text-3xl font-bold text-white">240</span>
            </div>
            <p className="text-gray-300 font-medium">Total Students</p>
          </div>
        </div>

        {/* View Controls */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentWeek(currentWeek - 1)}
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-center">
                <h3 className="text-white font-bold text-lg">
                  Week {currentWeek === 0 ? "(Current)" : currentWeek}
                </h3>
                <p className="text-gray-400 text-sm">Oct 7 - Oct 13, 2024</p>
              </div>
              <button
                onClick={() => setCurrentWeek(currentWeek + 1)}
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                <button
                  onClick={() => setSelectedView("week")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedView === "week"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Week View
                </button>
                <button
                  onClick={() => setSelectedView("list")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedView === "list"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  List View
                </button>
              </div>
              <button className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Grid - Week View */}
        {selectedView === "week" && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[1200px]">
                {/* Header Row */}
                <div className="grid grid-cols-7 bg-white/5 border-b border-white/10">
                  <div className="p-4 border-r border-white/10">
                    <div className="text-gray-400 text-sm font-medium">
                      Time
                    </div>
                  </div>
                  {daysOfWeek.map((day, idx) => (
                    <div
                      key={idx}
                      className="p-4 border-r border-white/10 last:border-r-0"
                    >
                      <div className="text-white font-bold">{day}</div>
                      <div className="text-gray-400 text-xs mt-1">
                        Oct {7 + idx}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                <div className="divide-y divide-white/10">
                  {timeSlots.map((time, timeIdx) => (
                    <div
                      key={timeIdx}
                      className="grid grid-cols-7 min-h-[80px]"
                    >
                      <div className="p-4 border-r border-white/10 flex items-start">
                        <span className="text-gray-400 text-sm font-medium">
                          {time}
                        </span>
                      </div>
                      {daysOfWeek.map((day, dayIdx) => {
                        const daySchedule = schedule[day] || [];
                        const classAtTime = daySchedule.find(
                          (cls) => cls.time === time
                        );

                        return (
                          <div
                            key={dayIdx}
                            className="p-2 border-r border-white/10 last:border-r-0"
                          >
                            {classAtTime && (
                              <div
                                className={`group h-full bg-gradient-to-r ${classAtTime.color} bg-opacity-10 rounded-lg p-3 border border-white/20 hover:scale-[1.02] transition-all cursor-pointer`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h4 className="text-white font-bold text-sm mb-1">
                                      {classAtTime.course}
                                    </h4>
                                    <p className="text-gray-300 text-xs">
                                      {classAtTime.code}
                                    </p>
                                  </div>
                                  <div
                                    className={`w-6 h-6 bg-gradient-to-r ${classAtTime.color} rounded-md flex items-center justify-center`}
                                  >
                                    <BookOpen className="w-3 h-3 text-white" />
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-gray-300 text-xs">
                                    <Clock className="w-3 h-3" />
                                    {classAtTime.duration} min
                                  </div>
                                  <div className="flex items-center gap-1 text-gray-300 text-xs">
                                    <MapPin className="w-3 h-3" />
                                    {classAtTime.room}
                                  </div>
                                  <div className="flex items-center gap-1 text-gray-300 text-xs">
                                    <Users className="w-3 h-3" />
                                    {classAtTime.students} students
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule List - List View */}
        {selectedView === "list" && (
          <div className="space-y-6">
            {daysOfWeek.map((day) => {
              const daySchedule = schedule[day] || [];
              if (daySchedule.length === 0) return null;

              return (
                <div
                  key={day}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                >
                  <div className="p-6 border-b border-white/10 bg-white/5">
                    <h3 className="text-xl font-bold text-white">{day}</h3>
                    <p className="text-gray-400 text-sm">
                      {daySchedule.length}{" "}
                      {daySchedule.length === 1 ? "class" : "classes"}
                    </p>
                  </div>
                  <div className="divide-y divide-white/10">
                    {daySchedule.map((cls, idx) => (
                      <div
                        key={idx}
                        className="p-6 hover:bg-white/5 transition-all group"
                      >
                        <div className="flex items-center gap-6">
                          <div
                            className={`w-16 h-16 bg-gradient-to-r ${cls.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                          >
                            <BookOpen className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-white font-bold text-lg mb-1">
                                  {cls.course}
                                </h4>
                                <p className="text-gray-400 text-sm">
                                  {cls.code}
                                </p>
                              </div>
                              <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                                <span className="text-cyan-400 text-sm font-medium">
                                  {cls.time}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-300">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-cyan-400" />
                                {cls.duration} minutes
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-purple-400" />
                                {cls.room}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-green-400" />
                                {cls.students} students
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm font-medium">
                              Mark Attendance
                            </button>
                            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultySchedulePage;
