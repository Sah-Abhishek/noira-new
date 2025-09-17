import React, { useEffect, useState } from "react";
import axios from "axios";
import { Home, Plus } from "lucide-react";
import useBookingStore from "../../store/bookingStore.jsx";
import AddressModal from "../Modals/AddressModal.jsx";

export default function SavedAddresses({ refreshKey, isAddressInputModalOpen, setLengthOfReturnedAddresses }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Zustand store
  const { userAddress, setUserAddress } = useBookingStore();
  const [selectedId, setSelectedId] = useState(userAddress?._id || null);

  // For now hardcoding userId, later replace with auth store
  const userId = localStorage.getItem("userId");
  const apiUrl = import.meta.env.VITE_API_URL;
  const userjwt = localStorage.getItem("userjwt");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user/${userId}/alladdress`, {
          headers: {
            Authorization: `Bearer ${userjwt}`,
          },

        });
        setAddresses(res.data.allAddresses || []);
        setLengthOfReturnedAddresses(res.data.allAddresses.length || 0);
        console.log("This is the lenght of somehting: ", res.data.allAddresses.length || 0);


        // ✅ If store already has userAddress, make sure it's pre-selected
        if (userAddress?._id) {
          setSelectedId(userAddress._id);
        }
      } catch (err) {
        console.error("Failed to fetch addresses", err);
        setError("Could not load addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userAddress?._id, refreshKey]);

  const handleSelectAddress = async (id) => {
    setSelectedId(id);
    try {
      const response = await axios.post(`${apiUrl}/user/${userId}/default`, {
        addressId: id,
      }, {
        headers: {
          Authorization: `Bearer ${userjwt}`,

        }
      });

      if (response.status === 200) {
        setUserAddress(response.data.address); // ✅ Update store
      }
      console.log("Default address set:", id);
    } catch (err) {
      console.error("Failed to set default address", err);
    }
  };

  if (loading) return <p className="text-gray-400">Loading addresses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-primary text-2xl font-semibold mb-6">
        Saved Addresses
      </h2>

      {addresses.length === 0 ? (
        <p className="text-gray-400 mb-6">No saved addresses found.</p>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              onClick={() => handleSelectAddress(addr._id)}
              className={`bg-[#111] p-4 rounded-xl border transition-colors cursor-pointer ${selectedId === addr._id
                ? "border-primary ring-2 ring-primary"
                : "border-primary/20 hover:border-primary"
                }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Home className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-white">
                  {addr.PostTown}
                </h3>
              </div>
              <p className="text-gray-300 text-sm">
                {addr.Building_No}, {addr.Street}
              </p>
              <p className="text-gray-300 text-sm">
                {addr.Locality}, {addr.PostTown}
              </p>
              <p className="text-gray-300 text-sm">{addr.PostalCode}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add New Address Button */}
      <button
        onClick={() => setIsAddressModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-primary text-black font-semibold hover:scale-105 transition-transform"
      >
        <Plus className="w-5 h-5" />
        Add New Address
      </button>
      <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} />
    </div>
  );
}
