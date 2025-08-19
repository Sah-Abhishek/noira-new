import React from "react";
import useBookingStore from "../../store/bookingStore.jsx";
import TherapistSelectionCard from "./TherapistsSelectionCards";
import TherapistSkeletonCard from "./TherapistCardSkeleton.jsx";
import TherapistSkeletonList from "./TherapistCardSkeleton.jsx";

const TherapistSelection = () => {
  const therapists = useBookingStore((state) => state.therapists);
  const { findingTherapist } = useBookingStore();

  if (!Array.isArray(therapists) || therapists.length === 0) {
    return (
      <div className="bg-slate-800 px-5 py-3 rounded-lg  flex items-center justify-center">
        <p className="text-yellow-400 text-lg">No therapists available</p>
      </div>
    );
  }

  if (findingTherapist) {
    return (
      <TherapistSkeletonList />

    )
  }

  return (
    <div className="grid grid-cols-1 rounded-xl md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-slate-800 ">
      {therapists.map((therapist) => (
        <TherapistSelectionCard key={therapist._id} therapist={therapist} />
      ))}
    </div>
  );
};

export default TherapistSelection;
