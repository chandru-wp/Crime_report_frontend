import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function CrimeForm({ onSuccess }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    photo: ""
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setError("Photo size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, photo: reader.result });
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setData({ ...data, photo: "" });
    setPhotoPreview("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!data.title.trim() || !data.description.trim() || !data.location.trim()) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/api/crimes`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Crime Reported Successfully");
      setData({ title: "", description: "", location: "", photo: "" });
      setPhotoPreview("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to report crime");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white p-6 rounded shadow max-w-md mx-auto"
    >
      <h3 className="text-lg font-semibold mb-4">Report a Crime</h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <input
        className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Crime Title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        required
      />
      <textarea
        className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        rows="4"
        required
      />
      <input
        className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Location"
        value={data.location}
        onChange={(e) => setData({ ...data, location: e.target.value })}
        required
      />
      
      {/* Photo Upload */}
      <div className="mb-3">
        <label className="block text-gray-700 mb-2 font-medium">Photo (Optional)</label>
        {photoPreview ? (
          <div className="relative">
            <img 
              src={photoPreview} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded border"
            />
            <button
              type="button"
              onClick={removePhoto}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
            >
              Remove Photo
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Reporting..." : "Report Crime"}
      </button>
    </form>
  );
}

