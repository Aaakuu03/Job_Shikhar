import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function UpdateWorkExperience() {
  const { id } = useParams(); // Get the ID from the URL params
  const navigate = useNavigate(); // Navigate after successful update
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  );
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    position: "",
    companyName: "",
    jobLocation: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    const fetchWorkExperienceData = async () => {
      try {
        const response = await axios.get(`/api/workexperience/${id}`, {
          withCredentials: true, // ✅ Ensures cookies are sent
        });

        console.log("Fetched workexperience data:", response.data); // Check if it contains workexperience

        // Ensure you're accessing the workexperience object
        setFormData({
          position: response.data.workExperience.position || "", // Now using response.data.workexperience
          companyName: response.data.workExperience.companyName || "",
          jobLocation: response.data.workExperience.jobLocation || "",
          description: response.data.workExperience.description || "",
          startDate: response.data.workExperience.startDate || "",
          endDate: response.data.workExperience.endDate || "",
        });
      } catch (error) {
        console.error("Error fetching workExperience data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkExperienceData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/workexperience/update/${id}`, formData, {
        withCredentials: true, // ✅ Ensures cookies are sent
      });
      navigate("/jobseeker/workexperience/info"); // Redirect to workExperience page after successful update
    } catch (error) {
      console.error("Error updating workExperience:", error);
    }
  };

  if (loading) return <p>Loading workExperience data...</p>;
  return (
    <>
      <h2 className="text-3xl mb-3 font-bold">
        Fill the Work Experience Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 font-[sans-serif]">
        <div className="flex items-center">
          <label
            className="text-gray-400 w-36 text-sm"
            htmlFor="organizationName"
          >
            Organization Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter organization name"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="jobLocation">
            Company Address
          </label>
          <input
            type="text"
            name="jobLocation"
            value={formData.jobLocation}
            onChange={handleChange}
            placeholder="Enter job location"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="jobTitle">
            Job Title
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter job title"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="startDate">
            Start Date
          </label>
          <select
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          >
            <option value="">Select Start Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="endDate">
            End Date
          </label>
          <select
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          >
            <option value="">Select End Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="description">
            Job Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
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
