import DateTimePicker from "../components/ChooseTherapist/DateTimePicker";
import StickyCartSummary from "../components/ChooseTherapist/StickyCartSummary";
import TherapistSelection from "../components/ChooseTherapist/TherapistSelection";
import BookingStepper from "../components/ServicesPage/BookingStepper";

const ChooseTherapistPage = () => {
  return (
    <div className="min-h-screen pb-30 pt-10 bg-black justify-center  flex flex-col items-center">
      {/* Stepper */}
      <div className="w-full max-w-4xl mt-5 px-4">
        <BookingStepper currentStep={2} />
      </div>

      {/* DateTimePicker */}
      <div className="flex ">

        <div className="w-full max-w-4xl px-4 mt-8">
          <DateTimePicker />
        </div>
        <div>
          <TherapistSelection />
        </div>
      </div>
      <div>
        <StickyCartSummary />
      </div>
    </div>
  );
};

export default ChooseTherapistPage;
