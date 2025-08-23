
import React from "react";
import { Home, Calendar, BookOpen, MessageSquare, FileText, User, } from "lucide-react";
import logo from "/noira.png"; // adjust path as per your setup
import { Navigate, useNavigate, Link } from "react-router-dom";

const TherapistSidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: '/therapist/therapistdashboard' },
    { name: "Schedule", icon: <Calendar className="w-5 h-5" />, path: '/therapist/therapistschedule' },
    { name: "Bookings", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Feedback", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Training", icon: <FileText className="w-5 h-5" /> },
    { name: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="h-full w-64 bg-[#111111] text-white flex flex-col justify-between border-r border-gray-800">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <Link to="/">
            <img src={logo} alt="Noira Logo" className="w-auto h-8" />
          </Link>
          {/* <h1 className="text-lg font-semibold">NOIRA</h1> */}
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col mt-4">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition 
              ${item.active ? "bg-[#1a1a1a] text-yellow-400" : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"}`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="px-6 py-4 flex items-center gap-3 border-t border-gray-800">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Sarah Johnson"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Sarah Johnson</span>
          <span className="text-xs text-gray-400">Massage Therapist</span>
          <button className="text-xs text-red-500 mt-1">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default TherapistSidebar;
