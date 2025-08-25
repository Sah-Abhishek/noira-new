// src/components/therapistDashboard/OverviewPanel.jsx
import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import axios from "axios";

export default function OverviewPanel({
  availabilityData,
  availableDays,
  totalHours,
  openModal,
  setAvailabilityData,
}) {
  const therapistId = localStorage.getItem("therapistId"); // 👈 or however you store it
  const apiUrl = import.meta.env.VITE_API_URL;

  const removeSlot = async (dateKey, index) => {
    const slotToRemove = availabilityData[dateKey][index];
    if (!slotToRemove) return;

    try {
      await axios.delete(`${apiUrl}/therapist/blocks`, {
        data: {
          therapistId,
          date: new Date(dateKey).toISOString(),
          blocksToDelete: [
            {
              startTime: slotToRemove.start,
              endTime: slotToRemove.end,
            },
          ],
        },
      });

      // ✅ Update local state after successful deletion
      setAvailabilityData((prev) => {
        const newSlots = [...prev[dateKey]];
        newSlots.splice(index, 1);
        if (!newSlots.length) {
          const { [dateKey]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [dateKey]: newSlots };
      });
    } catch (error) {
      console.error("Error deleting slot:", error);
      alert("Failed to delete slot. Please try again.");
    }
  };

  // --- Extra Info ---
  const totalSlots = Object.values(availabilityData).reduce(
    (acc, slots) => acc + slots.length,
    0
  );

  const allDates = Object.keys(availabilityData).sort();
  const earliestDate = allDates.length ? allDates[0] : null;
  const latestDate = allDates.length ? allDates[allDates.length - 1] : null;

  return (
    <div className="glass-morphism bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 h-fit">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold font-playfair text-primary">
          Monthly Overview
        </h3>
      </div>

      {/* Summary Info */}
      <div className="mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Available Days</span>
          <span className="text-gold font-semibold">{availableDays}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Hours</span>
          <span className="text-gold font-semibold">{totalHours}h</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Slots</span>
          <span className="text-gold font-semibold">{totalSlots}</span>
        </div>
        {earliestDate && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Earliest Availability</span>
            <span className="text-gold font-semibold">
              {new Date(earliestDate).toLocaleDateString()}
            </span>
          </div>
        )}
        {latestDate && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Latest Availability</span>
            <span className="text-gold font-semibold">
              {new Date(latestDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Slots List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {Object.keys(availabilityData).length === 0 ? (
          <div className="text-gray-400 text-sm text-center py-8">
            No availability set
          </div>
        ) : (
          Object.entries(availabilityData).map(([dateKey, slots]) => {
            const [y, m, d] = dateKey.split("-");
            const date = new Date(y, m - 1, d);
            const dayName = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            return (
              <div
                key={dateKey}
                className="glass-morphism p-3 rounded-lg border border-gray-700 hover:border-gold transition-colors"
              >
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gold font-medium">
                    {dayName}, {m}/{d}
                  </span>
                  <button
                    onClick={() => openModal(dateKey)}
                    className="text-gray-400 hover:text-gold"
                  >
                    <FaEdit className="text-xs" />
                  </button>
                </div>
                <div className="space-y-1">
                  {slots.map((s, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span>
                        {s.start} - {s.end}
                      </span>
                      <button
                        onClick={() => removeSlot(dateKey, i)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
