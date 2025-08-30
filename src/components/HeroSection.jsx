import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import noira from "/noira.png";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { isDarkMode } = useTheme();

  const overlayColor = isDarkMode ? 'bg-black/50' : 'bg-white/10';
  const textMain = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSub = isDarkMode ? 'text-gray-300' : 'text-gray-600';


  const navigate = useNavigate();


  const fadeInUp = {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0, transition: { duration: 2, ease: "easeOut" } },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/herovideo3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayColor} z-10`} />

      {/* Content */}
      <motion.div
        className={`relative z-20 flex flex-col items-center justify-center h-full text-center px-4 ${textMain}`}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        {/* Tagline */}
        <h1 className="text-lg sm:text-xl md:text-2xl text-[#C49E5B] font-braven font-semibold mb-2">
          <span className="text-2xl sm:text-4xl text-[#C49E5B]">#1</span> Luxury mobile massage brand in London and the UK
        </h1>

        {/* Logo */}
        <div className="my-6">
          <img src={noira} alt="Logo" className="h-20  sm:h-30 mb-8 sm:mb-10 sm:mt-5 mx-auto" />
        </div>

        {/* Subheading */}
        <h2 className="text-xl mb-10 sm:text-2xl md:text-4xl text-[#C49E5B] font-whisper font-semibold mb-4 px-2">
          Luxury Without Noise
        </h2>

        {/* Description */}
        <h3 className="text-lg sm:text-lg md:text-2xl text-[#C49E5B] font-whisper font-bold mb-8 px-4 max-w-[90%] sm:max-w-[80%]">
          The discreet indulgence London’s elite whisper about. By invitation only.
        </h3>

        {/* CTA Button */}
        <button onClick={() => navigate("/allservicespage")} className="bg-[#C49E5B] text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition">
          Request Black Label Access
        </button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
