import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCrown,
  FaHands,
  FaBriefcase,
  FaHeart,
  FaPlane,
} from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import useBookingStore from "../store/bookingStore";
import { useLocation, useNavigate } from "react-router-dom";

export default function AllServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { cart, setCart } = useBookingStore();
  const navigate = useNavigate();
  const location = useLocation();

  const authToken = localStorage.getItem("userjwt");
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${apiUrl}/services/list`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (Array.isArray(response.data)) {
        setServices(response.data);
      } else if (response.data.success) {
        setServices(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const icons = [
    FaClockRotateLeft,
    FaCrown,
    FaHands,
    FaBriefcase,
    FaHeart,
    FaPlane,
  ];
  const bgImages = [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
  ];

  const handleSelect = (service, option) => {
    // only allow one service in cart
    setSelectedOptions({ [service._id]: option });
    setCart({
      serviceId: service._id,
      serviceName: service.name,
      ...option,
      id: option._id,
    });
  };

  const handleContinue = () => {
    if (!cart) return;
    // 🚀 navigate to next step (Date & Time page)
    console.log("Proceed with booking:", cart);
  };

  const ServiceSkeleton = () => (
    <div className="service-card rounded-3xl overflow-hidden gold-foil p-8 animate-pulse h-64"></div>
  );

  return (
    <div className="bg-noira-black text-noira-ivory min-h-screen p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 mt-20">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-noira-gold">
            Massage Menu
          </h1>
          <h2 className="text-center text-lg">Luxury Made Accessible</h2>
          <p className="text-gray-300 text-xl font-light">
            Choose from our premium wellness treatments
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <ServiceSkeleton key={i} />
            ))
            : services.map((service, idx) => {
              const Icon = icons[idx % icons.length];
              const bg = bgImages[idx % bgImages.length];
              const selectedOpt = selectedOptions[service._id];

              return (
                <div
                  key={service._id}
                  className={`service-card mb-30 rounded-3xl overflow-hidden gold-foil group cursor-pointer ${cart?.serviceId === service._id
                    ? "ring-2 ring-noira-gold"
                    : ""
                    }`}
                  style={{ backgroundImage: `url(${bg})` }}
                >
                  <div className="specular-sweep"></div>
                  <div className="texture-grain absolute inset-0 z-1"></div>

                  <div className="glass-panel rounded-3xl p-6 m-4 h-[calc(100%-2rem)] relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 bg-noira-gold/10 rounded-2xl backdrop-blur-sm">
                        <Icon className="text-noira-gold text-2xl" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="price-display bg-gradient-to-r from-noira-gold to-noira-gold-light text-noira-black px-3 py-1 rounded-full text-xs font-bold opacity-80">
                          {selectedOpt
                            ? `£${selectedOpt.price.amount}`
                            : "£0"}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold mb-3 text-noira-ivory">
                      {service.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Options */}
                    <div className="mb-6">
                      <h4 className="text-noira-gold text-xs font-medium mb-3 uppercase tracking-wider">
                        {authToken ? "Select Duration" : "Pricing"}
                      </h4>

                      {authToken ? (
                        <div className="flex flex-wrap gap-2">
                          {service.options.map((opt) => {
                            const isActive = selectedOpt?._id === opt._id;
                            return (
                              <button
                                key={opt._id}
                                onClick={() => handleSelect(service, opt)}
                                className={`duration-chip px-4 py-2 rounded-full text-xs text-noira-gold transition-all ${isActive ? "selected" : ""
                                  }`}
                              >
                                {opt.durationMinutes} min • £{opt.price.amount}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <button
                          onClick={() => navigate("/userlogin", { state: { from: location } })}
                          className="px-4 py-2 rounded-full text-xs font-semibold bg-noira-gold text-black hover:opacity-90 transition"
                        >
                          Login to see prices
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-noira-gold/20">
                      <div className="flex items-center text-gray-400 text-xs">
                        <span className="selected-duration">
                          {selectedOpt
                            ? `${selectedOpt.durationMinutes} min selected`
                            : "Select duration"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Sticky Cart Summary */}
        {Object.keys(selectedOptions).length > 0 && (

          <div
            className={`fixed bottom-0 left-0 w-full bg-black border-t border-primary/30 px-60 py-10 flex items-center justify-between z-50
    transform transition-all duration-500 ease-in-out
    ${Object.keys(selectedOptions).length > 0
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0 pointer-events-none"
              }`}
          >
            {/* Cart Info */}
            <div className="text-sm text-noira-light pr-25">
              <span className="mr-2 text-xl text-primary font-bold">Selected:</span>
              <span className="font-semibold">
                {cart ? cart.serviceName : "No service selected"}
              </span>
              <span className="mx-2 text-noira-gold">•</span>
              <span className="font-semibold">
                £{cart?.price?.amount ?? 0}
              </span>
            </div>

            {/* Continue Button */}
            <button
              className="bg-primary text-noira-dark font-semibold px-6 py-2 text-black rounded-full shadow-lg hover:opacity-90 transition"
              onClick={handleContinue}
              disabled={!cart}
            >
              Continue to Date & Time
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
