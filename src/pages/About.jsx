import React from 'react';
import ContactUs from "../components/ContactUs";
import FooterSection from '../components/FooterSection';
import { useTheme } from '../context/ThemeContext'; // Ensure correct path

const AboutPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="about"
      className={`pt-16 px-4 text-center transition-colors duration-300 
        ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-2">About Us</h2>
      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C49E5B] to-transparent mx-auto mb-8" />

      {/* Content Box */}
      <div
        className={`max-w-3xl mx-auto p-8 rounded-xl border 
          ${isDarkMode 
            ? 'bg-[#1a1a1a] border-[#C49E5B]' 
            : 'bg-gray-100 border-[#C49E5B]'}`}
      >
        <p
          className={`text-sm md:text-base mb-6 leading-relaxed 
            ${isDarkMode ? 'text-[#dddddd]' : 'text-gray-700'}`}
        >
          Noira is London&apos;s premier luxury mobile massage service, designed for clients who seek relaxation without compromise.
          Our team of highly skilled, handpicked therapists brings a bespoke spa experience directly to your doorstep—
          whether it&apos;s your home, hotel suite, or private event.
        </p>

        <p
          className={`text-sm md:text-base mb-6 leading-relaxed 
            ${isDarkMode ? 'text-[#dddddd]' : 'text-gray-700'}`}
        >
          We combine the art of professional touch with a discreet, elite service tailored to your lifestyle.
          At Noira, we believe wellness is not just a routine, it&apos;s a ritual of elegance, privacy, and indulgence.
        </p>

        <p className="italic font-semibold text-[#C49E5B] text-lg">
          Luxury without noise.
        </p>
      </div>

      <ContactUs />
      <FooterSection />
    </section>
  );
};

export default AboutPage;
