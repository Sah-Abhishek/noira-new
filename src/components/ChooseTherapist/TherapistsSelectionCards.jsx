import React from "react";
import { Star, MapPin, Globe } from "lucide-react";
import useBookingStore from "../../store/bookingStore";
import { useNavigate } from "react-router-dom";

const TherapistSelectionCard = ({ therapist }) => {
  const { setSelectedTherapist, selectedTherapist } = useBookingStore();
  console.log("This is the therapist: ", therapist);
  const navigate = useNavigate();
  console.log("This is the therapist: ", therapist);
  const isSelected = selectedTherapist?._id === therapist?._id ? true : false;
  console.log("This is the value of isSelected: ", isSelected);
  const handleSelect = () => {
    setSelectedTherapist(therapist); // ✅ store therapist in Zustand
    // navigate('/paymentpage');
    console.log("This is the therapist: ", therapist);
  };


  return (
    <div
      className={`bg-[#111] text-white rounded-xl shadow-md p-6 flex flex-col items-center gap-3 
              transition-all duration-300 w-full max-w-xs mx-auto border 
              ${isSelected
          ? "border-primary shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-[1.05]"
          : "border-white/10 hover:scale-[1.02]"}`
      }
    >
      {/* Avatar */}
      < div className="relative" >
        < img
          src={therapist?.userId?.avatar_url || "https://via.placeholder.com/80"
          }
          alt={therapist?.title || "Therapist"}
          className="w-20 h-20 rounded-full border-4 border-primary object-cover"
        />
        <span
          className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-black ${therapist?.acceptingNewClients ? "bg-green-500" : "bg-gray-400"
            }`}
        ></span>
      </div >

      {/* Name */}
      < h2 className="text-lg font-bold text-center leading-tight" >
        {therapist?.title || "Sarah Johnson"}
      </h2 >

      {/* Title */}
      < p className="text-primary text-sm font-medium" > Massage Therapist</p >

      {/* Rating */}
      < div className="flex items-center gap-1 text-sm" >
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-4 h-4 text-primary fill-primary"
            />
          ))}
        </div>
        <span className="font-semibold ml-1">
          {therapist?.rating || "4.9"}
        </span>
        <span className="text-gray-400">
          ({therapist?.ratingCount || "127"} reviews)
        </span>
      </div >

      {/* Specializations */}
      < div className="flex flex-wrap justify-center gap-2" >
        {(therapist?.specializations || []).map((spec, idx) => (
          <span
            key={spec._id || idx}
            className="px-3 py-1 text-xs rounded-full bg-primary text-black font-medium"
          >
            {spec.name}
          </span>
        ))}
      </div >

      {/* Location + Experience */}
      < div className="flex items-center gap-1 text-gray-400 text-sm" >
        <MapPin className="w-4 h-4 text-primary" />
        <span>Manhattan • {therapist?.experience || "5"} years exp</span>
      </div >

      {/* Languages */}
      < div className="flex items-center gap-1 text-gray-400 text-sm" >
        <Globe className="w-4 h-4 text-primary" />
        <span>{therapist?.languages?.join(", ") || "English, Spanish"}</span>
      </div >

      {/* Select Button */}
      < button
        onClick={handleSelect}
        className={` ${isSelected ? "text-white bg-gray-800 hover:text-white bg-gray-800" : "text-black bg-primary"} font-semibold py-3 px-8 rounded-full  transition-colors w-full mt-2`}>
        {isSelected ? "Selected" : "Select Therapist"}
      </button >
    </div >
  );
};

export default TherapistSelectionCard;
