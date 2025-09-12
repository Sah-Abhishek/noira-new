
import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AdminListPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const adminjwt = localStorage.getItem("adminjwt");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get(`${apiUrl}/admin/adminlist`, {
          headers: { Authorization: `Bearer ${adminjwt}` },
        });
        setAdmins(res.data.adminProfiles || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch admins");
      } finally {
        setLoading(false);
      }
    };

    if (adminjwt) {
      fetchAdmins();
    } else {
      setError("Admin not authenticated");
      setLoading(false);
    }
  }, [adminjwt]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-primary">
        <p className="animate-pulse">Loading admins...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (!admins.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-gray-400">
        <p>No admins found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] py-10 px-4 text-gray-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-8">Admin List</h1>
        <div className="grid gap-6 flex flex-col">
          {admins.map((admin) => {
            const fullName = `${admin.name?.first || ""} ${admin.name?.last || ""}`;
            return (
              <div
                key={admin._id}
                className="bg-[#111] flex flex-col rounded-2xl p-6 shadow-lg border border-gray-800 flex items-center gap-4 hover:shadow-xl transition"
              >
                {admin.avatar_url ? (
                  <img
                    src={admin.avatar_url}
                    alt={fullName}
                    className="w-16 h-16 rounded-full border-2 border-primary object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-primary bg-[#0d0d0d]">
                    <User size={28} className="text-gray-500" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-primary">{fullName}</h3>
                  <p className="text-gray-400 text-sm">{admin.email}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
