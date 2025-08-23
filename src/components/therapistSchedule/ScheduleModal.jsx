import React, { useState } from "react";
import { FaSave, FaTrash, FaTimes, FaPlus } from "react-icons/fa";

export default function ScheduleModal({
  isModalOpen,
  setIsModalOpen,
  selectedDay,
  availabilityData,
  setAvailabilityData,
  refreshAvailability, // 🔑 passed from Calendar
}) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const therapistId = localStorage.getItem("therapistId");

  if (!isModalOpen) return null;

  const handleSave = async () => {
    if (!availabilityData[selectedDay]) {
      alert("No slots to save");
      return;
    }

    const payload = {
      therapistId,
      date: selectedDay, // "YYYY-MM-DD"
      blocks: availabilityData[selectedDay].map((slot) => ({
        startTime: slot.start,
        endTime: slot.end,
        isAvailable: true,
      })),
    };

    try {
      const res = await fetch(`${apiUrl}/therapist/addAvailability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save schedule");

      setIsModalOpen(false);
      refreshAvailability(); // 🔑 reload data from server
    } catch (err) {
      console.error(err);
    }
  };

  const addSlot = () => {
    if (!startTime || !endTime || startTime >= endTime) {
      alert("Please enter a valid time slot");
      return;
    }
    setAvailabilityData((prev) => {
      const newDaySlots = prev[selectedDay] ? [...prev[selectedDay]] : [];
      newDaySlots.push({ start: startTime, end: endTime });
      newDaySlots.sort((a, b) => a.start.localeCompare(b.start));
      return { ...prev, [selectedDay]: newDaySlots };
    });
    setStartTime("");
    setEndTime("");
  };

  const removeSlot = (index) => {
    setAvailabilityData((prev) => {
      const newSlots = [...prev[selectedDay]];
      newSlots.splice(index, 1);
      if (!newSlots.length) {
        const { [selectedDay]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [selectedDay]: newSlots };
    });
  };

  const clearDay = () => {
    setAvailabilityData((prev) => {
      const { [selectedDay]: _, ...rest } = prev;
      return rest;
    });
  };

  const copySchedule = (type) => {
    alert(`Copy schedule to: ${type}`);
    // TODO: implement logic
  };

  return (
    <div
      className="fixed inset-0 modal-backdrop backdrop-blur-lg z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target.classList.contains("modal-backdrop") && setIsModalOpen(false)}
    >
      <div className="glass-morphism bg-[#0d0d0d] border-white/10 rounded-2xl p-6 w-full max-w-lg border border-gold max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-semibold font-playfair">Manage Availability</h3>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        {/* Selected Day */}
        <div className="mb-6 gap-x-4">
          <h4 className="text-xl text-primary font-medium mb-4">{selectedDay}</h4>

          {/* Copy Schedule */}
          <div className="glass-morphism bg-[#111111] p-4 rounded-xl border border-white/10 mb-4">
            <h5 className="font-medium mb-3">Copy Schedule To:</h5>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => copySchedule("Next 7 Days")} className="glass-morphism hover:border-primary duration-300 transition-all px-4 py-2 rounded-lg border border-gray-600 text-gray-300 ">
                Next 7 Days
              </button>
              <button onClick={() => copySchedule("All Weekdays")} className="glass-morphism hover:border-primary duration-300 transition-all px-4 py-2 rounded-lg border border-gray-600 text-gray-300 ">
                All Weekdays
              </button>
              <button onClick={() => copySchedule("All Weekends")} className="glass-morphism px-4 hover:border-primary duration-300 transition-all py-2 rounded-lg border border-gray-600 text-gray-300 ">
                All Weekends
              </button>
              <button onClick={() => copySchedule("Entire Month")} className="glass-morphism px-4 hover:border-primary duration-300 transition-all py-2 rounded-lg border border-gray-600 text-gray-300 ">
                Entire Month
              </button>
            </div>
          </div>

          {/* Time Slots List */}
          <div className="space-y-2 mb-4 rounded-lg">
            {availabilityData[selectedDay]?.length ? (
              availabilityData[selectedDay].map((slot, i) => (
                <div key={i} className="time-slot bg-primary/20 p-3 rounded-lg flex justify-between">
                  <span>{slot.start} - {slot.end}</span>
                  <button onClick={() => removeSlot(i)} className="text-red-400 hover:text-red-300">
                    <FaTrash />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm text-center py-4">No time slots set</div>
            )}
          </div>

          {/* Add Slot */}
          <div className="glass-morphism p-4 rounded-xl border border-white/10">
            <h5 className="font-medium mb-3">Add Time Slot</h5>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Start Time</label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">End Time</label>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
            </div>
            <button onClick={addSlot} className="bg-primary hover:bg-amber-500 w-full py-2 rounded-lg text-black font-medium">
              <FaPlus className="inline mr-2" /> Add Slot
            </button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex space-x-3">
          <button onClick={handleSave} className="bg-primary hover:bg-amber-500 flex-1 py-3 rounded-xl text-black font-semibold">
            <FaSave className="inline mr-2" /> Save
          </button>
          <button onClick={clearDay} className="glass-morphism flex-1 py-3 rounded-xl border border-red-400 text-red-400 hover:bg-red-500 hover:bg-opacity-20 transition-all">
            <FaTrash className="inline mr-2" /> Clear Day
          </button>
        </div>
      </div>
    </div>
  );
}
