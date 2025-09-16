import { useState } from "react";
import axios from "axios";
import useUserStore from "../../store/UserStore";

function MobileVerifyComponent({ profile, userjwt, apiUrl, setProfile }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const { user, setUser } = useUserStore();
  const phoneNumber = user?.phone;



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
        { mobileNumber: `91${phoneNumber}` },
        { headers: { Authorization: `Bearer ${userjwt}` } }
      );
      setOtpSent(true);
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
        { otp, "mobileNumber": `91${phoneNumber}`, userId: user._id },
        { headers: { Authorization: `Bearer ${userjwt}` } }
      );
      if (response?.data?.type === "success") {
        setUser(response.data.user);
      }

      setProfile((prev) => ({ ...prev, phoneVerified: true }));
      setMessage("Phone number verified successfully!");
      setOtp("");
      setOtpSent(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 w-full bg-[#111] border border-gray-700 rounded-lg p-4 text-left">
      <h3 className="text-sm font-semibold text-gray-300 mb-2">Verify Mobile Number</h3>
      {profile.phoneVerified ? (
        <p className="text-green-400 text-sm">Your mobile number is verified ✅</p>
      ) : (
        <>
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
                className="w-full bg-[#0d0d0d] border border-gray-600 text-sm rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-primary text-black text-sm font-semibold py-2 rounded-lg hover:bg-amber-500 transition"
              >
                {loading ? "Validating..." : "Validate"}
              </button>
            </>
          )}
          {message && <p className="text-xs mt-2 text-yellow-400">{message}</p>}
        </>
      )}
    </div>
  );
}

export default MobileVerifyComponent;
