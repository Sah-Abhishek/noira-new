import React from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Your Request",
    description:
      "You select your ritual, your setting, and your preferred time. Noira’s concierge confirms availability discreetly.",
    image: "/works.png",
  },
  {
    number: 2,
    title: "The Arrival",
    description:
      "Your therapist arrives — immaculate, poised, and carrying the Noira kit to transform your space.",
    image: "/theArrival.jpg",
  },
  {
    number: 3,
    title: "The Ritual",
    description:
      "From first touch to final breath, you’re immersed in a sensory journey — layered scents, warm oils, and quiet mastery.",
    image: "/consol.jpeg",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HowItWorks = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`py-16 px-4 transition-colors duration-500 bg-black`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl text-[#D59940] font-braven font-bold">
            How It Works
          </h2>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed text-gray-300">
            Simple steps to your perfect luxury massage experience
          </p>
          {/* <div className="w-24 h-1 mx-auto mt-8 rounded-full bg-[#C49E5B]"></div> */}
        </div>

        {/* Steps */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className={`w-full lg:w-[47%] ${steps.length % 2 !== 0 && index === steps.length - 1
                ? "lg:mx-auto"
                : ""
                } relative group overflow-hidden rounded-3xl shadow-xl transition-all duration-500
    hover:shadow-2xl hover:shadow-[#C49E5B]/20 hover:-translate-y-2 
    flex flex-col md:flex-row items-stretch min-h-[300px]
    ${isDarkMode
                  ? "bg-gradient-to-br from-[#0c0c0c] to-[#1a1a1a] border border-gray-800"
                  : "bg-white border border-gray-300"
                }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: index * 0.15 }}
            >
              {/* Image section with gradient overlay */}
              <div className="relative w-full md:w-1/2 h-[250px] md:h-full">
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4 md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-[#f5e18c] via-[#e0a528] to-[#a66c00] p-3 rounded-full flex-shrink-0 ring-2 ring-offset-2 ring-offset-current ring-[#C49E5B]">
                    <span className="text-xl font-bold text-black">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-whisper group-hover:brightness-110 transition-colors duration-300 text-[#C49E5B]">
                    {step.title}
                  </h3>
                </div>
                <p className="leading-relaxed group-hover:brightness-110 transition-colors duration-300 text-gray-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            className="group relative px-8 py-4 font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300
            bg-[#D59940] text-black shadow-[#C49E5B]/25 hover:shadow-[#C49E5B]/40"
          >
            <span className="relative z-10">Book Your Experience</span>
          </button>
        </div>
      </div>
    </div >
  );
};

export default HowItWorks;
