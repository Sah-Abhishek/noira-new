// src/pages/AllServices.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSpa,
  FaHeartbeat,
  FaLeaf,
  FaYinYang,
  FaUserMd,
  FaHandsHelping,
  FaPhone,
  FaComments,
  FaQuestionCircle,
} from "react-icons/fa";
import Footer from "../components/FooterSection";

const icons = [FaSpa, FaUserMd, FaLeaf, FaYinYang, FaHandsHelping, FaHeartbeat];

export default function AllServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const authToken = localStorage.getItem("userjwt");
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchServices = async () => {
    console.log("This is the authToken: ", authToken);
    try {
      const response = await axios.get(`${apiUrl}/services/list`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setServices(response.data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Skeleton Component
  const ServiceSkeleton = () => (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg animate-pulse">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-700" />
      </div>
      <div className="h-5 bg-gray-700 rounded w-3/4 mx-auto mb-3"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto mb-4"></div>
      <div className="h-5 bg-gray-700 rounded w-1/2 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/3 mx-auto"></div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen pt-25 bg-gradient-to-b from-gray-900 to-black text-white px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">
            Book Your <span className="text-primary">Therapy</span> Session
          </h1>
          <p className="text-gray-400 mt-3">
            Follow these simple steps to schedule your premium wellness experience
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {loading
            ? // Show Skeletons
            Array.from({ length: 6 }).map((_, idx) => (
              <ServiceSkeleton key={idx} />
            ))
            : // Show Real Services
            services.map((service, idx) => {
              const Icon = icons[idx % icons.length];
              const prices = service.options.map((o) => o.price.amount);
              const durations = service.options.map((o) => o.durationMinutes);

              const minPrice = Math.min(...prices);
              const maxPrice = Math.max(...prices);

              const minDuration = Math.min(...durations);
              const maxDuration = Math.max(...durations);

              return (
                <div
                  key={service._id}
                  className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-yellow-500/20 transition"
                >
                  <div className="flex items-center justify-center mb-4">
                    <Icon className="text-primary text-4xl" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <p className="text-gray-400 mt-2 text-sm">{service.description}</p>

                  <div className="mt-4 text-primary font-bold">
                    ${minPrice} - ${maxPrice}
                  </div>
                  <p className="text-gray-400 text-sm">
                    {minDuration} - {maxDuration} minutes
                  </p>

                  {/* Features */}
                  {service.features?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {service.features.map((f, i) => (
                        <span
                          key={i}
                          className="bg-gray-800 text-xs px-3 py-1 rounded-full text-gray-300"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Continue Button */}
        {!loading && (
          <div className="text-center mt-12">
            <button className="bg-primary hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition">
              Continue to Select Therapist →
            </button>
          </div>
        )}

        {/* Help Section */}
        {!loading && (
          <div className="max-w-4xl mx-auto mt-16 bg-gray-900 rounded-2xl p-8 shadow-lg">
            <h2 className="text-center text-xl font-semibold mb-8">
              Need Help Choosing?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {/* Call */}
              <div>
                <div className="flex justify-center mb-4">
                  <FaPhone className="text-primary text-3xl" />
                </div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-gray-400 text-sm">
                  Speak with our wellness experts
                </p>
                <p className="text-primary font-medium mt-2">
                  +44 7350 700055
                </p>
              </div>

              {/* Live Chat */}
              <div>
                <div className="flex justify-center mb-4">
                  <FaComments className="text-primary text-3xl" />
                </div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-gray-400 text-sm">
                  Get instant recommendations
                </p>
                <p className="text-primary font-medium mt-2 cursor-pointer">
                  Start Chat
                </p>
              </div>

              {/* FAQ */}
              <div>
                <div className="flex justify-center mb-4">
                  <FaQuestionCircle className="text-primary text-3xl" />
                </div>
                <h3 className="font-semibold">FAQ</h3>
                <p className="text-gray-400 text-sm">
                  Find answers to common questions
                </p>
                <p className="text-primary font-medium mt-2 cursor-pointer">
                  View FAQ
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
