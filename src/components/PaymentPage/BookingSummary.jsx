import React from "react";
import { Star } from "lucide-react";
import useBookingStore from "../../store/bookingStore"; // adjust path if needed

const BookingSummary = () => {
  const selectedTherapist = useBookingStore((state) => state.selectedTherapist);
  const date = useBookingStore((state) => state.date);
  const time = useBookingStore((state) => state.time);

  // Example fees (you can also get these from store if stored)
  const serviceFee = 85.0;
  const processingFee = 2.5;
  const duration = "60 minutes";
  const total = serviceFee + processingFee;

  if (!selectedTherapist) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 text-white">
        No therapist selected.
      </div>
    );
  }

  const {
    userId: { avatar_url, email },
    title,
    rating,
    experience,
  } = selectedTherapist;

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <h2 className="text-white text-xl font-semibold mb-6 text-center">Booking Summary</h2>

      {/* Therapist Info */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src={avatar_url}
          alt={email}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          <p className="text-primary text-sm">{experience} years experience</p>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-3 h-3 text-primary fill-primary"
                />
              ))}
            </div>
            <span className="text-white text-sm font-medium ml-1">{rating}</span>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      {/* Booking Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="text-gray-400">Date:</span>
          <span className="text-white">
            {date
              ? new Date(date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              : "Not selected"}
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="text-gray-400">Time:</span>
          <span className="text-white">
            {time
              ? new Date(time).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })
              : "Not selected"}
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="text-gray-400">Duration:</span>
          <span className="text-white">{duration}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="text-gray-400">Service Fee:</span>
          <span className="text-white">${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between  border-gray-700 pb-1">
          <span className="text-gray-400">Processing Fee:</span>
          <span className="text-white">${processingFee.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-white text-lg font-semibold">Total:</span>
          <span className="text-primary text-2xl font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
