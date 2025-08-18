import DateTimePicker from "../components/ChooseTherapist/DateTimePicker";
import BookingStepper from "../components/ServicesPage/BookingStepper";

const ChooseTherapistPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center">
      {/* Stepper */}
      <div className="w-full max-w-4xl mt-20 px-4">
        <BookingStepper currentStep={2} />
      </div>

      {/* DateTimePicker */}
      <div className="w-full max-w-4xl px-4 mt-8">
        <DateTimePicker />
      </div>
    </div>
  );
};

export default ChooseTherapistPage;
