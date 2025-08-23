// src/components/therapistSchedule/Calendar.jsx
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CalendarDay from "./CalendarDay";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Calendar({
  currentDate,
  setCurrentDate,
  availabilityData,
  openModal,
}) {
  // Get year and month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of the month
  const firstDay = new Date(year, month, 1).getDay();
  // Number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Today's date key
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Generate calendar days
  const daysArray = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null); // Empty slots before first day
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      i
    ).padStart(2, "0")}`;

    const dayDate = new Date(year, month, i);
    const isPast = dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());

    daysArray.push({
      day: i,
      dateKey,
      slots: availabilityData[dateKey] || [],
      isToday: dateKey === todayKey,
      isPast,
    });
  }

  return (
    <div className="glass-morphism border border-white/10 bg-[#0d0d0d] rounded-2xl p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          className="p-2 rounded-full hover:bg-white/10"
        >
          <FaChevronLeft />
        </button>
        <h2 className="text-xl font-semibold">
          {monthNames[month]} {year}
        </h2>
        <button
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          className="p-2 rounded-full hover:bg-white/10"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 text-center text-gray-400 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2">
        {daysArray.map((dayData, idx) =>
          dayData ? (
            <CalendarDay
              key={dayData.dateKey}
              day={dayData.day}
              slots={dayData.slots}
              dateKey={dayData.dateKey}
              openModal={openModal}
              isToday={dayData.isToday}
              isPast={dayData.isPast}   // ✅ pass isPast
            />
          ) : (
            <div key={`empty-${idx}`} />
          )
        )}
      </div>
    </div>
  );
}
