import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EducationForm() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, index) => 1950 + index
  );

  const [formData, setFormData] = useState({
    degree: "",
    courseProgram: "",
    board: "",
    college: "",
    startDate: "",
    endDate: "",
    currentlyStudying: false,
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
      const response = await axios.post("/api/education/add", formData, {
        withCredentials: true, // ✅ Ensures cookies are sent
      });
      toast.success("Education added successfully!");
      navigate("/jobseeker/education/info");
      console.log(response.data);
    } catch (error) {
      toast.error("Error adding education");
      console.error(error.response?.data || error.message);
    }
  };
  return (
    <>
      <h2 className="text-3xl mb-3 font-bold">Fill the Education Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6 font-[sans-serif]">
        {/* Degree Dropdown */}
        <div className="flex items-center">
          <label htmlFor="degree" className="text-gray-400 w-36 text-sm">
            Degree
          </label>
          <select
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="slc">
              SEE (Secondary Education Examination)/SLC
            </option>
            <option value="plus2">+2 (Higher Secondary - Grade 11 & 12)</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor’s Degree</option>
            <option value="Master">Master’s Degree</option>
            <option value="MPhil">MPhil</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Course/Program Input */}
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Course/Program</label>
          <input
            type="text"
            name="courseProgram"
            value={formData.courseProgram}
            onChange={handleChange}
            placeholder="Enter the program"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>

        {/* Board/University Input */}
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">
            Education Board/University
          </label>
          <input
            type="text"
            name="board"
            value={formData.board}
            onChange={handleChange}
            required
            placeholder="Enter your Board Level/University"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">College</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
            placeholder="Enter your Board Level/University"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>

        {/* Start Date Input */}
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Start Date</label>

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

        {/* End Date Input (Only shown if not currently studying) */}

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">
            End Date (Optional if currently studying)
          </label>

          <select
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={formData.currentlyStudying}
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          >
            <option value="">Select End Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Checkbox for Currently Studying */}
        <div className="flex items-center">
          <label className="text-gray-400 text-sm">Currently Studying</label>
          <input
            type="checkbox"
            name="currentlyStudying"
            checked={formData.currentlyStudying}
            onChange={handleChange}
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
