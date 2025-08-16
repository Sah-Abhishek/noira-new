import React from "react";
import { FaCrown, FaStar, FaGlobeEurope, FaCheck } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // adjust path if needed

const CareerHighlights = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`w-full transition-all duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>
      {/* Why Choose Section */}
      <div className={`px-4 sm:px-6 md:px-16 py-12 sm:py-16 ${isDarkMode ? "bg-black" : "bg-white"}`}>
        <h2 className={`text-center text-3xl md:text-4xl sm:text-3xl mb-10 sm:mb-12`}>
          Why Choose{" "}
          <span className={`rounded-2xl px-4 py-2 ${
            isDarkMode ? "text-[#C49E5B] bg-amber-500/10" : "text-yellow-700 bg-yellow-100"
          }`}>
            NOIRA?
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: <FaCrown />,
              title: "Highest Industry Pay",
              text: "Earn £700–£1000/week as a top performer"
            },
            {
              icon: <FaStar />,
              title: "VIP Clientele",
              text: "Work with celebrities and elite professionals"
            },
            {
              icon: <FaGlobeEurope />,
              title: "Global Opportunities",
              text: "Expansion to Dubai and Europe"
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded transition-shadow duration-300 border ${
                isDarkMode
                  ? "border-[#C49E5B]/20 hover:shadow-yellow-200/10"
                  : "border-yellow-600/10 hover:shadow-lg"
              }`}
            >
              <div
                className={`text-3xl mb-4 ${
                  isDarkMode ? "text-[#C49E5B]" : "text-yellow-700"
                }`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Who We're Looking For */}
      <div className={`px-4 sm:px-6 md:px-16 py-12 sm:py-16 ${
        isDarkMode ? "bg-[#1f1f1f]" : "bg-gray-100"
      }`}>
        <h2 className={`text-center text-3xl sm:text-4xl md:text-4xl mb-10 sm:mb-12 ${
          isDarkMode ? "text-[#C49E5B]" : "text-yellow-700"
        }`}>
          Who We're Looking For
        </h2>

        <div className="flex flex-col-reverse md:flex-row gap-10 items-center relative overflow-visible">
          {/* Checklist */}
          <ul className={`flex-1 space-y-4 text-sm sm:text-base ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            {[
              "Female therapists skilled in Swedish, Deep Tissue, and Aromatherapy",
              "Well-groomed, discreet, and professional appearance",
              "Fluent English (additional languages are a plus)",
              "Based in London with right to work in the UK"
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <FaCheck className={`text-xl mt-1 flex-shrink-0 ${
                  isDarkMode ? "text-[#C49E5B]" : "text-yellow-700"
                }`} />
                <span className="text-xl">{text}</span>
              </li>
            ))}
          </ul>

          {/* Image with cards */}
          <div className="relative flex-1 w-full flex justify-center items-center min-h-[400px]">
            {/* Left Card */}
            <div className={`absolute -left-16 sm:left-38 top-10 sm:top-14 w-32 sm:w-44 h-64 sm:h-82 rounded-xl shadow-2xl z-0 ${
              isDarkMode ? "bg-[#353030] border-white/10 opacity-70" : "bg-gray-300 border-gray-200"
            }`} />

            {/* Right Card */}
            <div className={`absolute -right-16 sm:right-38 top-10 sm:top-14 w-32 sm:w-44 h-64 sm:h-82 rounded-xl shadow-2xl z-0 ${
              isDarkMode ? "bg-[#453c3c] border-yellow-500/10 opacity-70" : "bg-yellow-100 border-yellow-300"
            }`} />

            {/* Main Image */}
            <img
              src="https://imgs.search.brave.com/o89-CXJ-kdvIXXRSLUDyHtxORiw1WJNg6G6TBfy1ZH4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LXdv/bWFuLXdvcmtpbmct/c3BhXzIzLTIxNTA5/MTE3NjQuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZA"
              alt="Therapist"
              className="relative z-10 rounded-lg object-cover w-[250px] sm:w-[300px] h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHighlights;
