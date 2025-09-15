import { useEffect, useState } from "react";
import DateTimePicker from "../components/ChooseTherapist/DateTimePicker";
import StickyCartSummary from "../components/ChooseTherapist/StickyCartSummary";
import TherapistSelection from "../components/ChooseTherapist/TherapistSelection";
import BookingStepper from "../components/ServicesPage/BookingStepper";
import useBookingStore from "../store/bookingStore";
import AddressModal from "../components/Modals/AddressModal";

const ChooseTherapistPage = () => {
  const [isDateAndTimeSelected, setIsDateAndTimeSelected] = useState(false);
  const { selectedTherapist, setSelectedTherapist, date, time } = useBookingStore();
  const { userAddress } = useBookingStore();
  const [isAddressSaved, setIsAddressSaved] = useState(userAddress ? true : false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(!isAddressSaved);

  useEffect(() => {
    if (selectedTherapist && date && time) {
      setIsDateAndTimeSelected(true);
    } else {
      setIsDateAndTimeSelected(false);
    }
  }, [selectedTherapist, date, time]);

  useEffect(() => {
    setSelectedTherapist();
  }, []);

  return (
    <div className="min-h-screen pb-32 pt-10 bg-black flex flex-col items-center">
      {/* Stepper */}
      <div className="w-full max-w-4xl mt-5 px-4">
        <BookingStepper currentStep={2} />
      </div>

      {/* DateTimePicker + Therapist Selection */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl px-4 mt-8 gap-6">
        {/* DateTime Picker */}
        <div className="w-full lg:w-2/3">
          <DateTimePicker />
        </div>

        {/* Therapist Selection */}
        <div className="w-full lg:w-1/3">
          <TherapistSelection
            setIsAbled={setIsDateAndTimeSelected}
            isAbled={isDateAndTimeSelected}
          />
        </div>
      </div>

      {/* Sticky Cart */}
      <StickyCartSummary
        setIsAbled={setIsDateAndTimeSelected}
        isAbled={isDateAndTimeSelected}
      />

      {/* Address Modal (enable when needed) */}
      {/* <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      /> */}
    </div>
  );
};

export default ChooseTherapistPage;
