import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import useBookingStore from "../../store/bookingStore";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  if (!(date instanceof Date)) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const generateMonthDays = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push({
      date: date.getDate(),
      fullDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const DateTimePicker = ({ availableTimes = [] }) => {
  const today = new Date();
  const {
    cart,
    date,
    time,
    setDate,
    setTime,
    setHasSearched,
    setTherapists,
    findingTherapist,
    setFindingTherapist,
  } = useBookingStore();

  const [days, setDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("day"); // NEW
  const therapistSelectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setDate(null);
    setTime(null);
  }, []);

  useEffect(() => {
    setDays(generateMonthDays(currentYear, currentMonth));
  }, [currentMonth, currentYear]);

  const handleConfirm = async () => {
    if (!cart || !date || !time) return;
    const apiUrl = import.meta.env.VITE_API_URL;
    const payload = { service: cart, date, time };
    console.log("This is the cart: ", cart);

    try {
      setFindingTherapist(true);
      setLoading(true);
      const res = await axios.post(`${apiUrl}/therapist/filter`, payload);
      setTherapists(res.data.therapists);
      setHasSearched(true);
      if (res.data.therapists.length > 0) {
        setTimeout(() => {
          therapistSelectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFindingTherapist(false);
      setLoading(false);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Sections
  const daySections = {
    morning: [
      "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    ],
    afternoon: [
      "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
      "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    ],
    evening: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"],
  };

  const nightSections = {
    lateNight: ["21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
    earlyMorning: [
      "00:00", "00:30", "01:00", "01:30", "02:00", "02:30",
      "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
    ],
  };

  // Render helper
  const renderSections = (sections, isPremium = false) => (
    <>
      {Object.entries(sections).map(([label, times]) => (
        <div key={label} className="mb-6">
          <h3 className="text-sm uppercase text-primary mb-2">
            {label === "morning" && "☀️ Morning"}
            {label === "afternoon" && "🌞 Afternoon"}
            {label === "evening" && "🌙 Evening"}
            {label === "lateNight" && "🌌 Late Night (Premium)"}
            {label === "earlyMorning" && "🌅 Early Morning (Premium)"}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`py-2 text-sm rounded-full transition flex items-center justify-center
                  ${time === t
                    ? "bg-primary text-black font-semibold shadow-[0_0_10px_var(--tw-color-primary)]"
                    : "text-primary border border-primary hover:bg-primary hover:text-black"
                  }`}
              >
                {t} {isPremium && <span className="ml-1"><FaCrown /></span>}
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Select Your Date & Time
          </h1>
          <p className="text-gray-400">
            Choose your preferred appointment slot
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="bg-[#111] p-6 rounded-2xl border border-primary/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-primary font-semibold">
                {new Date(currentYear, currentMonth).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevMonth}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-primary border border-primary hover:bg-primary hover:text-black transition"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-primary border border-primary hover:bg-primary hover:text-black transition"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            <div className="border border-primary/20 p-5 rounded-2xl">

              {/* Weekday labels */}
              <div className="grid grid-cols-7 gap-2 text-center text-sm text-primary mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-2 text-center">
                {days.map((d, idx) => {
                  const fullDate = formatDate(d.fullDate);
                  const isSelected = date === fullDate;
                  const isPast =
                    d.fullDate < new Date(new Date().setHours(0, 0, 0, 0));

                  return (
                    <button
                      key={idx}
                      disabled={isPast}
                      onClick={() => !isPast && setDate(fullDate)}
                      className={`
                      flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition
                      ${isPast
                          ? "text-gray-600 cursor-not-allowed"
                          : isSelected
                            ? "bg-primary text-black font-semibold shadow-[0_0_15px_var(--tw-color-primary)]"
                            : "text-primary hover:bg-primary hover:text-black "
                        }
                    `}
                    >
                      {d.date}
                    </button>
                  );
                })}
              </div></div>
          </div>

          {/* Time Slots with Tabs */}
          <div className="bg-[#111] p-6 rounded-2xl border border-primary/30">
            <h2 className="text-2xl text-primary mb-4 font-semibold">
              Available Time Slots
            </h2>
            <p className="text-gray-400 mb-4 text-lg">

              {date ? `Selected Date: ${date}` : "Please select a date"}
            </p>

            {/* Tabs */}
            <div className="flex justify-center mb-6">
              <div className="bg-black/40 p-1 rounded-full border border-primary/30 flex">
                <button
                  onClick={() => setActiveTab("day")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "day"
                    ? "bg-primary text-black font-semibold"
                    : "text-primary"
                    }`}
                >
                  Day
                </button>
                <button
                  onClick={() => setActiveTab("night")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "night"
                    ? "bg-primary text-black font-semibold"
                    : "text-primary"
                    }`}
                >
                  Night (Premium)
                </button>
              </div>
            </div>

            {/* Sections */}
            {activeTab === "day" && renderSections(daySections)}
            {activeTab === "night" && renderSections(nightSections, true)}
          </div>
        </div>

        {/* Confirm */}
        <div className="text-center mt-10 space-x-10">
          <button
            onClick={() => navigate('/allservicespage')}
            className="px-10 py-4 rounded-full text-lg font-semibold transition-all
                        inline-flex items-center gap-x-4 text-white hover:scale-105 shadow-[0_0_15px_var(--tw-color-primary)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>

            Back
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading || !date || !time}
            className={`px-10 py-4 rounded-full text-lg font-semibold transition-all
              ${loading || !date || !time
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-primary text-black hover:scale-105 shadow-[0_0_15px_var(--tw-color-primary)]"
              }`}
          >
            {loading ? "Saving..." : "Find Therapists"}
          </button>
          <p className="text-gray-500 text-sm mt-2">
            Continue to select your preferred wellness professional
          </p>
        </div>

        <div ref={therapistSelectionRef}></div>
      </div>
    </div>
  );
};

export default DateTimePicker;
