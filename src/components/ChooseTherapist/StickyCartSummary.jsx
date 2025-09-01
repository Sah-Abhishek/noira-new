// src/components/StickyCartSummary.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBookingStore from "../../store/bookingStore.jsx";

export default function StickyCartSummary() {
  const { cart, selectedTherapist } = useBookingStore();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("serviceName: ", cart.serviceName);
  // console.log("price: ", cart.price);

  // If cart is empty, don't show sticky summary
  if (!cart || !cart.serviceId) return null;
  const pageName = location.pathname === '/paymentpage' ? 'paymentpage' : '';


  const handleContinue = () => {
    if (location.pathname === "/allservicespage") {
      navigate("/choosetherapist");
    } else if (location.pathname === '/choosetherapist') {
      // fallback in case you reuse this component elsewhere
      navigate("/paymentpage");
    } else {

      console.log("Continue action triggered");
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-black border-t border-primary/30 px-60 py-10 flex items-center justify-between z-50
        transform transition-all duration-500 ease-in-out`}
    >
      {/* Cart Info */}
      <div>
        <div className="text-sm text-noira-light pr-25">
          <span className="mr-2 text-xl text-primary font-bold">Selected:</span>
          <span className="font-semibold text-white">{cart.serviceName}</span>
          <span className="mx-2 text-noira-gold">•</span>
          <span className="font-semibold text-white">£{cart?.price ?? 0}</span>
          <span className="mx-2 text-noira-gold">•</span>
          <span className="text-gray-400 text-sm">
            {cart.durationMinutes} min
          </span>
        </div>
        <div>
          <span className="mr-2 text-xl text-primary font-bold">Therapist Name: </span>
          <span className="font-semibold text-white">{selectedTherapist.title}</span>
          {/* <span className="mx-2 text-noira-gold">•</span> */}
          {/* <span className="font-semibold text-white">£{cart?.price ?? 0}</span> */}
          {/* <span className="mx-2 text-noira-gold">•</span> */}
          {/* <span className="text-gray-400 text-sm"> */}
          {/*   {cart.durationMinutes} min */}
          {/* </span> */}
        </div>
      </div>

      {/* Continue Button */}
      <button
        className="bg-primary text-noira-dark font-semibold px-6 py-2 text-black rounded-full shadow-lg hover:opacity-90 transition"
        onClick={handleContinue}
        disabled={!cart}
      >
        {location.pathname === "/choosetherapist" ? "Continue to Payment Page" : "Continue to Date & Time"}
      </button>
    </div>
  );
}
