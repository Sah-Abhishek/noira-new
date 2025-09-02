import React, { useState, useEffect } from "react";
import { Eye, Upload, User } from "lucide-react";
import FancyDropdown from "../browseTherapist/FancyDropdown";
import axios from "axios";

export default function AddNewTherapist() {
  const [servicesList, setServicesList] = useState([]);
  const [profileImage, setProfileImage] = useState(null); // store selected file
  const [previewUrl, setPreviewUrl] = useState(""); // for showing preview

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    experience: "",
    address: "",
    services: [],
    languages: [],
    bio: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch services
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

  // Handle normal form input changes
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle submit with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("username", form.username);
      formData.append("experience", form.experience);
      formData.append("address", form.address);
      formData.append("bio", form.bio);

      // append arrays
      form.services.forEach((s) => formData.append("services[]", s));
      form.languages.forEach((l) => formData.append("languages[]", l));

      // append file if exists
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      console.table("This is the form data: ", formData);

      const res = await axios.post("/admin/addnewtherapists", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Therapist saved:", res.data);
      alert("Therapist added successfully!");

      // reset form
      setForm({
        fullName: "",
        username: "",
        experience: "",
        address: "",
        services: [],
        languages: [],
        bio: "",
      });
      setProfileImage(null);
      setPreviewUrl("");
    } catch (err) {
      console.error("Error saving therapist:", err);
      alert("Failed to add therapist. Check console.");
    }
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

        {/* Full Name + Username */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-2 text-white 
                focus:border-primary focus:ring-1 focus:ring-primary 
                hover:ring-1 hover:ring-primary"
              required
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
              className="w-full bg-black border border-white/10 rounded-lg p-2 text-white 
                focus:border-primary focus:ring-1 focus:ring-primary 
                hover:ring-1 hover:ring-primary"
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
          <label className="block text-sm text-gray-400 mb-1">Current Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full bg-black border border-white/10 rounded-lg p-2 text-white 
              focus:border-primary focus:ring-1 focus:ring-primary 
              hover:ring-1 hover:ring-primary"
            required
          />
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">{name}</span>
                </label>
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
            className="w-full bg-black border border-white/10 rounded-lg p-2 text-white 
              focus:border-primary focus:ring-1 focus:ring-primary 
              hover:ring-1 hover:ring-primary"
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
                address: "",
                services: [],
                languages: [],
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
