import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "/noira.png";
import {
  BookOpen,
  Calendar,
  FileText,
  Home,
  MessageSquare,
  User,
} from "lucide-react";

const TherapistSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      path: "/therapist/therapistdashboard",
    },
    {
      name: "Schedule",
      icon: <Calendar className="w-5 h-5" />,
      path: "/therapist/therapistschedule",
    },
    {
      name: "Bookings",
      icon: <BookOpen className="w-5 h-5" />,
      path: "/therapist/bookings",
    },
    {
      name: "Feedback",
      icon: <MessageSquare className="w-5 h-5" />,
      path: "/therapist/feedback",
    },
    {
      name: "Training",
      icon: <FileText className="w-5 h-5" />,
      path: "/therapist/training",
    },
    {
      name: "Profile",
      icon: <User className="w-5 h-5" />,
      path: "/therapist/profile",
    },
  ];

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile + tablet) */}
      <div className="hidden lg:flex h-full w-64 bg-[#111111] text-white flex-col justify-between border-r border-gray-800">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 px-6 py-6">
            <Link to="/">
              <img src={logo} alt="Noira Logo" className="w-auto h-8" />
            </Link>
          </div>

          {/* Menu */}
          <nav className="flex flex-col mt-4">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition"
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Profile */}
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

      {/* Mobile & Tablet Bottom Nav (shown below lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-gray-800 flex justify-around py-2 z-50">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center text-gray-400 hover:text-white transition"
          >
            {item.icon}
            <span className="text-[10px] mt-1">{item.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default TherapistSidebar;
