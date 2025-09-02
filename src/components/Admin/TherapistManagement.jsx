import React, { useEffect, useState } from "react";
import axios from "axios";
import TherapistTable from "./TherapistTable";

export default function TherapistManagement() {
  const [therapists, setTherapists] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // ✅ store total therapists
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const apiUrl = "http://35.178.94.142:3000/therapist/getalltherapists";
  const limit = 6;
  const fetchTherapists = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${apiUrl}?page=${page}&limit=${limit}&search=${search}&status=${statusFilter}`
      );
      setTherapists(res.data.therapists);
      setTotalPages(res.data.totalPages);
      setTotalCount(res.data.total); // ✅ FIXED
    } catch (err) {
      console.error("Error fetching therapists:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTherapists(page);
  }, [page, search, statusFilter]);

  // ✅ calculate range being shown
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalCount);

  return (
    <div className="bg-black p-6 min-h-screen rounded-lg shadow-lg text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-primary font-bold">Therapist Management</h2>
        <button className="bg-primary hover:bg-primary text-black font-semibold px-4 py-2 rounded">
          + Add New Therapist
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Loading + Table */}
      <div className="mt-4">
        <TherapistTable loading={loading} therapists={therapists} />
      </div>

      {/* Pagination + Counter */}
      <div className="flex justify-between items-center mt-6">
        {/* ✅ Showing count */}
        {!loading && totalCount > 0 && (
          <p className="text-white text-sm">
            Showing <span className="text-primary font-bold">{startIndex}</span>–
            <span className="text-primary font-bold">{endIndex}</span> of{" "}
            <span className="text-primary font-bold">{totalCount}</span> therapists
          </p>
        )}

        {/* Pagination buttons */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${page === i + 1
                ? "bg-primary text-black font-semibold"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
