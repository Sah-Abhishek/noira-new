// src/components/StickyCartSummary.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBookingStore from "../../store/bookingStore.jsx";

export default function StickyCartSummary({ isAbled, setIsAbled }) {
  const { cart, selectedTherapist } = useBookingStore();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("this is the value of isabled: ", isAbled);
  // console.log("serviceName: ", cart.serviceName);
  // console.log("price: ", cart.price);

  // If cart is empty, don't show sticky summary
  if (!cart || !cart.serviceId) return null;
  const pageName =
    location.pathname === "/paymentpage"
      ? "paymentpage"
      : location.pathname === "/findtherapistbyavailibility"
        ? "findtherapistbyavailibility"
        : "";


  const handleContinue = () => {
    if (location.pathname === "/allservicespage") {
      navigate("/choosetherapist",);
    } else if (location.pathname === '/choosetherapist') {
      // fallback in case you reuse this component elsewhere
      navigate("/paymentpage", { state: { from: "/choosetherapist" } });
    } else if (location.pathname === "/servicesbytherapist") {
      navigate("/findtherapistbyavailability",)

      console.log("Continue action triggered");
    } else if (location.pathname === "/findtherapistbyavailability") {
      navigate("/paymentpage", { state: { from: "/findtherapistbyavailability" } });
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


          {selectedTherapist && (
            <>
              <span className="mr-2 text-xl text-primary font-bold">Therapist Name: </span>
              <span className="font-semibold text-white">{selectedTherapist.profile?.title || selectedTherapist?.title}</span>
            </>

          )}
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
        className={`px-6 py-2 rounded-full shadow-lg font-semibold transition 
    ${isAbled
            ? "bg-primary text-black hover:bg-primary/90 cursor-pointer"
            : "bg-gray-600 text-gray-300 cursor-not-allowed opacity-50"
          }`}
        disabled={!isAbled}
        onClick={handleContinue}
      >
        {location.pathname === "/choosetherapist" ||
          location.pathname === "/findtherapistbyavailability"
          ? "Continue to Payment Page"
          : "Continue to Date & Time"}
      </button>
    </div>
  );
}
