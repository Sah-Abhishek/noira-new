import React, { useState } from "react";
import { ArrowLeft, Lock, Loader2 } from "lucide-react";
import BookingSummary from "../components/PaymentPage/BookingSummary.jsx";
import BookingStepper from "../components/ServicesPage/BookingStepper.jsx";

import useBookingStore from "../store/bookingStore.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import ComingSoonModal from "../components/PaymentPage/ComingSoonModal.jsx";
import AddressModal from "../components/Modals/AddressModal.jsx";
import SavedAddresses from "../components/PaymentPage/SavedAddresses.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import useUserStore from "../store/UserStore.jsx";

const PaymentPage = () => {
  const { userAddress, cart, date, time, selectedTherapist } = useBookingStore();
  const { user } = useUserStore();
  const isMobileNumberSaved = Boolean(user.phone);
  const [lengthOfReturnedAddresses, setLengthOfReturnedAddresses] = useState();


  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const userEmail = localStorage.getItem("userEmail");
  // console.log("This is the phone verified: ", user.phoneVerified);

  const handlePayment = async () => {
    if (loading) return; // guard: avoid double clicks
    setLoading(true);

    // if (!isMobileNumberSaved) {
    //   toast.error("Add Phone Number in the profile Section");
    //   setLoading(false);
    //   return;
    // }
    if (!user.phoneVerified) {
      toast.error("Verify Phone in the profile section");
      setLoading(false);
      return;
    }

    try {
      if (lengthOfReturnedAddresses === 0) {
        setIsAddressModalOpen(true);
        setLoading(false);
        return;
      }
      if (userAddress) {
        const res = await axios.post(`${apiUrl}/payment/create-checkout-session`, {
          email: userEmail,
          therapistId: selectedTherapist._id,
          serviceId: cart.serviceId,
          optionIndex: cart.optionIndex,
          date,
          time,
        });

        if (res.data.url) {
          window.location.href = res.data.url;
        }
      } else {
        toast.error("Select an address for the booking");
        setLoading(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20 pt-10 px-4">
      <div className="max-w-6xl pt-5 mx-auto">
        <BookingStepper className="mt-10" currentStep={3} />

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
          <div className="bg-[#0d0d0d] p-6 rounded-2xl border border-primary/20 flex flex-col h-full">
            <BookingSummary />
          </div>
          <div className="bg-[#0d0d0d] p-6 rounded-2xl border border-primary/20 flex flex-col h-full">
            <SavedAddresses isAddressInputModalOpen={isAddressModalOpen} setLengthOfReturnedAddresses={setLengthOfReturnedAddresses} />
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="mt-12 max-w-lg mx-auto text-center space-y-5">
          <button
            onClick={() => navigate(from)}
            disabled={loading}
            className="w-full bg-black border border-primary text-primary hover:text-black font-semibold py-3 px-6 rounded-full hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to therapist
          </button>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-primary text-black font-semibold py-3 px-6 rounded-full transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Confirm and Pay
              </>
            )}
          </button>

          {/* ✅ Pay by Cash button */}
          <button
            onClick={() => toast.success("Cash payment selected! Pay at the appointment.")}
            disabled={loading}
            className="w-full bg-primary text-black font-semibold py-3 px-6 rounded-full  transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pay by Cash
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
