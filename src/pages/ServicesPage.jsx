import { useState, useEffect } from "react";
import axios from "axios";
import FloatingCartButton from "../components/ServicesPage/FoatingActionButton.jsx";
import useBookingStore from "../store/bookingStore.jsx";
import CartPage from "./CartPage.jsx";
import HeroSectionServices from "../components/ServicesPage/HeroSectionServices.jsx";
import MassageServiceSkeleton from "../components/ServicesPage/MassageServicesSkeletonCard.jsx";
import MassageServiceCard from "../components/ServicesPage/MassageServiceCards.jsx";
import FooterSection from "../components/FooterSection.jsx";

const ServicesPage = () => {
  const [loading, setLoading] = useState(true);

  const authToken = localStorage.getItem("authToken");
  // Zustand store
  const { cart, setCart, resetCart, services, setServices } = useBookingStore();

  const fetchServices = async () => {
    console.log("This is the authToken: ", authToken);
    try {
      const response = await axios.get(
        "https://noira-backend.vercel.app/services/list", {
        headers: {
          authorization: `{Bearer ${authToken}`
        }
      }
      );
      setServices(response.data); // ✅ store in Zustand
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if not already in store (persisted)
    if (!services || services.length === 0) {
      fetchServices();
    } else {
      setLoading(false);
    }
  }, []);

  // Add only one service
  const addToCart = (service, optionIndex) => {
    setCart({ serviceId: service._id, optionIndex });
  };

  const removeFromCart = () => {
    resetCart();
  };

  const hasCart = cart && Object.keys(cart).length > 0;
  console.log("This is the value of hascart: ", hasCart);

  return (
    <div className="bg-black w-full text-white">
      {/* Hero Section */}
      <HeroSectionServices />

      {/* Services and Cart */}
      <div className="bg-black w-full px-4 py-12 ">
        <div
          className={`max- w-7xl transition-all duration-500 ease-in-out mx-auto gap-6 ${hasCart
            ? "flex flex-col lg:flex-row" // show side by side
            : "flex justify-center" // center services when no cart
            }`}
        >
          {/* Service Cards Section */}
          <div
            className={` ${hasCart ? "flex-1" : "w-full lg:w-3/4"
              } space - y - 6`}
          >
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                <MassageServiceSkeleton key={i} />
              ))
              : services.map((s) => (
                <MassageServiceCard
                  key={s._id}
                  service={s}
                  cart={cart ? [cart] : []}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              ))}
          </div>

          {/* Cart Section (only if cart has items) */}
          {hasCart && (
            <div className="w-full lg:w-[450px]">
              <div className="lg:sticky lg:top-24">
                <CartPage />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <FooterSection />

      {/* Floating Cart Button */}
      <FloatingCartButton
        cart={cart ? [cart] : []}
        onChooseTherapist={() =>
          console.log("Go to date & time picker")
        }
      />
    </div>
  );
};

export default ServicesPage;
