import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";
export default function WorkExperienceForm() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    position: "",
    companyName: "",
    jobLocation: "",
    startDate: "",
    endDate: "",
    description: "",
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
    try {
      const response = await axios.post("/api/workexperience/add", formData, {
        withCredentials: true, // ✅ Ensures cookies are sent
      });
      toast.success("Work experience added successfully!");
      navigate("/jobseeker/workexperience/info");
      console.log(response.data);
    } catch (error) {
      toast.error("Error adding education");
      console.error(error.response?.data || error.message);
    }
  };
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

          <NavLink to="/jobseeker/workexperience/info">
            <button className="px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white rounded-lg shadow-2xl">
              Cancel
            </button>
          </NavLink>
        </div>
      </form>
    </>
  );
}
