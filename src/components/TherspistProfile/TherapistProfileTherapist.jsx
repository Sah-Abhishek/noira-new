import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  XCircle,
  Users,
  Calendar,
} from "lucide-react";

const TherapistProfileTherapist = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const therapistId = localStorage.getItem('therapistId');
  console.log("This is the therapistId: ", therapistId);
  const navigate = useNavigate();


  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const resolvedId = therapistId || id; // localStorage takes priority, fallback to URL
        if (!resolvedId) return;

        const res = await axios.get(`${apiUrl}/therapist/${resolvedId}`);
        setTherapist(res.data.therapist || res.data);
      } catch (error) {
        console.error("Failed to fetch therapist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapist();
  }, [therapistId, apiUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Loading therapist profile...
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Therapist not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] mt-10 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto bg-[#121212] rounded-2xl shadow-xl border border-white/10 p-10">
        {/* Header */}
        <div className="flex items-center gap-8 mb-10">
          <img
            src={therapist.userId?.avatar_url || "https://via.placeholder.com/150"}
            alt={therapist.title}
            className="w-32 h-32 rounded-full object-cover border border-white/10 shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold">{therapist.title}</h1>
            <p className="text-gray-400 mt-1">{therapist.bio || "No bio available"}</p>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-2 text-yellow-400">
                <Star size={18} />
                <span>
                  {therapist.rating} ({therapist.ratingCount} reviews)
                </span>
              </div>
              {therapist.isVerified ? (
                <span className="flex items-center gap-1 text-green-500 text-sm">
                  <CheckCircle size={16} /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-500 text-sm">
                  <XCircle size={16} /> Not Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Key Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Contact Info</h2>
            <p className="flex items-center gap-2 text-gray-300">
              <Mail size={16} /> {therapist.userId?.email || "N/A"}
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              <Phone size={16} /> {therapist.userId?.phone || "N/A"}
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              <MapPin size={16} />{" "}
              {therapist.userId?.address?.Street
                ? `${therapist.userId.address.Building_No || ""} ${therapist.userId.address.Street
                }, ${therapist.userId.address.PostTown || ""} ${therapist.userId.address.PostalCode || ""
                }`
                : "Address not available"}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Professional Details</h2>
            <p className="flex items-center gap-2 text-gray-300">
              <Users size={16} /> {therapist.experience || 0} years experience
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              {therapist.acceptingNewClients ? (
                <span className="text-green-500 flex items-center gap-1">
                  <CheckCircle size={16} /> Accepting New Clients
                </span>
              ) : (
                <span className="text-red-500 flex items-center gap-1">
                  <XCircle size={16} /> Not Accepting Clients
                </span>
              )}
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              <Calendar size={16} /> Joined{" "}
              {new Date(therapist.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Specializations</h2>
          <div className="flex flex-wrap gap-2">
            {therapist.specializations?.length > 0 ? (
              therapist.specializations.map((s, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-800 border border-white/10 text-sm rounded-full"
                >
                  {s.name}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No specializations listed</p>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Languages / Regions</h2>
          <div className="flex flex-wrap gap-2">
            {therapist.languages?.length > 0 ? (
              therapist.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-800 border border-white/10 text-sm rounded-full"
                >
                  {lang}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No languages listed</p>
            )}
          </div>
        </div>

        {/* Service Postcodes */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Service Areas</h2>
          <div className="flex flex-wrap gap-2">
            {therapist.servicePostcodes?.length > 0 ? (
              therapist.servicePostcodes.map((code, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-800 border border-white/10 text-sm rounded-full"
                >
                  {code}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No service postcodes listed</p>
            )}
          </div>
        </div>
        <button onClick={() => navigate('/therapist/edittherapistprofile')}
          className="bg-primary text-black px-5 mt-4 py-2 rounded-lg font-semibold shadow-md 
             hover:bg-primary/90 active:scale-95 transition-all duration-200"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default TherapistProfileTherapist;
