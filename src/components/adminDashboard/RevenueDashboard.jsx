import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdCurrencyPound } from "react-icons/md";
import { FaUserMd, FaConciergeBell } from "react-icons/fa";

export default function RevenueDashboard() {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/admin/revenue`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  const toggleExpand = (key) => {
    setExpanded(expanded === key ? null : key);
  };

  return (
    <div className="p-4 bg-[#0d0d0d] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Revenue Dashboard</h1>

      {/* Overall Revenue */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {data.overallRevenue.map((item) => (
          <div
            key={item._id}
            className="bg-[#111] rounded-lg border border-gray-800 p-3 text-center hover:border-primary transition"
          >
            <MdCurrencyPound className="text-2xl text-primary mx-auto mb-1" />
            <h3 className="text-sm font-medium">Total Revenue</h3>
            <p className="text-xl font-bold">£{item.totalRevenue}</p>
            <p className="text-gray-400 text-xs">
              {item.totalBookings} bookings
            </p>
          </div>
        ))}
      </div>

      {/* Revenue by Therapist */}
      <div className="bg-[#111] rounded-lg border border-gray-800 p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Revenue by Therapist</h2>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#0d0d0d]">
          {data.revenueByTherapist.map((therapist, idx) => (
            <div
              key={therapist._id}
              onClick={() => toggleExpand(`therapist-${idx}`)}
              className="flex items-center justify-between bg-[#1a1a1a] rounded-md px-3 py-2 border border-gray-700 hover:border-primary cursor-pointer text-sm"
            >
              <div className="flex items-center gap-2">
                <FaUserMd className="text-primary" />
                <span className="font-medium">{therapist.therapistName}</span>
              </div>
              <div className="text-right">
                <p className="font-bold">£{therapist.totalRevenue}</p>
                {expanded === `therapist-${idx}` && (
                  <p className="text-xs text-gray-400">
                    {therapist.totalBookings} bookings
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue by Service */}
      <div className="bg-[#111] rounded-lg border border-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-3">Revenue by Service</h2>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#0d0d0d]">
          {data.revenueByService.map((service, idx) => (
            <div
              key={service._id}
              onClick={() => toggleExpand(`service-${idx}`)}
              className="flex items-center justify-between bg-[#1a1a1a] rounded-md px-3 py-2 border border-gray-700 hover:border-primary cursor-pointer text-sm"
            >
              <div className="flex items-center gap-2">
                <FaConciergeBell className="text-primary" />
                <span className="font-medium">{service.serviceName}</span>
              </div>
              <div className="text-right">
                <p className="font-bold">£{service.totalRevenue}</p>
                {expanded === `service-${idx}` && (
                  <p className="text-xs text-gray-400">
                    {service.totalBookings} bookings
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
