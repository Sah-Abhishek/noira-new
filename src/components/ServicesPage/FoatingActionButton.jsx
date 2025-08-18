import { ShoppingCart } from "lucide-react";

const FloatingCartButton = ({ cart, onChooseTherapist }) => {
  return (
    <div className="fixed bottom-6 w-full flex justify-between px-6">
      {/* Choose Therapist Button - Centered at bottom */}
      {cart.length > 0 && (
        <button
          onClick={onChooseTherapist}
          className="bg-[#C49E5B] hover:bg-amber-600 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition mx-auto"
        >
          Choose Therapist
        </button>
      )}

      {/* Cart Floating Action Button - Positioned at bottom-right */}
      <div className="relative">
        <button className="bg-[#C49E5B] hover:bg-amber-600 p-4 rounded-full shadow-lg transition">
          <ShoppingCart className="text-black w-6 h-6" />
        </button>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {cart.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default FloatingCartButton;
