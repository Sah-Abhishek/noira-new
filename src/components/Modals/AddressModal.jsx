import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useBookingStore from "../../store/bookingStore";
import { X } from "lucide-react";

const AddressModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    buildingNo: "",
    street: "",
    locality: "",
    postTown: "",
    postalCode: "",
  });
  const userjwt = localStorage.getItem("userjwt");

  const { setUserAddress } = useBookingStore();

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const userId = localStorage.getItem("userId");
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.postalCode) {
      toast.error("Postal code is required");
      return;
    }

    try {
      const res = await axios.put(`${apiUrl}/user/${userId}/address`, formData, {
        headers: {
          Authorization: `Bearer ${userjwt}`,

        }
      });

      // Success toast
      toast.success("Address saved successfully");

      // Update Zustand store
      setUserAddress(formData);

      // Persist in session storage
      sessionStorage.setItem("postalCode", formData.postalCode);
      sessionStorage.setItem("userAddress", JSON.stringify(formData));

      onClose();
    } catch (error) {
      // Axios error handling
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-black text-[#D4AF37] border border-white/20 rounded-2xl p-8 w-full max-w-2xl">

        {/* Modal Header with Close Button */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold text-primary">
            Where should the therapist come?
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-500 transition"
            aria-label="Close modal"
          >
            <X />
          </button>
        </div>

        <p className="text-sm text-gray-200 mb-6">
          To ensure a seamless in-home therapy experience, we need your complete
          address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="buildingNo"
              placeholder="Building No"
              value={formData.buildingNo}
              onChange={handleChange}
              className="bg-transparent border border-white/40 hover:border-primary/80 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
            <input
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className="bg-transparent border border-white/40 hover:border-primary/80 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="locality"
              placeholder="Locality"
              value={formData.locality}
              onChange={handleChange}
              className="bg-transparent border border-white/40 hover:border-primary/80 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
            <input
              name="postTown"
              placeholder="Post Town"
              value={formData.postTown}
              onChange={handleChange}
              className="bg-transparent border border-white/40 hover:border-primary/80 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          {/* Postal Code Row */}
          <input
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full bg-transparent caret-white border border-white/40 hover:border-primary/80 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          <button
            type="submit"
            className="w-full mt-2 bg-primary text-black font-semibold py-3 rounded-lg hover:bg-yellow-200 transition"
          >
            Confirm Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
