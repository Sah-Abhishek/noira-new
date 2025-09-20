import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaTrash, FaEdit, FaSearch, FaCalendarAlt } from "react-icons/fa";
import FancyDropdown from "../browseTherapist/FancyDropdown";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // raw input & debounced search term
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // Date filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const adminjwt = localStorage.getItem('adminjwt');

  const apiUrl = import.meta.env.VITE_API_URL;

  // Debounce effect for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // reset to first page on search
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler); // cleanup if user keeps typing
    };
  }, [searchInput]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const params = {
          page,
          limit,
          search
        };

        // Add date filters if they exist
        if (startDate) {
          params.startDate = startDate;
        }
        if (endDate) {
          params.endDate = endDate;
        }

        const res = await axios.get(`${apiUrl}/admin/users`, {
          params,
          headers: {
            Authorization: `Bearer ${adminjwt}`,
          },
        });

        setUsers(res.data.users || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit, search, startDate, endDate, apiUrl]);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Clear date filters
  const clearDateFilters = () => {
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-primary">Users Management</h1>

          {/* Search + Limit */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl bg-[#111] text-sm text-white border border-[#222] focus:border-primary outline-none"
              />
            </div>

            {/* FancyDropdown for limit */}
            <div className="w-28">
              <FancyDropdown
                label=""
                options={[5, 10, 20, 50].map((n) => `${n}/page`)}
                value={`${limit}/page`}
                onChange={(val) => {
                  const num = Number(val.replace("/page", ""));
                  setLimit(num);
                  setPage(1); // reset page on change
                }}
              />
            </div>
          </div>
        </div>

        {/* Date Filters */}
        <div className="bg-[#111] rounded-2xl p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary" />
              <span className="text-sm font-medium">Registration Date:</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">From:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setPage(1);
                  }}
                  className="px-3 py-2 rounded-lg bg-[#0d0d0d] border border-[#222] text-white text-sm focus:border-primary outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">To:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setPage(1);
                  }}
                  className="px-3 py-2 rounded-lg bg-[#0d0d0d] border border-[#222] text-white text-sm focus:border-primary outline-none"
                />
              </div>

              {(startDate || endDate) && (
                <button
                  onClick={clearDateFilters}
                  className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(startDate || endDate) && (
            <div className="mt-3 pt-3 border-t border-[#222]">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Active filters:</span>
                {startDate && (
                  <span className="px-2 py-1 rounded bg-primary/20 text-primary">
                    From: {formatDate(startDate)}
                  </span>
                )}
                {endDate && (
                  <span className="px-2 py-1 rounded bg-primary/20 text-primary">
                    To: {formatDate(endDate)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-[#111] rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0d0d0d] text-primary text-sm uppercase">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Registration Date</th>
                <th className="px-6 py-4">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500 text-sm"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-[#222] hover:bg-[#1a1a1a] transition"
                  >
                    {/* User Avatar + Name */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={user.avatar_url || "https://randomuser.me/api/portraits/men/1.jpg"}
                        alt={user.name.first}
                        className="w-10 h-10 rounded-full object-cover border border-primary"
                        onError={(e) => {
                          e.target.src = "https://randomuser.me/api/portraits/men/1.jpg";
                        }}
                      />
                      <div>
                        <p className="font-semibold text-white">
                          {user.name.first} {user.name.last}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: #{user._id.slice(-6)}
                        </p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm">
                      <div className="max-w-[200px] truncate" title={user.email}>
                        {user.email}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 capitalize">
                      <span className="px-3 py-1 rounded-full text-xs bg-[#222] border border-primary text-primary">
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {user.emailVerified ? (
                        <span className="text-green-400 font-medium text-sm">
                          Verified
                        </span>
                      ) : (
                        <span className="text-red-400 font-medium text-sm">
                          Unverified
                        </span>
                      )}
                    </td>

                    {/* Registration Date */}
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-white">
                          {formatDate(user.createdAt)}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(user.createdAt).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </td>

                    {/* Booking Stats */}
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <span className="text-primary font-bold">
                          {user.bookingStats?.total || 0}
                        </span>{" "}
                        bookings
                        {user.bookingStats?.completed > 0 && (
                          <div className="text-xs text-gray-400">
                            {user.bookingStats.completed} completed
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500 text-sm"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <p className="text-gray-400">
            Page <span className="text-primary">{page}</span> of{" "}
            <span className="text-primary">{totalPages}</span>
          </p>

          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 rounded-xl border ${page <= 1
                ? "border-[#222] text-gray-500 cursor-not-allowed"
                : "border-primary text-primary hover:bg-primary hover:text-black transition"
                }`}
            >
              Prev
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded-xl border ${page >= totalPages
                ? "border-[#222] text-gray-500 cursor-not-allowed"
                : "border-primary text-primary hover:bg-primary hover:text-black transition"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
