import React from "react";

export default function CalendarDay({ day, dateKey, slots, isToday, isPast, openModal }) {
  const handleClick = () => {
    if (!isPast) {
      openModal(dateKey, slots);
    }
  };

  return (
    <div
      onClick={() => !isPast && openModal(dateKey, slots)}
      className={`calendar-cell p-2 rounded-xl hover:border-primary hover:bg-primary/20 border min-h-[100px] transition-all 
    ${isPast ? "cursor-not-allowed" : "cursor-pointer"} 
    ${isToday
          ? "border-gold bg-primary/10"
          : slots.length
            ? "border-gold border-opacity-50 bg-gold bg-opacity-5"
            : "border-gray-700"}
    hover:border-gold hover:bg-gold hover:bg-opacity-10`}
    >
      <div className="flex flex-col justify-between h-full text-center">
        <div
          className={`text-lg font-semibold mb-1 ${isToday ? "text-gold" : isPast ? "text-gray-500" : ""
            }`}
        >
          {day}
        </div>

        {/* Show slots as text */}
        <div className="text-xs text-gold opacity-80 truncate">
          {!isPast && slots.map((s) => `${s.start}-${s.end}`).join(", ")}
        </div>

        {/* Availability dots */}
        <div className="flex flex-wrap justify-center">
          {!isPast &&
            slots.map((_, i) => (
              <div key={i} className="availability-dot" />
            ))}
        </div>
      </div>
    </div>
  );
}
