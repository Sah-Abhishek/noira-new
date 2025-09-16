import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { X } from "lucide-react"; // cleaner close icon
import photo1 from "/newimage3.jpeg";
import photo3 from "/newimage2.jpeg";
import photo2 from "/newimage1.jpeg";
import photo4 from "/newimage67.jpeg";
import photo5 from "/newimage68.jpeg";

const Galleryhome = () => {
  const { isDarkMode } = useTheme();

  const images = [
    { src: photo1, alt: "Image 1", size: "large" },
    { src: photo3, alt: "Image 2", size: "small" },
    { src: photo2, alt: "Image 3", size: "small" },
    { src: photo4, alt: "Image 4", size: "small" },
    { src: photo5, alt: "Image 5", size: "small" },
  ];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const openLightbox = (item) => {
    setActive(item);
    setOpen(true);
  };

  const closeLightbox = () => {
    setActive(null);
    setOpen(false);
  };

  return (
    <div
      className={`w-full px-4 sm:px-6 lg:px-10 py-8 transition-colors duration-300 ${isDarkMode ? "bg-[#111] text-white" : "bg-white text-black"
        }`}
    >
      {/* Grid */}
      <div
        className="
          grid grid-cols-2 gap-3 sm:gap-4
          sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          auto-rows-[10rem] sm:auto-rows-[12rem] md:auto-rows-[16rem] lg:auto-rows-[20rem]
          grid-flow-dense
        "
      >
        {images.map((item, idx) => (
          <motion.div
            key={idx}
            className="relative overflow-hidden rounded-xl shadow cursor-pointer"
            style={{
              gridColumn: item.size === "large" ? "span 2" : "span 1",
              gridRow: item.size === "large" ? "span 2" : "span 1",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            onClick={() => openLightbox(item)}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover block"
              draggable={false}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {open && active && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div
            className={`absolute inset-0 ${isDarkMode ? "bg-black/80" : "bg-gray-200/80"
              }`}
          />
          <motion.div
            className={`relative w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl ${isDarkMode ? "bg-black" : "bg-white"
              }`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <img
              src={active.src}
              alt={active.alt}
              className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            />
            <button
              onClick={closeLightbox}
              className={`absolute top-3 right-3 rounded-full p-2 shadow ${isDarkMode
                  ? "bg-white/90 text-black hover:bg-white"
                  : "bg-black/90 text-white hover:bg-black"
                }`}
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Galleryhome;
