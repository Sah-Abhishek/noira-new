import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

export default function TherapistBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const baseUrl = import.meta.env.VITE_API_URL; // adjust if needed
  const therapistjwt = localStorage.getItem("therapistjwt");

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${baseUrl}/therapist/getbookings`, {
          headers: { Authorization: `Bearer ${therapistjwt}` },
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

  const updateBookingStatus = async (id, status) => {
    try {
      const endpoint =
        status === "completed"
          ? `${baseUrl}/therapist/completebooking/${id}`
          : `${baseUrl}/therapist/decline/${id}`;

      await axios.put(
        endpoint,
        {},
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

  const filteredBookings = bookings.filter((b) => {
    if (filter !== "all" && b.status !== filter) return false;
    if (
      search &&
      !b.serviceId?.name?.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-primary">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      {/* Top Navbar */}
      <header className="flex justify-between items-center bg-[#111] p-4 border-b border-primary/20">
        <h1 className="text-xl font-bold text-primary">My Bookings</h1>
      </header>

      {/* Filters + Search */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0f0f0f] border-b border-primary/20">
        <div className="flex gap-3">
          {["all", , "completed", "cancelled", "declined"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1 rounded-lg font-medium capitalize ${filter === tab
                  ? "bg-primary text-black"
                  : "bg-[#1a1a1a] text-gray-400 hover:text-white"
                  }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
        {/* <input */}
        {/*   type="text" */}
        {/*   placeholder="Search bookings..." */}
        {/*   value={search} */}
        {/*   onChange={(e) => setSearch(e.target.value)} */}
        {/*   className="bg-[#1a1a1a] px-3 py-2 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary" */}
        {/* /> */}
      </div>

      {/* Booking Cards */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredBookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          filteredBookings.map((b) => {
            const now = new Date();
            const bookingTime = new Date(b.slotStart);
            const isPast = bookingTime < now;

            return (
              <div
                key={b._id}
                className="bg-[#111] rounded-2xl p-5 border border-primary/20 shadow-lg"
              >
                {/* Service Name + Code */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">{b.serviceId?.name}</h2>
                  <span className="text-xs text-yellow-400 font-medium">
                    #{b.bookingCode || b._id.slice(-6).toUpperCase()}
                  </span>
                </div>

                {/* Client + Details */}
                <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-300 mb-4">
                  <p>
                    <span className="text-primary font-medium">Client:</span>{" "}
                    {b.clientId?.name?.first} {b.clientId?.name?.last}
                  </p>
                  <p>
                    <span className="text-primary font-medium">Date & Time:</span>{" "}
                    {new Date(b.date).toLocaleDateString()}{" "}
                    {new Date(b.slotStart).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    <span className="text-primary font-medium">Duration:</span>{" "}
                    {Math.round(
                      (new Date(b.slotEnd) - new Date(b.slotStart)) / 60000
                    )}{" "}
                    min
                  </p>
                  <p>
                    <span className="text-primary font-medium">Price:</span>{" "}
                    {b.price?.amount} {b.price?.currency}
                  </p>
                </div>

                {/* Status + Actions */}
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${b.status === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : b.status === "declined" || b.status === "cancelled"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                      }`}
                  >
                    {b.status}
                  </span>

                  {/* Action Buttons */}
                  {b.status !== "completed" && b.status !== "declined" && (
                    <div className="flex gap-2">
                      {isPast ? (
                        <button
                          onClick={() => updateBookingStatus(b._id, "completed")}
                          className="bg-primary hover:bg-yellow-600 text-black px-3 py-1 rounded-lg text-sm font-medium"
                        >
                          Mark Completed
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => updateBookingStatus(b._id, "declined")}
                            className="bg-red-600 hover:bg-red-700 inline-flex justify-center items-center text-white px-3 py-1 rounded-lg text-sm font-medium"
                          >
                            <FaTimes className="mr-1" /> Decline
                          </button>
                          <button
                            onClick={() =>
                              updateBookingStatus(b._id, "completed")
                            }
                            className="bg-primary hover:bg-yellow-600 text-black px-3 py-1 rounded-lg text-sm font-medium"
                          >
                            Mark Completed
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* Pagination (dummy UI for now) */}
      {/* <footer className="flex justify-between items-center px-4 py-3 bg-[#111] border-t border-primary/20"> */}
      {/*   <p className="text-sm text-gray-400"> */}
      {/*     Showing {filteredBookings.length} of {bookings.length} bookings */}
      {/*   </p> */}
      {/*   <div className="flex gap-2"> */}
      {/*     <button className="px-3 py-1 rounded bg-[#1a1a1a] text-gray-400 hover:text-white"> */}
      {/*       Prev */}
      {/*     </button> */}
      {/*     <button className="px-3 py-1 rounded bg-primary text-black font-semibold"> */}
      {/*       1 */}
      {/*     </button> */}
      {/*     <button className="px-3 py-1 rounded bg-[#1a1a1a] text-gray-400 hover:text-white"> */}
      {/*       Next */}
      {/*     </button> */}
      {/*   </div> */}
      {/* </footer> */}
    </div>
  );
}
