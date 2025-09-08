import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Plus, Bell } from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CustomerDashboard() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userjwt = localStorage.getItem("userjwt");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch profile
        const res = await axios.get(`${apiUrl}/user/profile`, {
          headers: { Authorization: `Bearer ${userjwt}` },
        });
        setProfile(res.data.user);

        // 2. Fetch bookings (need userId from profile)
        const userId = res.data.user?._id;
        if (userId) {
          const bookingsRes = await axios.get(
            `${apiUrl}/user/${userId}/bookings`,
            { headers: { Authorization: `Bearer ${userjwt}` } }
          );
          setBookings(bookingsRes.data.bookings || []);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (userjwt) fetchData();
    else {
      setError("User not authenticated");
      setLoading(false);
    }
  }, [userjwt]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111] text-gray-200">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111] text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  const fullName = `${profile?.name?.first || ""} ${profile?.name?.last || ""}`;
  const address = profile?.address
    ? `${profile.address.Building_No}, ${profile.address.Street}, ${profile.address.Locality}, ${profile.address.PostTown}, ${profile.address.PostalCode}`
    : "No address";

  return (
    <div className="min-h-screen bg-[#111] text-gray-200 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="bg-[#0d0d0d] rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
          <img
            src={profile?.avatar_url || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-primary"
          />
          <h2 className="mt-4 text-xl font-semibold">
            {fullName || "Unknown User"}
          </h2>
          <span className="mt-1 bg-primary/20 text-primary text-sm px-3 py-1 rounded-full">
            {profile?.role || "Standard Member"}
          </span>

          <div className="mt-6 space-y-2 text-sm text-gray-400">
            <p>Email: <span className="text-gray-200">{profile?.email}</span></p>
            <p>Phone: <span className="text-gray-200">{profile?.phone || "Not provided"}</span></p>
            <p>Address: <span className="text-gray-200">{address}</span></p>
          </div>

          {/* Totals */}
          <div className="mt-6 grid grid-cols-2 gap-4 w-full text-center">
            <div className="bg-[#111] rounded-xl py-4">
              <p className="text-lg font-bold">{profile?.totalBookings || 0}</p>
              <p className="text-gray-400 text-xs">Total Bookings</p>
            </div>
            <div className="bg-[#111] rounded-xl py-4">
              <p className="text-lg font-bold text-primary">
                £{profile?.totalSpend || 0}
              </p>
              <p className="text-gray-400 text-xs">Total Spend</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 w-full space-y-3">
            <button className="flex items-center justify-center gap-2 w-full bg-[#111] hover:bg-primary/20 py-2 rounded-lg text-sm transition">
              <Edit size={16} /> Edit Profile
            </button>
            <button className="flex items-center justify-center gap-2 w-full bg-[#111] hover:bg-primary/20 py-2 rounded-lg text-sm transition">
              <Plus size={16} /> Add Booking
            </button>
            <button className="flex items-center justify-center gap-2 w-full bg-[#111] hover:bg-primary/20 py-2 rounded-lg text-sm transition">
              <Bell size={16} /> Send Notification
            </button>
          </div>
        </div>

        {/* Right Section (Booking History) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex space-x-6 border-b border-gray-700">
            <button className="pb-3 text-primary border-b-2 border-primary font-semibold">
              Booking History
            </button>
          </div>

          <div className="bg-[#0d0d0d] rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Booking History</h3>

            {bookings.length === 0 ? (
              <p className="text-gray-400 text-sm">No bookings found.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="p-4 bg-[#111] rounded-xl flex justify-between items-start"
                  >
                    {/* Left side */}
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-200">
                        {booking.bookingCode}
                      </p>

                      <p className="text-xs text-gray-400">
                        Therapist:{" "}
                        <span className="text-gray-200">
                          {booking.therapistId?.title || "N/A"}
                        </span>
                      </p>

                      <p className="text-xs text-gray-400">
                        Service:{" "}
                        <span className="text-gray-200">
                          {booking.serviceId?.name || "N/A"}
                        </span>
                      </p>

                      <p className="text-xs text-gray-400">
                        {new Date(booking.slotStart).toLocaleString()} –{" "}
                        {new Date(booking.slotEnd).toLocaleTimeString()}
                      </p>

                      {booking.notes && (
                        <p className="text-xs text-gray-400 italic">
                          Notes: {booking.notes}
                        </p>
                      )}

                      <p className="text-xs text-gray-400">
                        Status:{" "}
                        <span
                          className={`font-medium ${booking.status === "confirmed"
                            ? "text-green-400"
                            : "text-yellow-400"
                            }`}
                        >
                          {booking.status}
                        </span>{" "}
                        | Payment:{" "}
                        <span
                          className={`font-medium ${booking.paymentStatus === "paid"
                            ? "text-green-400"
                            : "text-red-400"
                            }`}
                        >
                          {booking.paymentStatus}
                        </span>
                      </p>
                    </div>

                    {/* Right side */}
                    <div className="text-right">
                      <p className="text-primary font-semibold">
                        £{booking.price?.amount}
                      </p>
                      <p className="text-xs uppercase text-gray-400">
                        {booking.price?.currency || "GBP"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
