import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Adjust the path if needed

const CtaSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`py-20 px-6 md:px-20 flex justify-center items-center ${
        isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div
        className={`rounded-2xl px-10 py-12 w-full max-w-5xl text-center shadow-lg border ${
          isDarkMode
            ? 'bg-[#1a1a1a] border-white/10'
            : 'bg-gray-100 border-black/10'
        }`}
      >
        {/* Heading */}
        <div className="relative inline-block">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Ready to Transform Your{' '}
            <span className="text-[#C49E5B]">Wellness Journey ?</span>
          </h2>
        </div>

        {/* Description */}
        <p
          className={`mt-6 text-sm md:text-base ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Book your premium therapy session today and experience luxury wellness
          at your doorstep
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
          <a
            href="#book"
            className="bg-gradient-to-r from-[#f5e18c] via-[#e0a528] to-[#a66c00] text-black font-semibold px-6 py-3 rounded-full shadow hover:opacity-90 transition"
          >
            Book Therapy Near You
          </a>
          <a
            href="#services"
            className={`font-semibold px-6 py-3 rounded-full border transition ${
              isDarkMode
                ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-black'
                : 'border-yellow-700 text-yellow-700 hover:bg-yellow-600 hover:text-white'
            }`}
          >
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
