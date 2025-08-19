import React from 'react';
import devineHand from '../assets/devineHand.png';
import dumbell from '../assets/dumbell.png';
import leave from '../assets/leaf.png';
import heart from '../assets/heart.png';
import twoLeaves from '../assets/twoLeaves.png';
import cartWheel from '../assets/cartWheel.png';
import { FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

// Mock service data with real images from Unsplash
const services = [
  {
    title: 'Quick Reset',
    description: 'An express immersion for back, neck, and shoulders — melting tension inminutes, awakening the senses.',
    prices: ['45 mins – £65'],
    icon: devineHand,
    image: '/quick-reset.png'
  },
  {
    title: 'Deep Comfort Massage',
    description: 'Slow, precise, muscle-focused indulgence that releases knots,restores balance, and quiets the mind.',
    prices: ['60 mins – £85', '90 mins – £120', '120 mins – £155', '150 mins – £190'],
    icon: dumbell,
    image: '/deep-comfort.png'
  },
  {
    title: 'Jet Lag Reset',
    description: 'A circulation-boosting ritual that reduces swelling, reawakens energy,and leaves your body light and renewed',
    prices: ['60 mins – £95', '90 mins – £135', '120 mins – £175', '150 mins – £215'],
    icon: leave,
    image: '/jet-lag.png',
  },
  {
    title: 'The Executive Reset',
    description: 'Deep tissue meets refined pressure-point therapy — a focused revival for mental clarity and physical ease.',
    prices: ['60 mins – £105', '90 mins – £145', '120 mins – £185'],
    icon: heart,
    image: '/executive-reset.png'
  },
  {
    title: 'Couple’s Bespoke Escape',
    description: 'Two therapists in perfect synchrony — an intimate shared indulgence for private moments.',
    prices: ['60 mins – £180', '90 mins – £250', '120 mins – £320'],
    icon: twoLeaves,
    image: '/couples-massage.png'
  },
  {
    title: 'The Black Label Experience',
    description: 'Full-body indulgence with warm oil infusion and flowing strokes — the ultimate Noira signature.',
    prices: ['60 mins – £115', '90 mins – £155', '120 mins – £195'],
    icon: cartWheel,
    image: '/black-label.png'
  },
  // {
  //   title: 'The Black Label Experience',
  //   description: 'Full-body indulgence with warm oil infusion and flowing, luxurious strokes.',
  //   prices: ['90 mins – £200', '120 mins – £270', '150 mins – £340'],
  //   icon: devineHand,
  //   image: '/photo3.jpg'
  // },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Services = () => {
  // Assuming a context provider for theme is set up
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Dynamic classes for dark/light mode
  const sectionBg = isDarkMode ? 'bg-black text-white' : 'bg-gray-200/70 text-black';
  const descriptionText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const handleOnClick = () => {
    navigate('/servicespage');
  }

  return (
    <section
      className={`${sectionBg} py-16 px-4 sm:px-6 md:px-10 lg:px-20`}
      id="services"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-22"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl sm:text-4xl text-[#D59940] font-braven font-bold">
          Our <span className="">Services</span>
        </h2>
        <p className={`${descriptionText} mt-4 text-sm sm:text-base`}>
          Premium wellness treatments tailored to your needs
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`
              relative flex flex-col h-full 
              rounded-3xl transition-all duration-300
              shadow-xl overflow-hidden
              ${isDarkMode
                ? 'bg-gradient-to-br from-[#0c0c0c] to-[#1a1a1a] border border-gray-800'
                : 'bg-gray-100 border border-gray-300'
              }
              hover:shadow-2xl hover:shadow-[#C49E5B]/20 
              hover:-translate-y-2
            `}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: index * 0.15 }}
          >
            {/* Image section with gradient overlay */}
            <div className="relative w-full h-52">
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 transition-opacity duration-300"></div>
            </div>

            {/* Main content wrapper with padding */}
            <div className="p-8 flex-grow">
              {/* Icon and Title Section */}
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-[#f5e18c] via-[#e0a528] to-[#a66c00] p-3 rounded-full flex-shrink-0 ring-2 ring-offset-2 ring-offset-current ring-[#C49E5B]">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl sm:text-2xl text-[#D59940] font-braven font-semibold leading-none">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className={`${descriptionText} text-sm sm:text-base mb-6 flex-grow`}>
                {service.description}
              </p>

              <div>
                <button onClick={handleOnClick} className='bg-[#D59940] font-bold text-black rounded-full px-3 py-2'>

                  Request Prices</button>


              </div>

              {/* Prices List */}
              {/* <ul className="space-y-3"> */}
              {/* {service.prices.map((price, idx) => ( */}
              {/*   <li */}
              {/*     key={idx} */}
              {/*     className={`flex items-center text-sm font-braven text-gray-300`} */}
              {/*   > */}
              {/*     <FaArrowRight className="text-xs mr-2 text-yellow-500" /> */}
              {/*     <span className="text-yellow-500 font-bold mr-1">{price.split(' – ')[0]}</span> */}
              {/*     <span className="text-gray-400"> – </span> */}
              {/*     <span className="text-white font-bold ml-1">{price.split(' – ')[1]}</span> */}
              {/*   </li> */}
              {/* ))} */}
              {/* </ul> */}
            </div>
          </motion.div>
        ))}
      </div>
    </section >
  );
};

export default Services;
