import React, { useEffect, useState } from "react";
import axios from "axios";
import TherapistTable from "./TherapistTable";
import { useNavigate } from "react-router-dom";
import { Check, Trash, Trash2 } from "lucide-react";

export default function TherapistManagement() {
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapists, setSelectedTherapists] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const apiUrl = import.meta.env.VITE_API_URL;

  const api = `${apiUrl}/therapist/getalltherapists`;
  const limit = 6;

  const fetchTherapists = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${api}?page=${page}&limit=${limit}&search=${search}&status=${statusFilter}`
      );
      setTherapists(res.data.therapists);
      setTotalPages(res.data.totalPages);
      setTotalCount(res.data.total);
    } catch (err) {
      console.error("Error fetching therapists:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapists(page);
  }, [page, search, statusFilter]);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalCount);

  // ✅ Bulk actions
  const handleBulkDelete = async () => {
    if (!window.confirm("Are you sure you want to delete selected therapists?")) return;
    try {
      await axios.post("http://35.178.94.142:3000/therapist/bulkDelete", {
        ids: selectedTherapists,
      });
      setSelectedTherapists([]);
      fetchTherapists(page);
    } catch (err) {
      console.error("Error deleting therapists:", err);
    }
  };

  const handleBulkStatusChange = async (status) => {
    try {
      await axios.post("http://35.178.94.142:3000/therapist/bulkUpdateStatus", {
        ids: selectedTherapists,
        status,
      });
      setSelectedTherapists([]);
      fetchTherapists(page);
    } catch (err) {
      console.error("Error updating therapists:", err);
    }
  };

  return (
    <div className="bg-black p-6 min-h-screen rounded-lg shadow-lg text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-primary font-bold">Therapist Management</h2>
        <button
          onClick={() => navigate("/admin/addnewtherapist")}
          className="bg-primary hover:bg-primary text-black font-semibold px-4 py-2 rounded"
        >
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

      {/* ✅ Bulk Actions Toolbar */}
      {selectedTherapists.length > 0 && (
        <div className="mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg flex justify-between items-center">
          <p className="text-sm text-gray-300">
            {selectedTherapists.length} selected
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleBulkDelete}
              className="bg-red-500 inline-flex items-center justify-center justify-center gap-x-1 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
            >
              <Trash size={15} />Delete
            </button>
            <button
              onClick={() => handleBulkStatusChange("active")}
              className="bg-green-500 inline-flex items-center justify-center hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
            >
              <Check size={15} /> Set Active
            </button>
            <button
              onClick={() => handleBulkStatusChange("inactive")}
              className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-3 py-1 rounded"
            >
              Set Inactive
            </button>
          </div>
        </div>
      )}

      {/* Loading + Table */}
      <div className="mt-4">
        <TherapistTable
          loading={loading}
          therapists={therapists}
          selectedTherapists={selectedTherapists}
          setSelectedTherapists={setSelectedTherapists}
        />
      </div>

      {/* Pagination + Counter */}
      <div className="flex justify-between items-center mt-6">
        {!loading && totalCount > 0 && (
          <p className="text-white text-sm">
            Showing <span className="text-primary font-bold">{startIndex}</span>–
            <span className="text-primary font-bold">{endIndex}</span> of{" "}
            <span className="text-primary font-bold">{totalCount}</span> therapists
          </p>
        )}
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
