import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function TrainingForm() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    trainingName: "",
    institute: "",
    duration: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert 'duration' to an integer before sending it
    const duration = parseInt(formData.duration, 10); // Ensure it's an integer
    const year = parseInt(formData.year, 10); // Ensure 'year' is an integer

    // Log the value of year to verify it is being parsed correctly
    console.log("Parsed Year:", year);

    const dataToSend = {
      ...formData,
      duration: duration, // Use the integer value for duration
      year: year, // Use the integer value for year
    };
    try {
      const response = await axios.post("/api/training/add", dataToSend, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Training details added successfully!");
      navigate("/jobseeker/training/info");
      console.log(response.data);
    } catch (error) {
      toast.error("Error adding training");
      console.error(error.response?.data || error.message);
    }
  };
  return (
    <>
      <h2 className="text-3xl mb-3 font-bold">Fill the Training Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6 font-[sans-serif]">
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="trainingName">
            Name of Training
          </label>
          <input
            type="text"
            name="trainingName"
            value={formData.trainingName}
            onChange={handleChange}
            placeholder="Enter training name"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="instituteName">
            Institute Name
          </label>
          <input
            type="text"
            name="institute"
            value={formData.institute}
            onChange={handleChange}
            placeholder="Enter institute name"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="duration">
            Duration (in months)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration"
            min="1"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label
            className="text-gray-400 w-36 text-sm"
            htmlFor="completionYear"
          >
            Completion Year
          </label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            lassName="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="submit"
            className="px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white rounded-lg shadow-2xl"
          >
            Add
          </button>

          <button className="px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white rounded-lg shadow-2xl">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
