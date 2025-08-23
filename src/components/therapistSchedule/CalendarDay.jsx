
import React from "react";

export default function CalendarDay({ day, openModal }) {
  return (
    <div
      onClick={() => openModal(day.dateKey)}
      className={`calendar-cell p-2 rounded-xl hover:border-primary hover:bg-primary/20 cursor-pointer border min-h-[100px] transition-all 
        ${day.isToday
          ? "border-gold bg-gold bg-opacity-10"
          : day.slots.length
            ? "border-gold border-opacity-50 bg-gold bg-opacity-5"
            : "border-gray-700"}
        hover:border-gold hover:bg-gold hover:bg-opacity-10`}
    >
      <div className="flex flex-col justify-between h-full text-center">
        <div className={`text-lg font-semibold mb-1 ${day.isToday ? "text-gold" : ""}`}>
          {day.day}
        </div>
        <div className="text-xs text-gold opacity-80 truncate">
          {day.slots.map((s) => `${s.start}-${s.end}`).join(", ")}
        </div>
        <div className="flex flex-wrap justify-center">
          {day.slots.map((_, i) => (
            <div key={i} className="availability-dot" />
          ))}
        </div>
      </div>
    </div>
  );
}
