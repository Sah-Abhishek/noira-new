
import React from "react";
import { FaBell } from "react-icons/fa";

export default function AdminHeaderComponent() {
  const adminName = localStorage.getItem("firstname");
  return (
    <div className="flex items-center justify-between bg-[#111] px-6 py-4 border-b border-gray-800">
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-semibold text-primary">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-400">Manage your wellness platform</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        <FaBell className="text-primary text-lg" />
        <div className="text-sm">
          <span className="text-gray-300">Welcome back, </span>
          <span className="text-primary font-medium">{adminName} Admin</span>
        </div>
      </div>
    </div>
  );
}
