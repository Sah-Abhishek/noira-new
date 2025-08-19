import React, { useState } from "react";
import { Lock } from "lucide-react";
import BookingSummary from "../components/PaymentPage/BookingSummary.jsx";
import PaymentDetails from "../components/PaymentPage/PaymentDetails.jsx";

const PaymentPage = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Sample booking data
  const bookingData = {
    therapist: {
      name: "Sarah Johnson",
      title: "Massage Therapy",
      avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=sarah",
      rating: "4.9"
    },
    date: "December 15, 2024",
    time: "10:00 AM EST",
    duration: "60 minutes",
    serviceFee: "85.00",
    processingFee: "2.50",
    total: "87.50"
  };

  const handlePayment = (paymentData) => {
    console.log('Payment submitted:', paymentData);
    setPaymentComplete(true);
  };

  const handleBack = () => {
    console.log('Back to summary');
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center mt-15 p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h1 className="text-white text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-400">Your booking has been confirmed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-25 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-yellow-400 text-4xl font-bold mb-2">Payment</h1>
          <p className="text-gray-400 text-lg">Securely complete your booking</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Lock className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm">Secure SSL-encrypted payment</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BookingSummary booking={bookingData} />
          <PaymentDetails onPayment={handlePayment} onBack={handleBack} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
