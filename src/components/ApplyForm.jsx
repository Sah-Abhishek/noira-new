import React from "react";
import { useTheme } from "../context/ThemeContext"; // Adjust path if needed

const ApplyForm = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      id="apply"
      className={`px-4 py-16 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Heading */}
      <h2
        className={`text-center text-3xl md:text-4xl mb-4 transition-colors ${
          isDarkMode
            ? "text-[#C49E5B] hover:text-yellow-400"
            : "text-[#a66c00] hover:text-yellow-700"
        }`}
      >
        Apply Now
      </h2>
      <p className="text-center mb-10">
        Send your application to{" "}
        <a
          href="mailto:careers@noiralondon.com"
          className={`${
            isDarkMode
              ? "text-[#95793e] hover:underline"
              : "text-[#b38700] hover:underline"
          }`}
        >
          careers@noira.co.uk
        </a>
      </p>

      {/* Form Box */}
      {/* You can uncomment this if needed */}
      {/* 
      <div
        className={`max-w-xl mx-auto border p-6 md:p-10 rounded-[15px] ${
          isDarkMode
            ? "border-[#C49E5B]/20 bg-[#1a1a1a] text-white"
            : "border-[#a66c00]/20 bg-gray-100 text-black"
        }`}
      >
        <form className="space-y-6">
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              className={`w-full px-4 py-2 rounded outline-none border ${
                isDarkMode
                  ? "bg-[#1a1a1a] border-[#C49E5B]/20 text-white focus:border-yellow-400"
                  : "bg-white border-gray-300 text-black focus:border-yellow-700"
              }`}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Contact Number</label>
            <input
              type="tel"
              placeholder="Your contact"
              className={`w-full px-4 py-2 rounded outline-none border ${
                isDarkMode
                  ? "bg-[#1a1a1a] border-[#C49E5B]/20 text-white focus:border-yellow-400"
                  : "bg-white border-gray-300 text-black focus:border-yellow-700"
              }`}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">
              Experience & Certifications
            </label>
            <textarea
              rows="4"
              placeholder="Your experience or skills"
              className={`w-full px-4 py-2 rounded outline-none resize-none border ${
                isDarkMode
                  ? "bg-[#1a1a1a] border-[#C49E5B]/20 text-white focus:border-yellow-400"
                  : "bg-white border-gray-300 text-black focus:border-yellow-700"
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-medium rounded text-black 
              bg-gradient-to-r from-[#f5e18c] via-[#e0a528] to-[#a66c00]
              hover:from-yellow-300 hover:to-yellow-500 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
      */}
    </div>
  );
};

export default ApplyForm;
