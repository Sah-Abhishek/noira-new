import React from "react";
import { FaCrown, FaGem, FaStar } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // adjust path if needed

const Careerfooter = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`text-center py-10 transition-all duration-300 ${
        isDarkMode ? "bg-[#1a1a1a] text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-xl mx-auto">
        <h3
          className={`text-2xl mb-2 ${
            isDarkMode ? "text-[#C49E5B]" : "text-yellow-700"
          }`}
        >
          NOIRA
        </h3>
        <p
          className={`text-md mb-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Luxury Without Noise.
        </p>
        <div
          className={`flex items-center justify-center text-[2rem] gap-8 ${
            isDarkMode ? "text-[#C49E5B]" : "text-yellow-600"
          }`}
        >
          <FaCrown />
          <span className="justify-center">.</span>
          <FaGem />
          <span>.</span>
          <FaStar />
        </div>
      </div>
    </footer>
  );
};

export default Careerfooter;
