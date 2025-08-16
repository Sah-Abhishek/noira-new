import React, { useState } from "react";
import "../index.css";
import { zoomies } from "ldrs";
zoomies.register();
import noira from "/noira.png";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaUserPlus,
  FaGoogle,
  FaApple,
} from "react-icons/fa";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Validation schema
const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function UserSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const endpoint = "http://192.168.1.20:3000/auth/user/signup";

    try {
      setIsLoading(true);
      const response = await axios.post(endpoint, data);
      console.log("Signup success:", response.data);

      if (response.status === 201) {
        localStorage.setItem("userEmail", data.email);
        navigate("/login"); // redirect to login after signup
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(
          `Signup failed: ${error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        setErrorMsg("No response from server. Please try again later.");
      } else {
        setErrorMsg(`Error: ${error.message}`);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1c1c1c] rounded-xl shadow-lg p-8 space-y-6 relative">
        {/* Logo and Title */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center h-10 mt-10">
            <img src={noira} alt="Logo" className="h-10 sm:h-15 mb-10" />
          </div>
          <p className="text-gray-400 text-medium font-medium">
            Wellness Platform
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <span className="text-yellow-400">
                <FaUser />
              </span>{" "}
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              {...register("firstName")}
              className={`w-full px-4 py-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500 outline-none focus:ring-2 ${errors.firstName ? "ring-red-500" : "focus:ring-yellow-500"
                }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <span className="text-yellow-400">
                <FaUser />
              </span>{" "}
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              {...register("lastName")}
              className={`w-full px-4 py-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500 outline-none focus:ring-2 ${errors.lastName ? "ring-red-500" : "focus:ring-yellow-500"
                }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <span className="text-yellow-400">
                <FaEnvelope />
              </span>{" "}
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500 outline-none focus:ring-2 ${errors.email ? "ring-red-500" : "focus:ring-yellow-500"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <span className="text-yellow-400">
                <FaLock />
              </span>{" "}
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className={`w-full px-4 py-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500 outline-none focus:ring-2 ${errors.password ? "ring-red-500" : "focus:ring-yellow-500"
                  }`}
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FaEye />
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className={`w-full font-semibold py-3 rounded-md flex items-center justify-center gap-2
    ${isLoading
                ? "bg-black text-white cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-400 text-black"
              }
  `}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>
                <l-zoomies
                  size="80"
                  stroke="5"
                  bg-opacity="0.1"
                  speed="1.4"
                  color="yellow"
                ></l-zoomies>
              </span>
            ) : (
              <span className="inline-flex items-center ">
                <FaUserPlus className="mr-2" />
                Sign Up
              </span>
            )}
          </button>
          <h1 className="text-center text-sm text-red-500">{errorMsg}</h1>
        </form>

        {/* Or Divider */}
        <div className="flex items-center gap-2 text-gray-400 text-sm mt-4">
          <hr className="flex-1 border-gray-600" />
          Or continue with
          <hr className="flex-1 border-gray-600" />
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4">
          <button className="w-full bg-[#2b2b2b] hover:bg-[#3b3b3b] py-2 rounded-md flex items-center justify-center gap-2 border border-gray-600 text-white">
            <FaGoogle /> Google
          </button>
          <button className="w-full bg-[#2b2b2b] hover:bg-[#3b3b3b] py-2 rounded-md flex items-center justify-center gap-2 border border-gray-600 text-white">
            <FaApple /> Apple
          </button>
        </div>

        {/* Already signed up? */}
        <div className="text-center text-sm text-gray-400 mt-4">
          Already signed up?{" "}
          <Link
            to="/userlogin"
            className="text-yellow-400 hover:underline cursor-pointer"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
