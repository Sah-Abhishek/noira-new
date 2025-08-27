
import React from "react";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/40">
          <CheckCircle className="w-12 h-12 text-black" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-primary mb-2">Payment Successful!</h1>
        <p className="text-gray-400 mb-6">Your booking has been confirmed. A confirmation email has been sent.</p>

        {/* Button */}
        <a
          href="/"
          className="inline-block bg-primary text-black font-semibold py-3 px-6 rounded-full hover:opacity-90 transition"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
