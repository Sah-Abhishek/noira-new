import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Lock } from "lucide-react";

export default function PostalCodeModal({ isOpen, onClose, }) {
  const [postalCode, setPostalCode] = useState("");

  const onSubmit = (postalCode) => {
    sessionStorage.setItem("postalCode", postalCode);


  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postalCode.trim()) return;
    onSubmit(postalCode);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="bg-black text-white rounded-2xl shadow-2xl w-[90%] max-w-3xl p-10 relative border border-primary/20"
          >
            {/* Close Button */}
            {/* <button */}
            {/*   onClick={onClose} */}
            {/*   className="absolute top-4 right-4 text-gray-400 hover:text-primary transition" */}
            {/* > */}
            {/*   <X size={24} /> */}
            {/* </button> */}

            {/* Branding */}
            <div className="flex justify-center mb-4">
              <span className="px-3 py-1 rounded-md text-xs bg-primary text-black font-semibold">
                NOIRA
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
              Where would you like to book your{" "}
              <span className="text-primary">luxury massage?</span>
            </h2>
            <p className="text-center text-gray-400 mb-8">
              Select your location to find the best therapists near you
            </p>

            {/* Grid Layout */}
            <div className="grid md:grid-cols-1 gap-6">
              {/* Left Side (Form) */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="postal"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Address                  </label>
                  <input
                    id="postal"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Enter your postal code"
                    className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    We’ll find qualified therapists in your area
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-primary text-black font-semibold hover:bg-primary/90 transition"
                >
                  CONTINUE →
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full text-sm text-gray-400 hover:text-primary transition"
                >
                  Continue without setting location
                </button>
              </form>

              {/* Right Side (Service Area Map) */}
              {/* <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-center"> */}
              {/*   <h3 className="text-lg font-semibold text-primary mb-2"> */}
              {/*     Service Area Map */}
              {/*   </h3> */}
              {/*   <p className="text-gray-400 mb-6"> */}
              {/*     We cover major cities nationwide */}
              {/*   </p> */}
              {/*   <div className="flex flex-col items-center justify-center h-40 w-full border border-dashed border-gray-700 rounded-lg"> */}
              {/*     <MapPin size={40} className="text-gray-500 mb-2" /> */}
              {/*     <p className="text-gray-500 text-sm"> */}
              {/*       Coverage Map <br /> Enter your postal code to check */}
              {/*       availability */}
              {/*     </p> */}
              {/*   </div> */}
              {/* </div> */}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-center">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span>    <Lock size={20} />
                </span> Your location data is secure and private
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
