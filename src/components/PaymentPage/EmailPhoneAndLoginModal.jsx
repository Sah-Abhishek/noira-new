import React, { useState } from "react";
import { X } from "lucide-react";
import useBookingStore from "../../store/bookingStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthModal({
  isOpen,
  onClose,
  onConfirmCash,
  onConfirmOnline,
  setMobileNumber,
  setEmail,
  couponCode,
  setIsGuestPaymentModalOpen
}) {
  const [name, setName] = useState("");
  const [email, setEmailLocal] = useState("");
  const [mobile, setMobileLocal] = useState("");
  const [paymentMethod, setPaymentMethod] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
  const { userAddress, setCouponCode, setUserPhoneNumber, setUserEmail, cart, date, time, selectedTherapist, } = useBookingStore();
  const navigate = useNavigate();
  const postalCode = sessionStorage.getItem('postalCode');

  if (!isOpen) return null;

  const handleConfirm = async (method) => {
    // sync values up if parent gave setters
    setEmail?.(email);
    setMobileNumber?.(mobile);

    // pass back all info + selected method
    if (method === 'cash') {
      setUserEmail(email);
      setUserPhoneNumber(mobile);
      setCouponCode(couponCode);


      // const res = await axios.post(
      //   `${apiUrl}/payment/cashBooking`,
      //   {
      //     email: email,
      //     therapistId: selectedTherapist._id,
      //     mobileNumber: mobile,
      //     serviceId: cart.serviceId,
      //     optionIndex: cart.optionIndex,
      //     date,
      //     time,
      //     couponCode,
      //   },
      // );
      // setIsGuestPaymentModalOpen(false);
      navigate('/bookingconfirmedbycash');


    } else if (method === 'online') {
      const res = await axios.post(
        `${apiUrl}/payment/create-checkout-session`,
        {
          email: email,
          therapistId: selectedTherapist._id,
          serviceId: cart.serviceId,
          optionIndex: cart.optionIndex,
          mobileNumber: mobile,
          date,
          time,
          couponCode,

        },
      );
      setIsGuestPaymentModalOpen(false);

      if (res.data.url) {
        window.location.href = res.data.url;
      }

    }
    // onConfirm?.({
    //   name,
    //   email,
    //   mobile,
    //   paymentMethod: method, // "online" or "cash"
    // });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0d0d]/80 backdrop-blur-sm">
      <div className="relative bg-[#111] rounded-2xl shadow-xl w-full max-w-md p-6 text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Checkout
        </h2>

        {/* Input fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] text-white border border-primary/40 focus:outline-none focus:border-primary"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmailLocal(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] text-white border border-primary/40 focus:outline-none focus:border-primary"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobileLocal(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] text-white border border-primary/40 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Payment buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleConfirm("online")}
            className="flex-1 py-3 rounded-lg font-semibold bg-primary text-black hover:scale-105 transition-transform"
          >
            Pay Online
          </button>
          <button
            onClick={() => handleConfirm("cash")}
            className="flex-1 py-3 rounded-lg font-semibold bg-primary text-black hover:scale-105 transition-transform"
          >
            Pay by Cash
          </button>
        </div>

        {/* Divider with OR */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-white/20"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-grow h-px bg-white/20"></div>
        </div>

        {/* Login + Signup buttons */}
        <div className="flex gap-4">
          <button onClick={() => navigate('/userlogin')} className="flex-1 py-3 rounded-lg font-semibold border border-primary text-primary hover:bg-primary hover:text-black transition-colors">
            Login
          </button>
          <button onClick={() => navigate('/usersignup')} className="flex-1 py-3 rounded-lg font-semibold border border-primary text-primary hover:bg-primary hover:text-black transition-colors">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
