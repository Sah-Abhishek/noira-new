import { MdEmail, MdAccessTime, MdLocationOn } from 'react-icons/md';
import { useTheme } from '../context/ThemeContext'; // Adjust the path if necessary

const ContactUs = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="contact"
      className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
        } py-16 px-4 text-center`}
    >
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-2">Contact Us</h2>
      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C49E5B] to-transparent mx-auto mb-8" />

      {/* Contact Card */}
      <div

        className={`max-w-3xl mx-auto p-8 rounded-xl border ${isDarkMode
          ? 'bg-[#1a1a1a] border-[#C49E5B]'
          : 'bg-gray-100 border-yellow-600'
          } space-y-8`}
      >
        {/* Description */}
        <p
          className={`text-sm md:text-base ${isDarkMode ? 'text-[#dddddd]' : 'text-gray-700'
            }`}
        >
          We're here to bring luxury wellness to you, anytime you need it.
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Email */}
          <div className="flex flex-col items-center">

            <div className="bg-[#C49E5B] rounded-full p-3 mb-2">
              <MdEmail className="text-black  text-2xl" />
            </div>
            <p className="font-semibold text-[#C49E5B]">Email</p>
            <p
              className={`text-sm ${isDarkMode ? 'text-[#ccc]' : 'text-gray-600'
                }`}
            >
              info@noira.co.uk
            </p>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center">

            <div className="bg-[#C49E5B] rounded-full p-3 mb-2">
              <MdLocationOn className="text-black text-2xl" />
            </div>
            <p className="font-semibold text-[#C49E5B]">Service Areas</p>
            <p
              className={`text-sm ${isDarkMode ? 'text-[#ccc]' : 'text-gray-600'
                }`}
            >
              London & surrounding
              <br />
              boroughs
            </p>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">

            <div className="bg-[#C49E5B] rounded-full p-3 mb-2">
              <MdAccessTime className="text-black text-2xl" />
            </div>
            <p className="font-semibold text-[#C49E5B]">Hours</p>
            <p
              className={`text-sm ${isDarkMode ? 'text-[#ccc]' : 'text-gray-600'
                }`}
            >
              7:00 AM – 2:00 AM
            </p>
          </div>
        </div>

        {/* Button */}
        <button className="hidden bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold px-6 py-2 rounded-full hover:opacity-90 transition">
          Book Your Session
        </button>
      </div>
    </section>
  );
};

export default ContactUs;
