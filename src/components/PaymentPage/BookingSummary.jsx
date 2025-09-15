import React from "react";
import { Star } from "lucide-react";
import useBookingStore from "../../store/bookingStore";

const BookingSummary = () => {
  const selectedTherapist = useBookingStore((state) => state.selectedTherapist);
  const date = useBookingStore((state) => state.date);
  const time = useBookingStore((state) => state.time);
  const { cart, userAddress } = useBookingStore(); // ✅ add userAddress

  if (!selectedTherapist) {
    return (
      <div className="bg-[#0d0d0d] rounded-2xl p-6 border border-white/10 text-white">
        No therapist selected.
      </div>
    );
  }

  // ✅ Safe destructuring with fallbacks
  const avatar =
    selectedTherapist.avatar_url || selectedTherapist?.userId?.avatar_url;
  const email =
    selectedTherapist.email || selectedTherapist?.userId?.email || "N/A";
  const {
    title = "Therapist",
    rating = 0,
    experience = 0,
  } = selectedTherapist.profile || selectedTherapist || {};

  // Extract cart details safely
  const serviceName = cart?.serviceName || "Not selected";
  const serviceDuration = cart?.durationMinutes
    ? `${cart.durationMinutes} minutes`
    : "Not selected";
  const serviceFee = cart?.price || 0;

  // ✅ Elite Hours Logic
  let eliteHoursFee = 0;
  if (time) {
    const [hourStr] = time.split(":"); // "HH:mm"
    const hour = parseInt(hourStr, 10);

    // Elite hours = 23:00 → 23:59 OR 00:00 → 09:00
    if (hour >= 23 || hour < 9) {
      eliteHoursFee = 15;
    }
  }
  const total = serviceFee + eliteHoursFee;

  return (
    <div className="bg-[#0d0d0d] rounded-2xl p-6 border border-white/10 shadow-lg w-full space-y-6">
      {/* Heading */}
      <h2 className="text-primary text-lg font-semibold mb-6">
        Booking Summary
      </h2>

      {/* Therapist Info */}
      <div className="bg-[#111] rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={email}
            className="w-14 h-14 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <h3 className="text-white font-semibold">{title}</h3>
            <p className="text-primary text-xs">
              {experience} years experience
            </p>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${star <= Math.round(rating)
                      ? "text-primary fill-primary"
                      : "text-gray-600"
                      }`}
                  />
                ))}
              </div>
              <span className="text-gray-300 text-xs ml-1">{rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Info */}
      <div className="bg-[#111] rounded-2xl p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Date:</span>
          <span className="text-white text-sm">
            {date
              ? new Date(date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              : "Not selected"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Time:</span>
          <span className="text-white text-sm">{time || "Not selected"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Service:</span>
          <span className="text-white text-sm">{serviceName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Duration:</span>
          <span className="text-white text-sm">{serviceDuration}</span>
        </div>
      </div>

      {/* User Address */}
      {userAddress && (
        <div className="bg-[#111] rounded-2xl p-4 space-y-2">
          <h3 className="text-primary font-semibold text-sm mb-2">
            Your Address
          </h3>
          <div className="text-white text-sm leading-relaxed">
            {[
              [userAddress?.building_No, userAddress?.Street].filter(Boolean).join(", "),
              [userAddress?.Locality, userAddress?.PostTown].filter(Boolean).join(", "),
              userAddress?.PostalCode,
            ]
              .filter(Boolean) // remove empty lines
              .map((line, i) => (
                <p key={i}>{line}</p>
              ))}
          </div>
        </div>
      )}

      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Service Fee:</span>
          <span className="text-white">₤{serviceFee.toFixed(2)}</span>
        </div>
        {/* <div className="flex justify-between text-sm"> */}
        {/*   <span className="text-gray-400">Processing Fee:</span> */}
        {/*   <span className="text-white">₤{processingFee.toFixed(2)}</span> */}
        {/* </div> */}
        {eliteHoursFee > 0 && (
          <div className="flex justify-between text-sm text-yellow-400">
            <span>Elite Hours Fee:</span>
            <span>₤{eliteHoursFee.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-white/10 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-primary text-lg font-semibold">Total:</span>
          <span className="text-primary text-xl font-bold">
            ₤ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
