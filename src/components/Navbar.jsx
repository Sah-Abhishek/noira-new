import React, { useState } from "react";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import noira from "/noira.svg";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Mock theme state
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const navigate = useNavigate();

  const userEmail = null; // Mock user state

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLinkClick = (href) => {
    navigate('/adminlogin')
    setIsOpen(false);
  };

  return (
    <nav
      className={`z-50 fixed top-4 left-1/2 transform -translate-x-1/2 
        px-3 sm:px-4 md:px-6 py-2 flex justify-between items-center 
        backdrop-blur-md bg-opacity-40 shadow-lg rounded-full 
        transition-all duration-300 
        ${isDarkMode ? "bg-[#111]/60 text-white" : "bg-white/60 text-black"} 
        max-w-6xl w-[95%] sm:w-[90%]`}
    >
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center h-10">
          <img src={noira} alt="Logo" className="h-20 sm:h-25" />
        </div>
      </Link>

      {/* Hamburger Icon - Mobile & Tablet */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden focus:outline-none z-50 relative"
      >
        {isOpen ? (
          <X className="text-[#95793e] w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Menu className="text-[#95793e] w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>

      {/* Desktop Nav - Only visible on XL screens */}
      <div className="hidden xl:flex gap-6 text-sm items-center">
        <button onClick={() => handleLinkClick('/')} className="hover:text-[#95793e] transition">
          Home
        </button>
        <button onClick={() => handleLinkClick('#services')} className="hover:text-[#95793e] transition">
          Services
        </button>
        <button onClick={() => handleLinkClick('#therapists')} className="hover:text-[#C49E5B] transition">
          Therapists
        </button>
        <button
          onClick={() => handleLinkClick('/about')}
          className="hover:text-primary transition"
        >
          About
        </button>
        <button
          onClick={() => handleLinkClick('/careers')}
          className="hover:text-primary transition"
        >
          Careers
        </button>
        <button
          onClick={() => handleLinkClick('/cart')}
          className="hover:text-priamry transition"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>

        {!userEmail && (
          <div className="relative group">
            <div className="inline-flex items-center px-3 py-2 rounded-full text-black font-medium bg-primary cursor-pointer">
              Login
              <ChevronDown className="w-4 h-4 ml-1" />
            </div>

            {/* Dropdown menu */}
            <div className="absolute right-0 z-50 w-40 hidden group-hover:flex flex-col bg-white dark:bg-[#222] shadow-lg rounded-md overflow-hidden text-sm border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleLinkClick('/adminlogin')}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition text-left"
              >
                Therapist
              </button>
              <button
                onClick={() => handleLinkClick('/adminlogin')}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition text-left"
              >
                Admin
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile & Tablet Nav Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm xl:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Content */}
          <div
            className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md
              rounded-2xl backdrop-blur-md bg-opacity-95 shadow-xl
              px-6 py-6 flex flex-col gap-4 xl:hidden transition-all duration-300 z-50
              ${isDarkMode ? "bg-[#111] text-white border border-white/10" : "bg-white text-black border border-black/10"}`}
          >
            {/* Navigation Links */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleLinkClick('/')}
                className="text-base font-medium hover:text-primary transition px-2 py-1 text-left"
              >
                Home
              </button>
              <button
                onClick={() => handleLinkClick('#services')}
                className="text-base font-medium hover:text-primary transition px-2 py-1 text-left"
              >
                Services
              </button>
              <button
                onClick={() => handleLinkClick('#therapists')}
                className="text-base font-medium hover:text-[#C49E5B] transition px-2 py-1 text-left"
              >
                Therapists
              </button>
              <button
                onClick={() => handleLinkClick('/about')}
                className="text-base font-medium hover:text-primary transition px-2 py-1 text-left"
              >
                About
              </button>
              <button
                onClick={() => handleLinkClick('/careers')}
                className="text-base font-medium hover:text-primary transition px-2 py-1 text-left"
              >
                Careers
              </button>
              <button
                onClick={() => handleLinkClick('/cart')}
                className="text-base font-medium hover:text-primary transition px-2 py-1 flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Cart</span>
              </button>
            </div>

            {/* Divider */}
            <div className={`border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"} my-2`} />

            {/* Login Section */}
            {!userEmail && (
              <div className="w-full">
                <button
                  onClick={() => setMobileLoginOpen(!mobileLoginOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-primary text-black font-medium hover:from-yellow-300 hover:to-yellow-400 transition"
                >
                  Login
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${mobileLoginOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </button>

                {/* Login Dropdown */}
                {mobileLoginOpen && (
                  <div className="mt-3 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        handleLinkClick('/adminlogin');
                        setMobileLoginOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg font-medium transition text-center
                        ${isDarkMode
                          ? "bg-gray-800 hover:bg-gray-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-black"
                        }`}
                    >
                      Therapist Login
                    </button>
                    <button
                      onClick={() => {
                        handleLinkClick('/adminlogin');
                        setMobileLoginOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg font-medium transition text-center
                        ${isDarkMode
                          ? "bg-gray-800 hover:bg-gray-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-black"
                        }`}
                    >
                      Admin Login
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Theme Toggle (Optional) */}
            {/* <button */}
            {/*   onClick={toggleTheme} */}
            {/*   className={`w-full px-4 py-2 rounded-lg transition text-sm font-medium */}
            {/*     ${isDarkMode */}
            {/*       ? "bg-gray-800 hover:bg-gray-700 text-gray-300" */}
            {/*       : "bg-gray-100 hover:bg-gray-200 text-gray-700" */}
            {/*     }`} */}
            {/* > */}
            {/*   Switch to {isDarkMode ? 'Light' : 'Dark'} Mode */}
            {/* </button> */}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
