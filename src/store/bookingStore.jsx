import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set) => ({
      // booking state
      cart: [],   // previously service
      date: null,
      time: null,

      // services list from API
      services: [],

      // setters
      setCart: (cart) => set({ cart }),
      setDate: (date) => set({ date }),
      setTime: (time) => set({ time }),
      resetCart: () => set({ cart: null, date: null, time: null }),

      // save services API response
      setServices: (services) => set({ services }),
    }),
    {
      name: "booking-storage", // key in localStorage
    }
  )
);

export default useBookingStore;
