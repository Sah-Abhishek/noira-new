
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function TherapistBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL; // adjust if you’re not using Vite
  const therapistjwt = localStorage.getItem("therapistjwt");

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${baseUrl}/therapist/bookings`, {
          headers: { authorization: `Bearer ${therapistjwt}` },
        });
        setBookings(res.data.bookings || []);
      } catch (err) {
        toast.error("Failed to fetch bookings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [baseUrl, therapistjwt]);

  // Handle status updates
  const updateBookingStatus = async (id, status) => {
    try {
      await axios.patch(
        `${baseUrl}/therapist/bookings/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${therapistjwt}` } }
      );
      toast.success(`Booking marked as ${status}`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      toast.error("Action failed");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-primary">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-6 text-white">
      <h1 className="text-3xl font-bold text-primary mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-400">No bookings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-[#111] rounded-2xl shadow-lg border border-primary/30 hover:border-primary/60 transition p-5 flex flex-col justify-between"
            >
              {/* Client Info */}
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  {booking.clientId?.name?.first} {booking.clientId?.name?.last}
                </h2>
                <p className="text-sm text-gray-400 mb-1">
                  {booking.clientId?.email}
                </p>

                {/* Booking Details */}
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-semibold text-primary">Service: </span>
                    {booking.serviceId?.name}
                  </p>
                  <p>
                    <span className="font-semibold text-primary">Date: </span>
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold text-primary">Time: </span>
                    {new Date(booking.slotStart).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(booking.slotEnd).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    <span className="font-semibold text-primary">Price: </span>
                    {booking.price?.amount} {booking.price?.currency}
                  </p>
                  <p>
                    <span className="font-semibold text-primary">Status: </span>
                    <span
                      className={`${booking.status === "completed"
                        ? "text-green-400"
                        : booking.status === "declined"
                          ? "text-red-400"
                          : "text-yellow-400"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => updateBookingStatus(booking._id, "declined")}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition"
                >
                  Decline
                </button>
                <button
                  onClick={() => updateBookingStatus(booking._id, "completed")}
                  className="flex-1 bg-primary hover:bg-yellow-600 text-black py-2 rounded-xl font-medium transition"
                >
                  Mark Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
