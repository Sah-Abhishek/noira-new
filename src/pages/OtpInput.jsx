import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpInput = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState('');
  const userEmail = localStorage.getItem('userEmail');

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleVerify = async () => {
    if (otp.length < 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.20:3000/verifyotp', {
        otp,
        email: userEmail,
      });

      console.log("This is the response: ", response.data);

      if (response.data.success) {
        navigate('/admindashboard');
      } else {
        alert("OTP verification failed. Please try again.");
      }
    } catch (err) {
      console.error("There was an error:", err);
      alert("Failed to verify OTP. Please check your network or try again later.");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black flex flex-col items-center justify-center px-4 sm:px-6">
      <h2 className="text-yellow-400 text-xl sm:text-2xl font-semibold mb-2">
        Enter OTP
      </h2>

      <p className="text-gray-400 text-sm sm:text-base mb-4 text-center">
        An OTP has been sent to your email address
      </p>

      <div className="flex justify-center flex-wrap gap-2 w-full max-w-md">
        <MuiOtpInput
          value={otp}
          onChange={handleChange}
          length={6}
          TextFieldsProps={{
            inputProps: {
              inputMode: 'numeric',     // mobile keyboards show numbers
              pattern: '[0-9]*',        // regex to restrict input to numbers
            },
            sx: {
              width: {
                xs: '36px',
                sm: '50px',
                md: '60px',
              },
              height: {
                xs: '44px',
                sm: '50px',
                md: '60px',
              },
              mx: {
                xs: 0.3,
                sm: 0.5,
              },
              '& .MuiInputBase-input': {
                color: '#FFD700',
                textAlign: 'center',
                fontSize: '1.25rem',
                padding: 0,
              },
              '& .MuiOutlinedInput-root': {
                height: '100%',
                borderRadius: '8px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFD700',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFD700',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFD700',
              },
            },
          }}
        />
      </div>

      <button
        onClick={handleVerify}
        disabled={otp.length !== 6}
        className={`mt-6 w-full max-w-xs sm:max-w-sm px-6 py-2 font-semibold rounded transition
          ${otp.length !== 6
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-yellow-500 hover:bg-yellow-400 text-black'}
        `}
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpInput;
