
// src/layouts/TherapistLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import TherapistSidebar from "../components/therapistDashboard/TherapistSidebar.jsx"; // your sidebar

const TherapistLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar (fixed width) */}
      <div className="w-64 h-full">
        <TherapistSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#111111] overflow-y-auto ">
        <Outlet /> {/* This renders the nested route's component */}
      </div>
    </div>
  );
};

export default TherapistLayout;
