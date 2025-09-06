
import React from "react";
import useBookingStore from "../../store/bookingStore.jsx";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function UserProfile() {
  const { userDetails } = useBookingStore();

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white">
        <p className="text-gray-400">No user data found. Please login.</p>
      </div>
    );
  }

  const { name, email, avatar_url, address, phoneVerified, emailVerified, createdAt, gender } = userDetails;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white py-10 px-4">
      <div className="max-w-4xl mx-auto mt-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-[#111] rounded-xl p-6 shadow-lg">
          <div className="flex-shrink-0">
            <img
              src={avatar_url || "/noira.png"}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-primary object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">{name?.first} {name?.last}</h2>
            {/* <p className="text-gray-300 mt-1">Role: <span className="text-white">{userDetails.role}</span></p> */}
            <p className="text-gray-300 mt-1">Gender: <span className="text-white">{gender || "Not specified"}</span></p>
            <p className="text-gray-300 mt-1">Joined: <span className="text-white">{new Date(createdAt).toLocaleDateString()}</span></p>
          </div>
        </div>

        {/* Contact & Verification Section */}
        <div className="bg-[#111] rounded-xl shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email */}
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-primary w-5 h-5" />
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium flex items-center gap-2">
                {email}
                {emailVerified && <span className="text-xs text-green-400 px-2 py-0.5 bg-white/10 rounded-full">Verified</span>}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <FaPhone className="text-primary w-5 h-5" />
            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="text-white font-medium">
                {userDetails.phone || "Not added"}
                {phoneVerified && <span className="text-xs text-green-400 px-2 py-0.5 bg-white/10 rounded-full ml-2">Verified</span>}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 col-span-1 sm:col-span-2">
            <FaMapMarkerAlt className="text-primary w-5 h-5 mt-1" />
            <div>
              <p className="text-gray-400 text-sm">Address</p>
              {address ? (
                <p className="text-white font-medium">
                  {address.Building_No}, {address.Street}, {address.Locality}, {address.PostTown}, {address.PostalCode}
                </p>
              ) : (
                <p className="text-white font-medium">No address added</p>
              )}
            </div>
          </div>

          {/* Profile Completion / MFA Section */}
          <div className="flex items-center gap-3">
            <FaUser className="text-primary w-5 h-5" />
            <div>
              <p className="text-gray-400 text-sm">Profile Status</p>
              <p className="text-white font-medium">
                {userDetails.profileComplete ? "Complete" : "Incomplete"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-primary w-5 h-5" />
            <div>
              <p className="text-gray-400 text-sm">Last Sign-In</p>
              <p className="text-white font-medium">{new Date(userDetails.lastSignInAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Optional: Settings / Actions */}
        {/* <div className="bg-[#111] rounded-xl shadow-lg p-6 flex flex-col sm:flex-row gap-4 justify-end"> */}
        {/*   <button className="px-6 py-3 rounded-lg bg-primary text-black font-semibold hover:bg-amber-500 transition"> */}
        {/*     Edit Profile */}
        {/*   </button> */}
        {/*   <button */}
        {/*     className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-black transition" */}
        {/*   > */}
        {/*     Change Password */}
        {/*   </button> */}
        {/* </div> */}
      </div>
    </div>
  );
}
