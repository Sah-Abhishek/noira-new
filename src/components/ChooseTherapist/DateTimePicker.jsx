import React, { useState, useEffect } from "react";
import axios from "axios";
import useBookingStore from "../../store/bookingStore.jsx"; // 👈 adjust path

// Format date into DD-MM-YYYY
const formatDate = (date) => {
  if (!(date instanceof Date)) return null;
  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;
};

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
}) => {
  const today = new Date();
  const { cart, date, time, setDate, setTime } = useBookingStore();

  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setDays(generateMonthDays(today.getFullYear(), today.getMonth()));
  }, []);

  const handleConfirm = async () => {
    if (!cart || !date || !time) {
      setMessage("⚠️ Please select cart, date and time first.");
      return;
    }

    const bookingData = {
      service: cart,
      date: formatDate(date), // DD-MM-YYYY
      time, // HH:mm
    };

    try {
      setLoading(true);
      setMessage(null);

      // 👇 Axios instead of fetch
      const res = await axios.post("/api/bookings", bookingData);

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed to save booking");
      }

      setMessage("✅ Booking confirmed!");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#0f172a] text-white rounded-2xl">
      <h2 className="text-xl md:text-2xl font-semibold text-primary mb-6">
        Select Date & Time
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date Picker */}
        <div className="bg-[#1a2234] p-6 rounded-2xl">
          <h3 className="text-sm md:text-lg font-medium mb-4 text-primary">
            Choose Date
          </h3>

          <div className="grid grid-cols-7 gap-2">
            {days.map((d, idx) => {
              const isSelected =
                date &&
                date instanceof Date &&
                date.getDate() === d.date &&
                date.getMonth() === d.fullDate.getMonth();

              return (
                <button
                  key={idx}
                  onClick={() => setDate(d.fullDate)}
                  className={`flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-lg transition
                    ${isSelected
                      ? "bg-primary text-black font-bold"
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
          <h3 className="text-sm md:text-lg font-medium mb-4 text-primary">
            Available Times
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availableTimes.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`py-3 rounded-lg font-medium transition
                  ${time === t
                    ? "bg-primary text-black font-bold"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  }`}
              >
                <span className="text-xs sm:text-sm">{t}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-amber-500 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>

      {/* Response message */}
      {message && (
        <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
      )}
    </div>
  );
};

export default DateTimePicker;
