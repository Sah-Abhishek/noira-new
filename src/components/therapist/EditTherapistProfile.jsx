import React, { useState, useEffect } from "react";
import { Upload, User, ChevronDown } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditTherapistProfile() {
  const [servicesList, setServicesList] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

  const therapistId = localStorage.getItem("therapistId");
  const therapistjwt = localStorage.getItem("therapistjwt");

  const londonAreas = [
    "Central London",
    "East London",
    "West London",
    "North London",
    "South London"
  ];

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    experience: "",
    phone: "",
    email: "",
    password: "",
    address: {
      Building_No: "",
      Street: "",
      Locality: "",
      PostTown: "",
      PostalCode: "",
    },
    services: [],
    languages: [],
    servicesInPostalCodes: [],
    acceptingNewClients: false,
    gender: "",
    isVerified: false,
    bio: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${apiUrl}/services/list`, {
          headers: {
            Authorization: `Bearer ${therapistjwt}`,
          },
        });
        setServicesList(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, [apiUrl]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAreaDropdownOpen && !event.target.closest('.area-dropdown')) {
        setIsAreaDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAreaDropdownOpen]);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const res = await axios.get(`${apiUrl}/therapist/${therapistId}`, {
          headers: {
            Authorization: `Bearer ${therapistjwt}`,
          },
        });
        const t = res.data.therapist;

        setForm({
          firstName: t.userId?.name?.first || "",
          lastName: t.userId?.name?.last || "",
          username: t.title || "",
          experience: t.experience || "",
          phone: t.userId?.phone || "",
          email: t.userId?.email || "",
          password: "",
          address: {
            Building_No: t.userId?.address?.Building_No || "",
            Street: t.userId?.address?.Street || "",
            Locality: t.userId?.address?.Locality || "",
            PostTown: t.userId?.address?.PostTown || "",
            PostalCode: t.userId?.address?.PostalCode || "",
          },
          services: t.specializations?.map((s) => s.name) || [],
          languages: t.languages || [],
          servicesInPostalCodes: t.servicesInPostalCodes || [],
          acceptingNewClients: t.active || false,
          gender: t.userId?.gender || "",
          isVerified: t.isVerified || false,
          bio: t.bio || "",
        });

        if (t.userId?.avatar_url) {
          setPreviewUrl(t.userId.avatar_url);
        }
      } catch (err) {
        console.error("Failed to fetch therapist:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTherapist();
  }, [apiUrl]);

  const handleChange = (field, value, nested = false) => {
    if (nested) {
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAreaSelect = (area) => {
    if (!form.servicesInPostalCodes.includes(area)) {
      setForm((prev) => ({
        ...prev,
        servicesInPostalCodes: [...prev.servicesInPostalCodes, area],
      }));
    }
    setIsAreaDropdownOpen(false);
  };

  const removeArea = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      servicesInPostalCodes: prev.servicesInPostalCodes.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      const selectedServiceIds = form.services
        .map((name) => {
          const service = servicesList.find((s) => s.name === name);
          return service?._id;
        })
        .filter(Boolean);

      Object.entries(form).forEach(([key, value]) => {
        if (key === "address") {
          Object.entries(value).forEach(([k, v]) =>
            formData.append(`address[${k}]`, v)
          );
        } else if (key === "services") {
          selectedServiceIds.forEach((id) => formData.append("services[]", id));
        } else if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, v));
        } else {
          formData.append(key, value);
        }
      });

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      await axios.put(
        `${apiUrl}/therapist/edittherapist/${therapistId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${therapistjwt}`,
          },
        }
      );

      toast.success("Therapist updated successfully!");
      navigate("/therapist/therapistdashboard");
    } catch (err) {
      console.error("Error updating therapist:", err);
      toast.error("Failed to update therapist.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading therapist profile...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-primary">
          Edit Therapist Profile
        </h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-black rounded-xl p-4 md:p-6 shadow-lg w-full mx-auto"
      >
        {/* Profile Picture */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black border border-white/20 flex items-center justify-center overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="text-2xl sm:text-3xl" />
            )}
          </div>
          <label className="flex items-center gap-2 px-3 py-1.5 text-sm bg-black border border-white/20 hover:bg-[#111] rounded-lg cursor-pointer">
            <Upload size={16} /> Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Name & Username */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {["firstName", "lastName", "username"].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm text-gray-400 mb-1 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary"
                required={field !== "lastName"}
              />
            </div>
          ))}
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {["phone", "email"].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm text-gray-400 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={field === "email"}
              />
            </div>
          ))}
        </div>

        {/* Experience */}
        <label className="block text-sm text-gray-400 mb-1">Experience</label>
        <input
          type="number"
          value={form.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary mb-4"
          placeholder="Years of experience"
        />

        {/* Address */}
        <label className="block text-sm text-gray-400 mb-2">Address</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {["Building_No", "Street", "Locality", "PostTown", "PostalCode"].map(
            (field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={form.address[field]}
                onChange={(e) => handleChange(field, e.target.value, true)}
                className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary"
              />
            )
          )}
        </div>

        {/* Services */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            Services Offered
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {servicesList.map((service) => {
              const serviceName = service.name;
              const isChecked = form.services.includes(serviceName);
              return (
                <label
                  key={service._id}
                  className={`flex items-center gap-3 cursor-pointer rounded-lg border px-3 py-2 transition-all
                  ${isChecked
                      ? "border-primary bg-primary/10"
                      : "border-white/10 hover:border-primary/50"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() =>
                      handleChange(
                        "services",
                        isChecked
                          ? form.services.filter((s) => s !== serviceName)
                          : [...form.services, serviceName]
                      )
                    }
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all
                    ${isChecked
                        ? "bg-primary text-black"
                        : "bg-black border border-white/20"
                      }`}
                  >
                    {isChecked && (
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">{service.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Services Available in London Areas */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            Services Available in Areas
          </label>

          {/* Dropdown */}
          <div className="relative mb-3 area-dropdown">
            <button
              type="button"
              onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
              className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary hover:ring-1 hover:ring-primary flex items-center justify-between"
            >
              <span className="text-gray-400">Select London Areas</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${isAreaDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isAreaDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-black border border-white/10 rounded-lg shadow-lg">
                {londonAreas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => handleAreaSelect(area)}
                    disabled={form.servicesInPostalCodes.includes(area)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg transition-colors
                      ${form.servicesInPostalCodes.includes(area)
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-white hover:text-primary'
                      }`}
                  >
                    {area}
                    {form.servicesInPostalCodes.includes(area) && (
                      <span className="ml-2 text-xs">(Selected)</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Areas */}
          <div className="flex flex-wrap gap-2">
            {form.servicesInPostalCodes.map((area, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full border border-white/10 bg-primary/10 text-sm flex items-center gap-2"
              >
                {area}
                <button
                  type="button"
                  onClick={() => removeArea(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Accepting & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Accepting */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Accepting New Clients
            </label>
            <div className="flex gap-2">
              {["Yes", "No"].map((option) => {
                const isActive =
                  (option === "Yes" && form.acceptingNewClients) ||
                  (option === "No" && !form.acceptingNewClients);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      handleChange("acceptingNewClients", option === "Yes")
                    }
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-all
                      ${isActive
                        ? "bg-primary text-black border-primary"
                        : "bg-black border-white/10 text-white hover:border-primary/50"
                      }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Languages</label>
          <input
            type="text"
            placeholder="Comma separated (e.g., English, Spanish)"
            value={form.languages.join(", ")}
            onChange={(e) =>
              handleChange(
                "languages",
                e.target.value.split(",").map((l) => l.trim())
              )
            }
            className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary"
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">Short Bio</label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/therapist/therapistdashboard")}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-black font-semibold hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
