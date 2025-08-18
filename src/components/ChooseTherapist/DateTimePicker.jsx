import React, { useState, useEffect } from "react";

// Helper to generate days for the current month
const generateMonthDays = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push({
      day: date.toLocaleString("en-US", { weekday: "short" }),
      date: date.getDate(),
      fullDate: new Date(date),
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const DateTimePicker = ({
  availableTimes = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
  onChange,
}) => {
  const today = new Date();

  // State
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [days, setDays] = useState([]);

  // Generate current month days
  useEffect(() => {
    setDays(generateMonthDays(today.getFullYear(), today.getMonth()));
  }, []);

  // Call parent when value changes
  useEffect(() => {
    if (selectedDate && selectedTime) {
      onChange?.({
        date: selectedDate,
        time: selectedTime,
      });
    }
  }, [selectedDate, selectedTime, onChange]);

  return (
    <div className="p-6 bg-[#0f172a] text-white rounded-2xl">
      <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 mb-6">Select Date & Time</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date Picker */}
        <div className="bg-[#1a2234] p-6 rounded-2xl">
          <h3 className="text-sm md:text-lg font-medium mb-4 text-yellow-400">Choose Date</h3>

          <div className="grid grid-cols-7 gap-2">
            {days.map((d, idx) => {
              const isSelected =
                selectedDate.getDate() === d.date &&
                selectedDate.getMonth() === d.fullDate.getMonth();

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(d.fullDate)}
                  className={`flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-lg transition
                    ${isSelected
                      ? "bg-yellow-400 text-black font-bold"
                      : "text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  <span className="text-xs sm:text-sm">{d.day}</span>
                  <span className="text-sm sm:text-base">{d.date}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Picker */}
        <div className="bg-[#1a2234] p-6 rounded-2xl">
          <h3 className="text-sm md:text-lg font-medium mb-4 text-yellow-400">Available Times</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 rounded-lg font-medium transition
                  ${selectedTime === time
                    ? "bg-yellow-400 text-black font-bold"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  }`}
              >
                <span className="text-xs sm:text-sm">{time}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
