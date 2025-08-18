
import { useState } from "react";
import cartData from "../Data/cart.json";
import CartItem from "../components/CartItem.jsx";

const CartPage = () => {
  const [cartItems, setCartItems] = useState(cartData);
  const [promoCode, setPromoCode] = useState("");

  const handleIncrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const serviceFee = 15;
  const total = subtotal + serviceFee;

  return (
    <div className="bg-black text-white min-h-screen py-12 px-4 md:px-8">
      <div className=" text-center">
        <h1 className="text-4xl font-bold mt-20  text-white mb-2">NOIRA Massage Menu</h1>
        <p className="text-gray-400 mb-10">Luxury Made Accessible</p>
      </div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Cart</h2>

      <div className="max-w-2xl mx-auto">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
          />
        ))}

        {/* Totals */}
        <div className="bg-[#0f172a]  rounded-md p-6 shadow-md mt-6">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>£{subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Service Fee</span>
            <span>£{serviceFee}</span>
          </div>
          <div className="flex justify-between text-[#C49E5B] font-bold text-lg mt-4 border-t border-gray-600 pt-4">
            <span>Total</span>
            <span>£{total}</span>
          </div>

          <button className="w-full mt-6 bg-[#C49E5B] hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md transition">
            Proceed to Checkout
          </button>

          <button className="w-full mt-2 border border-[#C49E5B] hover:bg-yellow-800 text-yellow-300 py-2 px-4 rounded-md transition">
            Continue Shopping
          </button>
        </div>

        {/* Promo Code */}
        <div className="bg-[#0f172a] text-white rounded-md p-4 shadow-md mt-6">
          <label className="block mb-2 font-medium">Promo Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-yellow-500"
            />
            <button className="bg-[#C49E5B] hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md transition">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
