import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import noira from "/noira.svg";
import { useTheme } from "../context/ThemeContext"; // adjust the path if needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav
      className={`z-99 fixed top-4 left-1/2 transform -translate-x-1/2 
px-4 sm:px-6 py-2 flex justify-between items-center 
backdrop-blur-md bg-opacity-40 shadow-lg rounded-full 
transition-all duration-300 
${isDarkMode ? "bg-[#111]/60 text-white" : "bg-white/60 text-black"} 
max-w-6xl w-[90%]`}
    >
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center h-10">
          <img src={noira} alt="Logo" className="h-20 sm:h-25" />
        </div>
      </Link>

      {/* Hamburger Icon - Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none"
      >
        {isOpen ? (
          <FaTimes className="text-[#95793e] w-6 h-6" />
        ) : (
          <FaBars className="text-[#95793e] w-6 h-6" />
        )}
      </button>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-6 text-sm items-center">
        <a href="/" className="hover:text-[#95793e] transition">
          Home
        </a>
        <a href="#services" className="hover:text-[#95793e] transition">
          Services
        </a>
        <a href="#therapists" className="hover:text-[#C49E5B] transition">
          Therapists
        </a>
        <Link
          to="/about"
          className="hover:text-yellow-400 transition"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>

        <Link
          to="/careers"
          className="hover:text-yellow-400 transition"
          onClick={() => setIsOpen(false)}
        >
          Careers
        </Link>

        <Link
          to="/careers"
          className="hover:text-yellow-400 transition"
          onClick={() => setIsOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </Link>
        <a
          href="#book"
          className="hidden bg-gradient-to-r from-[#f5e18c] via-[#e0a528] to-[#a66c00] hover:from-yellow-300 hover:to-yellow-500 text-black font-semibold px-4 py-2 rounded-full transition"
        >
          Book Now
        </a>

        {/* Theme Toggle Button */}
        {/* <button */}
        {/*   onClick={toggleTheme} */}
        {/*   className="ml-4 text-sm p-2 rounded-full border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition" */}
        {/*   title={`${isDarkMode ? "light" : "dark"} mode`} */}
        {/* > */}
        {/*   {isDarkMode ? <FaSun /> : <FaMoon />} */}
        {/* </button> */}
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div
          className={`absolute rounded-xl backdrop-blur-md bg-opacity-40 mt-5 top-14 left-0 w-full px-6 py-4 flex flex-col items-start gap-4 md:hidden transition-all duration-300 ${isDarkMode ? "bg-[#111] text-white" : "bg-white text-black"
            }`}
        >
          <a
            href="#services"
            className="hover:text-yellow-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Services
          </a>
          <a
            href="#therapists"
            className="hover:text-[#C49E5B] transition"
            onClick={() => setIsOpen(false)}
          >
            Therapists
          </a>
          <Link
            to="/about"
            className="hover:text-yellow-400 transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/careers"
            className="hover:text-yellow-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Careers
          </Link>
          <Link
            to="/careers"
            className="hover:text-yellow-400 transition"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span>Cart</span>
            </div>

          </Link>
          <a
            href="#book"
            className="bg-gradient-to-r from-[#f5e18c] via-[#e0a528] to-[#a66c00] hover:from-yellow-300 hover:to-yellow-500 text-black font-semibold px-4 py-2 rounded-full transition"
            onClick={() => setIsOpen(false)}
          >
            Book Now
          </a>

          {/* Theme Toggle - Mobile */}
          {/* <button */}
          {/*   onClick={toggleTheme} */}
          {/*   className="mt-2 flex items-center gap-2 text-sm px-3 py-1 border rounded-full border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition" */}
          {/* > */}
          {/*   {isDarkMode ? ( */}
          {/*     <> */}
          {/*       <FaSun /> Light Mode */}
          {/*     </> */}
          {/*   ) : ( */}
          {/*     <> */}
          {/*       <FaMoon /> Dark Mode */}
          {/*     </> */}
          {/*   )} */}
          {/* </button> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
