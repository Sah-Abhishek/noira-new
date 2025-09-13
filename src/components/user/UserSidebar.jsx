
import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "/noira.png";
import { Home, User, BookOpen, Settings } from "lucide-react";
import useUserStore from "../../store/UserStore";

const UserSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();
  const firstname = user.name.first;

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      path: "/user/dashboard",
    },
    {
      name: "Book Sessions",
      icon: <Home className="w-5 h-5" />,
      path: "/allservicespage",
    },
    {
      name: "Browse Therapists",
      icon: <Home className="w-5 h-5" />,
      path: "/browsetherapists",
    },
    {
      name: "Profile",
      icon: <User className="w-5 h-5" />,
      path: "/user/userprofile",
    },
    {
      name: "My Bookings",
      icon: <BookOpen className="w-5 h-5" />,
      path: "/user/mybookings",
    },
    // {
    //   name: "Settings",
    //   icon: <Settings className="w-5 h-5" />,
    //   path: "/user/settings",
    // },
  ];

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/userlogin');
  }

  return (
    <>
      {/* Desktop Sidebar */}
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
            {menuItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition
                    ${isActive
                      ? "bg-[#1a1a1a] text-white"
                      : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                    }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Profile */}
        <div className="px-6 py-4 flex items-center gap-4 border-t border-gray-800 ">
          {/* Profile Icon */}
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>

          {/* User Info */}
          <div className="flex flex-col text-white">
            <span className="text-sm font-semibold capitalize">
              {firstname
                ? firstname.charAt(0).toUpperCase() +
                firstname.slice(1).toLowerCase()
                : "User"}
            </span>
            <button onClick={handleLogOut} className="text-xs text-red-500 mt-1 hover:underline">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-gray-800 flex justify-around py-2 z-50">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center transition ${isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
            >
              {item.icon}
              <span className="text-[10px] mt-1">{item.name}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default UserSidebar;
