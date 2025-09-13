import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import FancyDropdown from "../browseTherapist/FancyDropdown";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // raw input & debounced search term
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  // 🔹 Debounce effect for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // reset to first page on search
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler); // cleanup if user keeps typing
    };
  }, [searchInput]);

  // 🔹 Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/admin/users`, {
          params: { page, limit, search },
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
  }, [page, limit, search, apiUrl]);

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

        {/* Table */}
        <div className="bg-[#111] rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0d0d0d] text-primary text-sm uppercase">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Bookings</th>
                {/* <th className="px-6 py-4">Actions</th> */}
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
                        src={user.avatar_url}
                        alt={user.name.first}
                        className="w-10 h-10 rounded-full object-cover border border-primary"
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
                    <td className="px-6 py-4">{user.email}</td>

                    {/* Role */}
                    <td className="px-6 py-4 capitalize">
                      <span className="px-3 py-1 rounded-full text-xs bg-[#222] border border-primary text-primary">
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {user.emailVerified ? (
                        <span className="text-green-400 font-medium">
                          Verified
                        </span>
                      ) : (
                        <span className="text-red-400 font-medium">
                          Unverified
                        </span>
                      )}
                    </td>

                    {/* Booking Stats */}
                    <td className="px-6 py-4">
                      <span className="text-primary font-bold">
                        {user.bookingStats?.total || 0}
                      </span>{" "}
                      bookings
                    </td>

                    {/* <td className="px-6 py-4 flex gap-3 text-lg"> */}
                    {/*   <button className="text-primary hover:scale-110 transition"> */}
                    {/*     <FaUser /> */}
                    {/*   </button> */}
                    {/*   <button className="text-blue-400 hover:scale-110 transition"> */}
                    {/*     <FaEdit /> */}
                    {/*   </button> */}
                    {/*   <button className="text-red-500 hover:scale-110 transition"> */}
                    {/*     <FaTrash /> */}
                    {/*   </button> */}
                    {/* </td> */}
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
