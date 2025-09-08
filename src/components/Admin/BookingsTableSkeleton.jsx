
import React from "react";

export default function BookingsTableSkeleton({ rows = 6 }) {
  return (
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
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr
              key={i}
              className="border-t border-[#222] animate-pulse hover:bg-[#111]"
            >
              {Array.from({ length: 9 }).map((__, j) => (
                <td key={j} className="py-3 px-4">
                  <div className="h-4 w-24 bg-gray-700/40 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
