import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaSave, FaTrash } from "react-icons/fa";
import Calendar from "../components/therapistSchedule/Calendar.jsx";
import OverviewPanel from "../components/therapistSchedule/OverviewPanel.jsx";
import ScheduleModal from "../components/therapistSchedule/ScheduleModal.jsx";

export default function TherapistSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availabilityData, setAvailabilityData] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const therapistId = localStorage.getItem("therapistId")

  // Fetch availability data from API
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/therapist/availability/${therapistId}`
        );

        // Transform API response into { "YYYY-MM-DD": [ { start, end } ] }
        const formattedData = {};
        res.data.availability.forEach((entry) => {
          const dateKey = entry.date.split("T")[0]; // "2025-08-20"
          formattedData[dateKey] = entry.blocks
            .filter((block) => block.isAvailable) // only available slots
            .map((block) => ({
              start: block.startTime,
              end: block.endTime,
            }));
        });

        setAvailabilityData(formattedData);
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  // Derived stats
  // Derived stats
  const availableDays = Object.keys(availabilityData).length;
  const totalHours = Object.values(availabilityData).reduce((total, slots) => {
    return (
      total +
      slots.reduce((sum, slot) => {
        if (!slot.start || !slot.end) return sum; // <-- Prevent crash
        const [sh, sm] = slot.start.split(":").map(Number);
        const [eh, em] = slot.end.split(":").map(Number);
        return sum + (eh * 60 + em - (sh * 60 + sm)) / 60;
      }, 0)
    );
  }, 0);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading availability...
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans min-h-screen p-4 lg:p-8">
      {/* Header */}
      <header className="glass-morphism border border-white/10 bg-[#0d0d0d] rounded-2xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <FaCalendarAlt className="text-black text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-playfair font-bold text-primary">
                Advanced Availability Scheduler
              </h1>
              <p className="text-gray-400">
                Manage your therapy sessions and availability
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => alert("Availability plan saved successfully!")}
              className="bg-primary px-6 py-3 rounded-xl text-black font-semibold hover:opacity-90 transition-opacity"
            >
              <FaSave className="inline mr-2" />
              Save Plan
            </button>
            <button
              onClick={() => {
                if (window.confirm("Clear all availability data?"))
                  setAvailabilityData({});
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
            availabilityData={availabilityData} // ✅ passed here
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
