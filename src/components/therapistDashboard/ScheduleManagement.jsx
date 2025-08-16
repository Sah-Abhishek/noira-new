
import React from "react";
import { Ban, Calendar, Bell, Plus } from "lucide-react"; // icons

const ScheduleManagement = () => {
  const availability = [
    { day: "Monday", time: "9:00 AM - 5:00 PM", available: true },
    { day: "Tuesday", time: "9:00 AM - 5:00 PM", available: true },
    { day: "Wednesday", time: "Unavailable", available: false },
  ];

  return (
    <div className="bg-[#111] rounded-2xl border border-white/10 p-6 shadow-md w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">Schedule Management</h2>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition">
          <Plus size={18} /> Add Availability
        </button>
      </div>

      {/* Content: Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div>
          <h3 className="text-gray-400 text-sm mb-3">Quick Actions</h3>
          <div className="space-y-3">
            <button className="flex justify-between items-center w-full bg-[#1e293b] hover:bg-[#2d3b52] px-4 py-3 rounded-lg text-white transition">
              <span>Mark Today Unavailable</span>
              <Ban size={18} className="text-red-400" />
            </button>
            <button className="flex justify-between items-center w-full bg-[#1e293b] hover:bg-[#2d3b52] px-4 py-3 rounded-lg text-white transition">
              <span>Set Weekly Schedule</span>
              <Calendar size={18} className="text-blue-400" />
            </button>
            <button className="flex justify-between items-center w-full bg-[#1e293b] hover:bg-[#2d3b52] px-4 py-3 rounded-lg text-white transition">
              <span>Holiday Schedule</span>
              <Bell size={18} className="text-green-400" />
            </button>
          </div>
        </div>

        {/* This Week's Availability */}
        <div>
          <h3 className="text-gray-400 text-sm mb-3">This Week's Availability</h3>
          <div className="space-y-3">
            {availability.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center px-4 py-3 rounded-lg ${item.available
                  ? "bg-green-950 text-green-400"
                  : "bg-red-950 text-red-400"
                  }`}
              >
                <span>{item.day}</span>
                <span className="text-sm text-white">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagement;
