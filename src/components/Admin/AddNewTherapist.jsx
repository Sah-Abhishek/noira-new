import React, { useState, useEffect } from "react";
import { Eye, Upload, User } from "lucide-react";
import FancyDropdown from "../browseTherapist/FancyDropdown";
import axios from "axios";

export default function AddNewTherapist() {
  const [servicesList, setServicesList] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [postalCodeInput, setPostalCodeInput] = useState("");

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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${apiUrl}/services/list`);
        setServicesList(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("username", form.username);
      formData.append("experience", form.experience);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("bio", form.bio);

      Object.entries(form.address).forEach(([key, value]) => {
        formData.append(`address[${key}]`, value);
      });

      form.services.forEach((s) => formData.append("services[]", s));
      form.languages.forEach((l) => formData.append("languages[]", l));
      form.servicesInPostalCodes.forEach((pc) =>
        formData.append("servicesInPostalCodes[]", pc)
      );

      formData.append("acceptingNewClients", form.acceptingNewClients);
      formData.append("gender", form.gender);
      formData.append("isVerified", form.isVerified);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await axios.post(`${apiUrl}/admin/createtherapist`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Therapist saved:", res.data);
      alert("Therapist added successfully!");

      resetForm();
    } catch (err) {
      console.error("Error saving therapist:", err);
      alert("Failed to add therapist. Check console.");
    }
  };

  const resetForm = () => {
    setForm({
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
    setProfileImage(null);
    setPreviewUrl("");
    setPostalCodeInput("");
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Add New Therapist</h2>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm"
        >
          <Eye size={18} /> Preview Profile
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-black rounded-xl p-6 shadow-lg w-full mx-auto"
      >
        {/* Profile Picture */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-black border border-white/20 flex items-center justify-center overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <User className="text-2xl" />
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

        {/* First Name + Last Name + Username */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">First Name</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:ring-1 focus:ring-primary hover:ring-1 hover:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Last Name (Optional)</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:ring-1 focus:ring-primary hover:ring-1 hover:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Username / Display Name
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:ring-1 focus:ring-primary hover:ring-1 hover:ring-primary"
              required
            />
          </div>
        </div>

        {/* Phone + Email + Password */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:ring-1 focus:ring-primary hover:ring-1 hover:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:ring-1 focus:ring-primary hover:ring-1 hover:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="text"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:ring-1 focus:ring-primary hover:ring-1 hover:ring-primary"
              required
            />
          </div>
        </div>

        {/* Experience */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <FancyDropdown
            label="Experience"
            options={["0-1 years", "2-5 years", "5-10 years", "10+ years"]}
            value={form.experience}
            onChange={(val) => handleChange("experience", val)}
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Address</label>
          <div className="grid grid-cols-2 gap-2">
            {["Building_No", "Street", "Locality", "PostTown", "PostalCode"].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={form.address[field]}
                  onChange={(e) => handleChange(field, e.target.value, true)}
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:ring-1 focus:ring-primary hover:ring-1 hover:ring-primary"
                />
              )
            )}
          </div>
        </div>

        {/* Services Offered */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Services Offered</label>
          <div className="grid grid-cols-2 gap-2">
            {servicesList.map((service) => {
              const name = service.name || service;
              const isChecked = form.services.includes(name);
              return (
                <label
                  key={name}
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
                          ? form.services.filter((s) => s !== name)
                          : [...form.services, name]
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">{name}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Services Provided In PostalCodes */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Services Available in Postal Codes
          </label>

          {/* Input + Add button */}
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={postalCodeInput}
              onChange={(e) => setPostalCodeInput(e.target.value)}
              placeholder="Enter postal code"
              className="flex-1 bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:ring-1 focus:ring-primary hover:ring-1 hover:ring-primary"
            />
            <button
              type="button"
              onClick={() => {
                if (postalCodeInput.trim() !== "" && !form.servicesInPostalCodes.includes(postalCodeInput.trim())) {
                  setForm((prev) => ({
                    ...prev,
                    servicesInPostalCodes: [
                      ...prev.servicesInPostalCodes,
                      postalCodeInput.trim(),
                    ],
                  }));
                  setPostalCodeInput("");
                }
              }}
              className="px-3 py-2 rounded-lg bg-primary text-black text-sm hover:bg-primary/80"
            >
              Add
            </button>
          </div>

          {/* Display chips */}
          <div className="flex flex-wrap gap-2">
            {form.servicesInPostalCodes.map((pc, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-gray-800 text-sm flex items-center gap-2"
              >
                {pc}
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      servicesInPostalCodes: prev.servicesInPostalCodes.filter(
                        (_, idx) => idx !== i
                      ),
                    }))
                  }
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Accepting New Clients + Gender */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Accepting New Clients Toggle */}
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
              className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Verified Therapist Toggle */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Verified Therapist
          </label>
          <div className="flex gap-2">
            {["Yes", "No"].map((option) => {
              const isActive =
                (option === "Yes" && form.isVerified) ||
                (option === "No" && !form.isVerified);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleChange("isVerified", option === "Yes")}
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
            className="w-full hover:border-primary bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">
            Short Bio / Description
          </label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:ring-1 focus:ring-primary hover:ring-1 hover:ring-primary"
          />
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setForm({
                fullName: "",
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
                servicesInPostcode: "",
                acceptingNewClients: false,
                gender: "",
                isVerified: false,
                bio: "",
              });
              setProfileImage(null);
              setPreviewUrl("");
            }}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-black font-semibold hover:opacity-90"
          >
            Save Therapist
          </button>
        </div>
      </form>
    </div>
  );
}
