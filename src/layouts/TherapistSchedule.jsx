import React, { useState } from "react";
import { FaCalendarAlt, FaSave, FaTrash, FaSun } from "react-icons/fa";
import Calendar from "../components/therapistSchedule/Calendar.jsx";
import OverviewPanel from "../components/therapistSchedule/OverviewPanel.jsx";
import ScheduleModal from "../components/therapistSchedule/ScheduleModal.jsx";

export default function TherapistSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availabilityData, setAvailabilityData] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derived stats
  const availableDays = Object.keys(availabilityData).length;
  const totalHours = Object.values(availabilityData).reduce((total, slots) => {
    return total + slots.reduce((sum, slot) => {
      const [sh, sm] = slot.start.split(":").map(Number);
      const [eh, em] = slot.end.split(":").map(Number);
      return sum + ((eh * 60 + em) - (sh * 60 + sm)) / 60;
    }, 0);
  }, 0);

  return (
    <div className="bg-black text-white font-sans min-h-screen p-4 lg:p-8">
      {/* Header */}
      <header className="glass-morphism rounded-2xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
              <FaCalendarAlt className="text-black text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-playfair font-bold text-gold">
                Advanced Availability Scheduler
              </h1>
              <p className="text-gray-400">Manage your therapy sessions and availability</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="glass-morphism px-4 py-3 rounded-xl border border-gold text-gold hover:bg-gold hover:bg-opacity-20 transition-all">
              <FaSun />
            </button>
            <button
              onClick={() => alert("Availability plan saved successfully!")}
              className="gold-gradient px-6 py-3 rounded-xl text-black font-semibold hover:opacity-90 transition-opacity"
            >
              <FaSave className="inline mr-2" />
              Save Plan
            </button>
            <button
              onClick={() => {
                if (window.confirm("Clear all availability data?")) setAvailabilityData({});
              }}
              className="glass-morphism px-6 py-3 rounded-xl border border-red-400 text-red-400 hover:bg-red-500 hover:bg-opacity-20 transition-all"
            >
              <FaTrash className="inline mr-2" />
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <Calendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            availabilityData={availabilityData}
            openModal={(day) => {
              setSelectedDay(day);
              setIsModalOpen(true);
            }}
          />
        </div>
        <div className="xl:col-span-1">
          <OverviewPanel
            availabilityData={availabilityData}
            availableDays={availableDays}
            totalHours={totalHours}
            openModal={(day) => {
              setSelectedDay(day);
              setIsModalOpen(true);
            }}
            setAvailabilityData={setAvailabilityData}
          />
        </div>
      </div>

      <ScheduleModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedDay={selectedDay}
        availabilityData={availabilityData}
        setAvailabilityData={setAvailabilityData}
      />
    </div>
  );
}
