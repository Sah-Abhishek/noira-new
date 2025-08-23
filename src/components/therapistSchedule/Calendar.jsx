
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CalendarDay from "./CalendarDay";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Calendar({ currentDate, setCurrentDate, availabilityData, openModal }) {
  const formatDateKey = (y, m, d) => `${y}-${m + 1}-${d}`;

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    let days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(year, month, day);
      const slots = availabilityData[dateKey] || [];
      days.push({
        day,
        dateKey,
        isToday: today.getDate() === day && today.getMonth() === month && today.getFullYear() === year,
        slots,
      });
    }
    return days;
  };

  const days = generateCalendarDays();

  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-2xl p-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
          className="p-3 rounded-xl hover:bg-gray-700 transition-colors"
        >
          <FaChevronLeft className="text-gold text-xl" />
        </button>
        <h2 className="text-xl font-semibold font-playfair">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
          className="p-3 rounded-xl hover:bg-gray-700 transition-colors"
        >
          <FaChevronRight className="text-gold text-xl" />
        </button>
      </div>

      <div className="glass-morphism rounded-2xl p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center text-sm font-semibold text-gray-400 py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) =>
            !day ? (
              <div key={idx} className="calendar-cell p-2" />
            ) : (
              <CalendarDay key={day.dateKey} day={day} openModal={openModal} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
