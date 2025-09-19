import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, MapPin, Award } from "lucide-react";

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
          `${apiUrl}/therapist/getalltherapists?page=1&limit=3`
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
      <section className="py-20 bg-[#111] px-6 md:px-20 text-center">
        <p className="text-gray-400">Loading therapists...</p>
      </section>
    );
  }

  return (
    <section id="therapists" className="py-20 px-6 md:px-20 bg-[#111]">
      <div className="text-center mb-16">
        <h2 className="text-4xl text-primary font-braven font-bold">
          Featured <span className="text-primary">Therapists</span>
        </h2>
        <p className="mt-4 text-gray-400">
          Meet our certified wellness professionals
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-10">
        {therapists.map((therapist) => {
          const fullName =
            therapist?.profile?.title ||
            `${therapist.name?.first || ""} ${therapist.name?.last || ""}`;
          const username = therapist?.username || "therapist";
          const therapistId = therapist?.therapistId || "N/A";
          const rating = therapist.profile?.rating || 0;
          const sessions = therapist.profile?.sessions || 0;
          const experience = therapist.profile?.experience || 0;
          const specializations = therapist.profile?.specializations || [];
          const image = therapist.avatar_url;
          const location = therapist.address
            ? `${therapist.address.PostTown || ""}, ${therapist.address.PostalCode || ""
            }`
            : "Location not available";
          const coverageAreas = therapist?.coverageAreas || [];

          return (
            <div key={therapist._id} className="relative">
              {/* Card */}
              <div className="relative bg-[#1a1a1a] rounded-2xl p-8 border shadow-lg shadow-yellow-400 border-primary shadow-lg transition-all duration-300">
                <div className="relative z-10 text-center space-y-5">
                  {/* Profile Image */}
                  <div className="relative inline-block">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary mx-auto">
                      {image ? (
                        <img
                          src={image}
                          alt={fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-primary text-lg font-bold">
                          {fullName.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name & ID */}
                  <div>
                    <h3 className="text-xl font-bold text-white">{fullName}</h3>
                    <p className="text-primary/80 text-sm">
                      {/* @{username} */}
                    </p>
                  </div>

                  {/* Rating + Sessions */}
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${rating >= i + 1
                            ? "fill-primary"
                            : "fill-gray-600"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      {rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      | {sessions} sessions
                    </span>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    <h4 className="w-full text-white font-semibold">
                      Specializations
                    </h4>
                    {specializations.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-black shadow"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Location */}
                  <div className="flex flex-col mt-10 mr-15 items-start gap-1 text-gray-400 text-sm mt-3 text-left">
                    {/* Address lines */}
                    {therapist.address ? (
                      <>
                        {[
                          [therapist.address?.building_No, therapist.address?.Street].filter(Boolean).join(", "),
                          [therapist.address?.Locality, therapist.address?.PostTown].filter(Boolean).join(", "),
                          therapist.address?.PostalCode,
                        ]
                          .filter(Boolean)
                          .map((line, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-primary mt-0.5" />
                              <span>{line}</span>
                            </div>
                          ))}
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>Location not available</span>
                      </div>
                    )}

                    {/* Coverage Areas */}
                    {coverageAreas.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        {coverageAreas.join(" • ")}
                      </p>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-white mt-3 text-left">
                    <Award className="w-4 h-4 text-primary" />
                    <span>{experience}+ Years Experience</span>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigate("/browsetherapists")}
                    className="w-full py-3 rounded-xl bg-primary text-black font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 mt-6"
                  >
                    Select Therapist
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedTherapists;
