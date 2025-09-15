import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import BookingsTableSkeleton from "./BookingsTableSkeleton"; // 👈 skeleton component

const apiUrl = import.meta.env.VITE_API_URL;

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const adminjwt = localStorage.getItem("adminjwt");
  const limit = 10;

  useEffect(() => {
    fetchBookings(page);
  }, [page]);

  const fetchBookings = async (pageNum) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${apiUrl}/admin/bookings?page=${pageNum}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${adminjwt}`,
        },
      }
      );
      setBookings(res.data.bookings || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalBookings(res.data.totalBookings || res.data.bookings?.length || 0);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    )} - ${endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.clientId?.name?.first?.toLowerCase().includes(search.toLowerCase()) ||
      b.clientId?.name?.last?.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingCode?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : b.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#111] text-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-primary">Recent Bookings</h1>

          <div className="flex space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                className="bg-[#0d0d0d] text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <select
              className="bg-[#0d0d0d] text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0d0d0d] rounded-xl shadow-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#111] text-gray-400">
              <tr>
                <th className="py-3 px-4 text-left">Booking ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Therapist</th>
                <th className="py-3 px-4 text-left">Service</th>
                <th className="py-3 px-4 text-left">Date & Time</th>
                <th className="py-3 px-4 text-left">Duration</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Payment</th>
                {/* <th className="py-3 px-4 text-left">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <BookingsTableSkeleton /> // 👈 skeleton integration
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-6 text-center text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-t border-[#222] hover:bg-[#111]"
                  >
                    <td className="py-3 px-4">{b.bookingCode}</td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {b.clientId?.avatar_url && (
                          <img
                            src={b.clientId.avatar_url}
                            alt={`${b.clientId?.name?.first} ${b.clientId?.name?.last}`}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div>
                            {b.clientId?.name?.first} {b.clientId?.name?.last}
                          </div>
                          {b.clientId?.email && (
                            <div className="text-xs text-gray-400">
                              {b.clientId.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Therapist */}
                    <td className="py-3 px-4">
                      {b.therapistId?.title || "Unassigned"}
                    </td>

                    {/* Service */}
                    <td className="py-3 px-4">{b.serviceId?.name || "N/A"}</td>

                    {/* Date/Time */}
                    <td className="py-3 px-4">
                      {formatDateTime(b.slotStart, b.slotEnd)}
                    </td>

                    {/* Duration */}
                    <td className="py-3 px-4">
                      {Math.round(
                        (new Date(b.slotEnd) - new Date(b.slotStart)) /
                        (1000 * 60)
                      )}{" "}
                      min
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${b.status === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : b.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                          }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    {/* Payment */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${b.paymentStatus === "paid"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                          }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    {/* <td className="py-3 px-4 space-x-2"> */}
                    {/*   <button className="bg-primary text-black px-3 py-1 rounded text-xs"> */}
                    {/*     Assign */}
                    {/*   </button> */}
                    {/*   <button className="bg-blue-600 px-3 py-1 rounded text-xs"> */}
                    {/*     Edit */}
                    {/*   </button> */}
                    {/*   <button className="bg-red-600 px-3 py-1 rounded text-xs"> */}
                    {/*     Cancel */}
                    {/*   </button> */}
                    {/* </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <p>
            Showing {bookings.length} of {totalBookings} bookings
          </p>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 rounded bg-[#0d0d0d] hover:bg-[#111] disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${page === i + 1
                  ? "bg-primary text-black"
                  : "bg-[#0d0d0d] hover:bg-[#111]"
                  }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded bg-[#0d0d0d] hover:bg-[#111] disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
