import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set) => ({
      // booking state

      useEmail: localStorage.getItem("userEmail") || null,
      findingTherapist: false,
      cart: [], // previously service
      date: null,
      time: null,
      hasSearched: false,
      userId: null,
      userDetails: null,

      // services list from API
      services: [],
      therapists: [],
      selectedTherapist: null, // actual state
      userAddress: null,

      // setters
      setHasSearched: (value) => set({ hasSearched: value }),
      setFindingTherapist: (value) => set({ findingTherapist: value }),
      setTherapists: (therapists) => set({ therapists }),
      setCart: (cart) => set({ cart }),
      setDate: (date) => set({ date }),
      setTime: (time) => set({ time }),
      resetCart: () => set({ cart: [], date: null, time: null }), // better to reset cart to [] instead of null
      setSelectedTherapist: (therapist) => set({ selectedTherapist: therapist }),
      setUserAddress: (address) => set({ userAddress: address }),
      setUerId: (userId) => set({ userId }),
      setUserDetails: (user) => set({ userDetails: user }),

      // save services API response
      setServices: (services) => set({ services }),
    }),
    {
      name: "booking-storage", // key in localStorage
      partialize: (state) => {
        const { hasSearched, ...rest } = state;
        return rest;
      }
    }
  )
);

export default useBookingStore;
