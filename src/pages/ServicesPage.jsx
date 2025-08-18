import { useEffect, useState } from "react";
import axios from "axios";
import HeroSectionServices from "../components/ServicesPage/HeroSectionServices";
import MassageServiceCard from "../components/ServicesPage/MassageServiceCards";
import FooterSection from "../components/FooterSection";
import MassageServiceSkeleton from "../components/ServicesPage/MassageServicesSkeletonCard.jsx";
import FloatingCartButton from "../components/ServicesPage/FoatingActionButton.jsx";
import BookingStepper from "../components/ServicesPage/BookingStepper.jsx";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await axios.get("https://noira-backend.vercel.app/services/list");
      setServices(response.data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Add to cart
  const addToCart = (service, optionIndex) => {
    setCart((prev) => [...prev, { serviceId: service._id, optionIndex }]);
  };

  // Remove from cart
  const removeFromCart = (service, optionIndex) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.serviceId === service._id && item.optionIndex === optionIndex)
      )
    );
  };

  // Choose therapist → send cart to backend
  const handleChooseTherapist = async () => {
    try {
      const response = await axios.post("https://noira-backend.vercel.app/cart/checkout", {
        items: cart,
      });
      console.log("Cart sent successfully:", response.data);
    } catch (error) {
      console.error("Failed to send cart:", error);
    }
  };

  return (
    <div className="bg-black w-full">
      {/* Stepper */}
      {/* <div className="w-full max-w-4xl mt-20 px-4 mx-auto"> */}
      {/*   <BookingStepper currentStep={1} /> */}
      {/* </div> */}

      {/* Hero Section */}
      <HeroSectionServices />

      {/* Service Cards */}
      <div className="bg-black w-full px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
              <MassageServiceSkeleton key={i} />
            ))
            : services.map((service) => (
              <MassageServiceCard
                key={service._id}
                service={service}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))}
        </div>
      </div>

      {/* Footer */}
      <FooterSection />

      {/* Floating Button */}
      <FloatingCartButton cart={cart} onChooseTherapist={handleChooseTherapist} />
    </div>
  );
};

export default ServicesPage;
