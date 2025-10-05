"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, User, BookOpen } from "lucide-react";

const SchedulePageStudent = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const weekSchedule = {
    Monday: [
      {
        subject: "Data Structures",
        time: "09:00 AM - 10:30 AM",
        room: "Lab 101",
        faculty: "Dr. Smith",
        type: "Lecture",
      },
      {
        subject: "Web Development",
        time: "11:00 AM - 12:30 PM",
        room: "Room 302",
        faculty: "Prof. Johnson",
        type: "Lab",
      },
      {
        subject: "Database Systems",
        time: "02:00 PM - 03:30 PM",
        room: "Lab 205",
        faculty: "Dr. Williams",
        type: "Lecture",
      },
    ],
    Tuesday: [
      {
        subject: "Operating Systems",
        time: "09:00 AM - 10:30 AM",
        room: "Room 201",
        faculty: "Prof. Davis",
        type: "Lecture",
      },
      {
        subject: "Computer Networks",
        time: "11:00 AM - 12:30 PM",
        room: "Lab 103",
        faculty: "Dr. Brown",
        type: "Lab",
      },
      {
        subject: "Software Engineering",
        time: "02:00 PM - 03:30 PM",
        room: "Room 305",
        faculty: "Prof. Wilson",
        type: "Lecture",
      },
    ],
    Wednesday: [
      {
        subject: "Data Structures",
        time: "09:00 AM - 10:30 AM",
        room: "Lab 101",
        faculty: "Dr. Smith",
        type: "Lab",
      },
      {
        subject: "Web Development",
        time: "11:00 AM - 12:30 PM",
        room: "Room 302",
        faculty: "Prof. Johnson",
        type: "Lecture",
      },
    ],
    Thursday: [
      {
        subject: "Database Systems",
        time: "09:00 AM - 10:30 AM",
        room: "Lab 205",
        faculty: "Dr. Williams",
        type: "Lab",
      },
      {
        subject: "Operating Systems",
        time: "11:00 AM - 12:30 PM",
        room: "Room 201",
        faculty: "Prof. Davis",
        type: "Lecture",
      },
      {
        subject: "Computer Networks",
        time: "02:00 PM - 03:30 PM",
        room: "Lab 103",
        faculty: "Dr. Brown",
        type: "Lecture",
      },
    ],
    Friday: [
      {
        subject: "Software Engineering",
        time: "09:00 AM - 10:30 AM",
        room: "Room 305",
        faculty: "Prof. Wilson",
        type: "Lecture",
      },
      {
        subject: "Data Structures",
        time: "11:00 AM - 12:30 PM",
        room: "Lab 101",
        faculty: "Dr. Smith",
        type: "Tutorial",
      },
    ],
    Saturday: [
      {
        subject: "Project Work",
        time: "10:00 AM - 12:00 PM",
        room: "Lab 301",
        faculty: "All Faculty",
        type: "Workshop",
      },
    ],
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Lecture":
        return "from-blue-500 to-cyan-600";
      case "Lab":
        return "from-purple-500 to-pink-600";
      case "Tutorial":
        return "from-green-500 to-emerald-600";
      case "Workshop":
        return "from-orange-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Schedule
          </h2>
          <p className="text-gray-400 text-lg">
            View your weekly class schedule
          </p>
        </div>

        {/* Day Selector */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedDay === day
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-2">Total Classes</p>
            <p className="text-3xl font-bold text-white">18</p>
            <p className="text-gray-500 text-xs mt-1">This week</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-2">Subjects</p>
            <p className="text-3xl font-bold text-white">6</p>
            <p className="text-gray-500 text-xs mt-1">Active courses</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-2">Study Hours</p>
            <p className="text-3xl font-bold text-white">27</p>
            <p className="text-gray-500 text-xs mt-1">Per week</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-2">Locations</p>
            <p className="text-3xl font-bold text-white">8</p>
            <p className="text-gray-500 text-xs mt-1">Different rooms</p>
          </div>
        </div>

        {/* Schedule for Selected Day */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">
              {selectedDay}'s Classes
            </h3>
            <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
              <span className="text-cyan-400 text-sm font-medium">
                {weekSchedule[selectedDay].length} Classes
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {weekSchedule[selectedDay].map((cls, idx) => (
              <div
                key={idx}
                className="group bg-white/5 rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-102"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${getTypeColor(
                        cls.type
                      )} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl mb-1">
                        {cls.subject}
                      </h4>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Clock className="w-4 h-4" />
                          {cls.time}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <MapPin className="w-4 h-4" />
                          {cls.room}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <User className="w-4 h-4" />
                          {cls.faculty}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 bg-gradient-to-r ${getTypeColor(
                      cls.type
                    )} text-white rounded-full text-sm font-medium shadow-lg`}
                  >
                    {cls.type}
                  </span>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="flex-1 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all font-medium">
                    View Details
                  </button>
                  <button className="flex-1 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all font-medium">
                    Add to Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePageStudent;
