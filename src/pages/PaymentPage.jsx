import React, { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import BookingSummary from "../components/PaymentPage/BookingSummary.jsx";
import BookingStepper from "../components/ServicesPage/BookingStepper.jsx";

import useBookingStore from "../store/bookingStore.jsx";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import ComingSoonModal from "../components/PaymentPage/ComingSoonModal.jsx";
import StickyCartSummary from "../components/ChooseTherapist/StickyCartSummary.jsx";

const PaymentPage = () => {
  const { date, time, selectedTherapist, cart } = useBookingStore();
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const userEmail = localStorage.getItem("userEmail");
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const from = location.state?.from || "/";
  console.log("This is the from value: ", from);

  // Sample booking data
  const bookingData = {
    therapist: {
      name: "Sarah Johnson",
      title: "Massage Therapy",
      avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=sarah",
      rating: "4.9",
    },
    date: "December 15, 2024",
    time: "10:00 AM EST",
    duration: "60 minutes",
    serviceFee: "85.00",
    processingFee: "2.50",
    total: "87.50",
  };

  const handlePayment = async () => {
    setIsModalOpen(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.9 },
    });

    // Show message instead of logging out
    // setLoading(true);
    // try {
    //   const response = await axios.post(`${apiUrl}/payment/create-checkout-session`, {
    //     therapistId: selectedTherapist._id,
    //     serviceId: cart.serviceId,
    //     optionIndex: cart.optionIndex,
    //     date,
    //     time,
    //     email: userEmail,
    //     notes: null,
    //   });
    //
    //   // Redirect to Stripe Checkout
    //   window.location.href = response.data.url;
    // } catch (error) {
    //   console.error("This was the error: ", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-black pb-35 pt-25 p-4">
      <div className="max-w-6xl mx-auto">
        <BookingStepper currentStep={3} />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-primary text-4xl font-bold mb-2">Payment</h1>
          <p className="text-gray-400 text-lg">Securely complete your booking</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Lock className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm">Secure SSL-encrypted payment</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <BookingSummary booking={bookingData} />

            {/* Payment Button */}
            <div className="mt-8">
              <button
                onClick={() => navigate(from)}
                disabled={loading}
                className="cursor-pointer mb-5 w-full bg-black border border-primary text-primary hover:text-black font-semibold py-3 px-6 rounded-full bg-black hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to therapist
              </button>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="cursor-pointer w-full bg-primary text-black font-semibold py-3 px-6 rounded-full hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                {loading ? "Redirecting..." : `Confirm and Pay `}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* <StickyCartSummary /> */}
    </div>
  );
};

export default PaymentPage;
