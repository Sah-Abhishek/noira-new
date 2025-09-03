import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FeaturedTherapists = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/therapist/getalltherapists?page=1&limit=4`
        );
        if (res.data?.therapists) {
          setTherapists(res.data.therapists);
        } else {
          console.error("Unexpected API response:", res.data);
        }
      } catch (err) {
        console.error("Error fetching therapists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-black px-6 md:px-20 text-center">
        <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
          Loading therapists...
        </p>
      </section>
    );
  }

  return (
    <section
      id="therapists"
      className={`py-20 px-6 md: px-20 scroll-mt-24 ${isDarkMode
        ? "bg-gradient-to-l from-[#0f1118] to-black text-white"
        : "bg-gradient-to-l from-[#f9f9f9] to-white text-black"
        }`}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl text-[#C49E5B] font-braven font-bold">
          Featured <span className="text-[#C49E5B]">Therapists</span>
        </h2>
        <p
          className={`mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          Meet our certified wellness professionals
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {therapists.map((therapist) => {
          const fullName = `${therapist.name.first} ${therapist.name.last}`;
          const title = therapist.profile?.bio || "Therapist";
          const rating = therapist.profile?.rating || 0;
          const specializations = therapist.profile?.specializations || [];
          const image = therapist.avatar_url;

          return (
            <div
              key={therapist._id}
              className={`rounded-2xl p-6 text-center shadow-md border ${isDarkMode ? "bg-[#1a1c23] border-white/10" : "bg-white border-black/10"
                }`}
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full border border-yellow-400 overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt={fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-transparent flex items-center justify-center text-[#C49E5B]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.375a.375.375 0 01-.375.375H4.875a.375.375 0 01-.375-.375V20.25z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Name & Title */}
              <h3 className="text-lg font-semibold">{fullName}</h3>
              <p className="text-[#C49E5B] text-sm mt-1">{title}</p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex text-[#C49E5B]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${rating >= i + 1
                        ? "fill-yellow-400"
                        : isDarkMode
                          ? "fill-gray-600"
                          : "fill-gray-300"
                        }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.431L24 9.587l-6 5.841 1.417 8.249L12 18.896 4.583 23.677 6 15.428 0 9.587l8.332-1.569z" />
                    </svg>
                  ))}
                </div>
                <span
                  className={`text - sm ${isDarkMode ? "text-gray-300" : "text-gray-600"
                    } `}
                >
                  {rating.toFixed(1)}
                </span>
              </div>

              {/* Tags (Specializations) */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {specializations.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? "bg-[#2b2d35] text-[#C49E5B]" : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => navigate("/browsetherapists")}
                className="mt-6 bg-[#D59940] w-full text-black font-semibold px-6 py-2 rounded-full shadow-lg shadow-[#C49E5B]/25 hover:shadow-[#C49E5B]/40 transform hover:scale-105 transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedTherapists;
