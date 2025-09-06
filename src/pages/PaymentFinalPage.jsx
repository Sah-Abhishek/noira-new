import React, { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import BookingSummary from "../components/PaymentPage/BookingSummary.jsx";
import BookingStepper from "../components/ServicesPage/BookingStepper.jsx";

import useBookingStore from "../store/bookingStore.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import ComingSoonModal from "../components/PaymentPage/ComingSoonModal.jsx";
import AddressModal from "../components/Modals/AddressModal.jsx";
import SavedAddresses from "../components/PaymentPage/SavedAddresses.jsx";

const PaymentPage = () => {
  const { userAddress } = useBookingStore();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handlePayment = () => {
    if (userAddress) {
      // ✅ User has an address → open payment modal
      setIsModalOpen(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.9 },
      });
      // TODO: Replace with real payment API
    } else {
      // ❌ No address → ask user to add one
      setIsAddressModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20 pt-10 px-4">
      <div className="max-w-6xl mx-auto">
        <BookingStepper currentStep={3} />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-primary text-4xl font-bold mb-2">Payment</h1>
          <p className="text-gray-400 text-lg">Securely complete your booking</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Lock className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm">
              Secure SSL-encrypted payment
            </span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Booking Summary */}
          <div className="bg-[#0d0d0d] p-6 rounded-2xl border border-primary/20 flex flex-col h-full">
            <BookingSummary />
          </div>

          {/* Right: Saved Addresses */}
          <div className="bg-[#0d0d0d] p-6 rounded-2xl border border-primary/20 flex flex-col h-full">
            <SavedAddresses />
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="mt-12 max-w-lg mx-auto text-center">
          <button
            onClick={() => navigate(from)}
            disabled={loading}
            className="cursor-pointer mb-5 w-full bg-black border border-primary text-primary hover:text-black font-semibold py-3 px-6 rounded-full hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to therapist
          </button>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="cursor-pointer w-full bg-primary text-black font-semibold py-3 px-6 rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            {loading ? "Redirecting..." : "Confirm and Pay"}
          </button>
        </div>
      </div>

      {/* Modals */}
      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </div>
  );
};

export default PaymentPage;
