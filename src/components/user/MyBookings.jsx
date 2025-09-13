import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Clock,
  User,
  CreditCard,
  Hash,
  StickyNote,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"; // adjust if needed
  const userId = localStorage.getItem("userId");
  const userjwt = localStorage.getItem("userjwt");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user/${userId}/bookings`, {
          headers: { Authorization: `Bearer ${userjwt}` },
        });
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    if (userId && userjwt) {
      fetchBookings();
    } else {
      setError("User not authenticated.");
      setLoading(false);
    }
  }, [apiUrl, userId, userjwt]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Loading bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-400">
        {error}
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        No bookings found.
      </div>
    );
  }

  // Example handler for review button click
  const handleReview = (bookingId, therapistName) => {
    navigate(`/user/reviewbooking/${bookingId}`);
    alert(`Review flow for ${therapistName} (Booking ID: ${bookingId})`);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] py-10 px-6">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        My Bookings
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => {
          const therapist = booking.therapistId;
          const service = booking.serviceId;

          return (
            <div
              key={booking._id}
              className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-2xl shadow-xl border border-primary/30 hover:border-primary/60 transition transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="p-6 flex flex-col h-full justify-between">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-primary tracking-wide">
                    {service ? service.name : "Custom Session"}
                  </h2>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${booking.paymentStatus === "paid"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                      }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </div>

                {/* Info Grid */}
                <div className="space-y-3 text-sm text-gray-300">
                  {therapist ? (
                    <p className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-primary">Name</span>
                      {therapist.title}
                    </p>
                  ) : (
                    <p className="flex items-center gap-2 italic text-gray-400">
                      <User className="w-4 h-4 text-gray-500" />
                      Therapist Not Assigned
                    </p>
                  )}

                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">Date</span>
                    {new Date(booking.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">Time</span>
                    {new Date(booking.slotStart).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(booking.slotEnd).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {/* Booked At */}
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">Booked At</span>
                    {new Date(booking.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <p className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">Price</span>
                    {booking.price?.amount ?? booking.price}{" "}
                    {booking.price?.currency?.toUpperCase()}
                  </p>

                  {booking.notes && (
                    <p className="flex items-start gap-2 text-gray-400">
                      <StickyNote className="w-4 h-4 text-primary mt-0.5" />
                      Notes {booking.notes}
                    </p>
                  )}

                  {booking.bookingCode && (
                    <p className="flex items-center gap-2 text-gray-500 text-xs">
                      <Hash className="w-4 h-4 text-primary" />
                      {booking.bookingCode}
                    </p>
                  )}
                </div>

                {/* Review Button */}
                {!booking.isReviewed &&
                  therapist &&
                  booking.status === "completed" && (
                    <button
                      onClick={() =>
                        handleReview(booking._id, therapist.title)
                      }
                      className="mt-4 w-full flex items-center justify-center gap-2 bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 transition rounded-lg px-3 py-2 text-sm font-medium"
                    >
                      <Star className="w-4 h-4" />
                      Review Therapist
                    </button>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
