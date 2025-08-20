import React, { useState } from "react";
import "../index.css";
import { zoomies } from "ldrs";
zoomies.register();
import noira from "/noira.png";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaSignInAlt,
  FaGoogle,
  FaApple,
} from "react-icons/fa";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Validation schema
const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

export default function UserLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const endpoint = `${apiUrl}/auth/user/login`;
    try {
      setIsLoading(true);
      const response = await axios.post(endpoint, data);
      console.log("Login success:", response.data);

      if (response.status === 200) {
        localStorage.setItem("userEmail", data.email);
        navigate("/otpinput/login");
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(
          `Login failed: ${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        setErrorMsg("No response from server. Please try again later.");
      } else {
        setErrorMsg(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1c1c1c] rounded-xl shadow-lg p-8 space-y-6 relative">
        {/* Logo and Title */}
        <div className="flex flex-col items-center">
          <img src={noira} alt="Logo" className="h-10 sm:h-12 mb-2" />
          <p className="text-gray-400 font-medium">Wellness Platform</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 flex items-center gap-2 mb-1">
              <FaEnvelope className="text-primary" />
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500 outline-none focus:ring-2 ${errors.email ? "ring-red-500" : "focus:ring-primary"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 flex items-center gap-2 mb-1">
              <FaLock className="text-primary" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className={`w-full px-4 py-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500 outline-none focus:ring-2 ${errors.password ? "ring-red-500" : "focus:ring-primary"}`}
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FaEye />
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition ${isLoading
              ? "bg-black text-white cursor-not-allowed"
              : "bg-primary hover:bg-amber-500 text-black"
              }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>              <l-zoomies
                size="80"
                stroke="5"
                bg-opacity="0.1"
                speed="1.4"
                color="yellow"

              ></l-zoomies>
              </span>

            ) : (
              <>
                <FaSignInAlt /> Login
              </>
            )}
          </button>
          {errorMsg && <p className="text-center text-sm text-red-500">{errorMsg}</p>}
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-400 text-sm mt-4">
          <hr className="flex-1 border-gray-600" />
          Or continue with
          <hr className="flex-1 border-gray-600" />
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4">
          <button className="w-full bg-[#2b2b2b] hover:bg-[#3b3b3b] py-2 rounded-md flex items-center justify-center gap-2 border border-gray-600">
            <FaGoogle /> Google
          </button>
          <button className="w-full bg-[#2b2b2b] hover:bg-[#3b3b3b] py-2 rounded-md flex items-center justify-center gap-2 border border-gray-600">
            <FaApple /> Apple
          </button>
        </div>

        {/* Sign up */}
        <div className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/usersignup" className="text-primary hover:underline">
            Sign Up
          </Link>

        </div>
      </div>
    </div>
  );
}
