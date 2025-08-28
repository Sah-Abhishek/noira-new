import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
  availableTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"],
}) => {
  const today = new Date();
  const { hasSearched, setHasSearched, cart, setTherapists, date, time, setDate, setTime, findingTherapist, setFindingTherapist } = useBookingStore();

  const [days, setDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  console.log("This is the hasSearched: ", hasSearched);


  useEffect(() => {
    const monthDays = generateMonthDays(currentYear, currentMonth);
    setDays(monthDays);
  }, [currentMonth, currentYear]);

  const handleConfirm = async () => {
    if (!cart || !date || !time) {
      setMessage("⚠️ Please select cart, date and time first.");
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    const bookingData = {
      service: cart,
      date: formatDate(date), // DD-MM-YYYY
      time, // HH:mm
    };

    try {
      setFindingTherapist(true);
      setLoading(true);
      setMessage(null);

      const res = await axios.post(
        `${apiUrl}/therapist/filter`,
        bookingData
      );

      setTherapists(res.data.therapists);
      setHasSearched(true);

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed to save booking");
      }

      setMessage("✅ Booking confirmed!");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || err.message));
    } finally {
      setFindingTherapist(false);
      setLoading(false);
    }
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="p-6 bg-[#0d0d0d]/90 border border-white/20 text-white rounded-2xl">
      <h2 className="text-xl md:text-2xl font-semibold text-primary mb-6">
        Select Date & Time
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date Picker */}
        <div className="bg-[#0d0d0d] p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goToPreviousMonth}
              className="px-2 py-1 border  border-transparent  hover:border-white/20  rounded "
            >
              <ArrowLeft className="text-primary" />
            </button>
            <h3 className="text-sm md:text-lg font-medium text-primary">
              {new Date(currentYear, currentMonth).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <button
              onClick={goToNextMonth}
              className="px-2 border  border-transparent hover:border-white/20 py-1 rounded "
            >
              <ArrowRight className="text-primary" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((d, idx) => {
              const isSelected =
                date &&
                date instanceof Date &&
                date.getDate() === d.date &&
                date.getMonth() === d.fullDate.getMonth() &&
                date.getFullYear() === d.fullDate.getFullYear();

              const isPastDay = d.fullDate < new Date(new Date().setHours(0, 0, 0, 0));

              return (
                <button
                  key={idx}
                  onClick={() => !isPastDay && setDate(d.fullDate)}
                  disabled={isPastDay}
                  className={`flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-lg transition
          ${isPastDay
                      ? " text-gray-500 cursor-not-allowed"
                      : isSelected
                        ? "bg-primary text-black font-bold"
                        : "text-gray-300 border border-transparent hover:border-white/20 transition-all duration-300 ease-in-out"
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
        {/* Time Picker */}
        <div className="bg-[#0d0d0d] p-6 rounded-2xl">
          <h3 className="text-sm md:text-lg font-medium mb-4 text-primary">
            Available Times
          </h3>

          {/* Morning Section */}
          <div className="mb-6">
            <h4 className="flex items-center text-primary text-sm font-semibold mb-2">
              ☀️ Morning (9:00 AM - 12:00 PM)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  disabled={!availableTimes.includes(t)}
                  className={`py-3 rounded-full font-medium transition-all duration-300 ease-in-out
            ${time === t
                      ? "bg-primary text-black font-bold"
                      : availableTimes.includes(t)
                        ? "bg-[#0d0d0d] border border-white/20 hover:border-white text-gray-200"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Afternoon Section */}
          <div className="mb-6">
            <h4 className="flex items-center text-primary text-sm font-semibold mb-2">
              🌞 Afternoon (1:00 PM - 5:00 PM)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  disabled={!availableTimes.includes(t)}
                  className={`py-3 rounded-full font-medium transition-all duration-300 ease-in-out
            ${time === t
                      ? "bg-primary text-black font-bold"
                      : availableTimes.includes(t)
                        ? "bg-[#0d0d0d] border border-white/20 hover:border-white text-gray-200"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Evening Section */}
          <div>
            <h4 className="flex items-center text-primary text-sm font-semibold mb-2">
              🌙 Evening (6:00 PM - 9:00 PM)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  disabled={!availableTimes.includes(t)}
                  className={`py-3 rounded-full font-medium transition-all duration-300 ease-in-out
            ${time === t
                      ? "bg-priamry to-amber-500 text-black font-bold"
                      : availableTimes.includes(t)
                        ? "bg-[#0d0d0d] border border-white/20 hover:border-white text-gray-200"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleConfirm}
          disabled={loading || !date || !time}
          className={`px-6 py-3 rounded-lg font-semibold transition ${loading || !date || !time
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-primary text-black hover:bg-amber-500"
            }`}
        >
          {loading ? "Saving..." : "Find Therapist"}
        </button>
      </div>

      {/* Response message */}
      {/* {message && ( */}
      {/*   <p className="mt-4 text-center text-red-500 text-sm">{message}</p> */}
      {/* )} */}
    </div>
  );
};

export default DateTimePicker;
