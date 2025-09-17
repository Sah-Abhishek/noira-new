import { useState, useEffect } from "react";
import axios from "axios";
import useUserStore from "../../store/UserStore";
import { X } from "lucide-react";

function VerifyMobileModal({ isOpen, onClose, userjwt }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // ⏳ countdown state

  const { user, setUser } = useUserStore();
  const phoneNumber = user?.phone;
  const apiUrl = import.meta.env.VITE_API_URL;

  // countdown effect
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setMessage("Phone number not found.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      await axios.post(
        `${apiUrl}/otp/send-otp`,
        { mobileNumber: `${phoneNumber}` },
        { headers: { Authorization: `Bearer ${userjwt}` } }
      );
      setOtpSent(true);
      setOtp(""); // clear any old OTP
      setResendTimer(120); // start 2-minute countdown
      setMessage("OTP sent to your mobile number.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        `${apiUrl}/otp/verify-otp`,
        { otp, mobileNumber: `91${phoneNumber}`, userId: user._id },
        { headers: { Authorization: `Bearer ${userjwt}` } }
      );
      if (response?.data?.type === "success") {
        setUser(response.data.user);
        setMessage("Phone number verified successfully!");
        setOtp("");
        setOtpSent(false);
        onClose();
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111] border border-gray-700 rounded-xl p-6 w-full max-w-md relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-semibold text-gray-200 mb-4">
          Verify Mobile Number
        </h3>

        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-primary text-black text-sm font-semibold py-2 rounded-lg hover:bg-amber-500 transition"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full text-white bg-[#0d0d0d] border border-gray-600 text-sm rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-primary text-black text-sm font-semibold py-2 rounded-lg hover:bg-amber-500 transition"
            >
              {loading ? "Validating..." : "Validate"}
            </button>

            {/* Resend OTP */}
            <button
              onClick={handleSendOtp}
              disabled={resendTimer > 0 || loading}
              className={`w-full mt-2 ${resendTimer > 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-primary hover:bg-amber-500"
                } text-black text-sm font-semibold py-2 rounded-lg transition`}
            >
              {resendTimer > 0
                ? `Resend OTP in ${Math.floor(resendTimer / 60)}:${(
                  resendTimer % 60
                )
                  .toString()
                  .padStart(2, "0")}`
                : "Resend OTP"}
            </button>
          </>
        )}

        {message && (
          <p className="text-xs mt-3 text-yellow-400">{message}</p>
        )}
      </div>
    </div>
  );
}

export default VerifyMobileModal;
