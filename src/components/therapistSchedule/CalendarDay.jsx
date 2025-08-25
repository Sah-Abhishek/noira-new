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
      className={`calendar-cell p-1 sm:p-2 rounded-lg sm:rounded-xl hover:border-primary hover:bg-primary/20 border 
        min-h-[60px] sm:min-h-[100px] transition-all cursor-pointer
        ${isPast ? "cursor-not-allowed opacity-60" : "cursor-pointer"} 
        ${isToday
          ? "border-gold bg-primary/10 ring-1 ring-gold/30"
          : slots.length
            ? "border-gold border-opacity-50 bg-gold bg-opacity-5"
            : "border-gray-700"}
        hover:border-gold hover:bg-gold hover:bg-opacity-10`}
    >
      <div className="flex flex-col justify-between h-full text-center">
        {/* Day Number */}
        <div
          className={`text-sm sm:text-lg font-semibold mb-1 leading-none
            ${isToday ? "text-gold" : isPast ? "text-gray-500" : "text-white"}`}
        >
          {day}
        </div>

        {/* Slots Info - More compact for mobile */}
        {!isPast && slots.length > 0 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Show slot count on mobile, times on desktop */}
            <div className="text-[8px] sm:text-xs text-gold opacity-80 hidden sm:flex flex-col items-center text-center leading-tight">
              {slots.slice(0, 2).map((s, i) => (
                <span key={i}>{s.start}-{s.end}</span>
              ))}
              {slots.length > 2 && <span>+{slots.length - 2} more</span>}
            </div>

            {/* Mobile: Show just the count */}
            <div className="text-[9px] sm:hidden text-gold opacity-80 font-medium">
              {slots.length} slot{slots.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}

        {/* Availability Dots - Smaller and fewer on mobile */}
        <div className="flex flex-wrap justify-center gap-[2px] mt-1">
          {!isPast && slots.length > 0 && (
            <>
              {/* Mobile: Show max 3 dots */}
              <div className="flex sm:hidden gap-[2px]">
                {Array.from({ length: Math.min(slots.length, 3) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-gold rounded-full opacity-70"
                  />
                ))}
                {slots.length > 3 && (
                  <div className="w-1 h-1 bg-gold rounded-full opacity-40" />
                )}
              </div>

              {/* Desktop: Show all dots */}
              <div className="hidden sm:flex gap-1 flex-wrap justify-center">
                {slots.map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gold rounded-full opacity-70"
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Today indicator */}
        {isToday && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full animate-pulse sm:hidden" />
        )}
      </div>
    </div>
  );
}
