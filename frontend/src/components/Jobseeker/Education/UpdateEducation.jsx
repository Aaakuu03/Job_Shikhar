import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom"; // Import useParams and useNavigate
import axios from "axios";
export default function UpdateEducation() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // To navigate after successful update
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, index) => 1950 + index
  );

  const [form, setForm] = useState({
    degree: "",
    courseProgram: "",
    board: "",
    college: "",
    startDate: "",
    endDate: "",
    currentlyStudying: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await axios.get(`/api/education/${id}`, {
          withCredentials: true, // ✅ Ensures cookies are sent
        });

        console.log("Fetched education data:", response.data); // Check if it contains education

        // Ensure you're accessing the education object
        setForm({
          degree: response.data.education.degree || "", // Now using response.data.education
          courseProgram: response.data.education.courseProgram || "",
          board: response.data.education.board || "",
          college: response.data.education.college || "",
          startDate: response.data.education.startDate || "",
          endDate: response.data.education.endDate || "",
          currentlyStudying: Boolean(response.data.education.currentlyStudying),
        });
      } catch (error) {
        console.error("Error fetching education data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/education/update/${id}`, form, {
        withCredentials: true, // ✅ Ensures cookies are sent
      });
      navigate("/jobseeker/education/info"); // Redirect to education page after successful update
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  if (loading) return <p>Loading education data...</p>;
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
            value={form.degree}
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
            <option value="diploma">Diploma</option>
            <option value="bachelor">Bachelor’s Degree</option>
            <option value="master">Master’s Degree</option>
            <option value="mphil">MPhil</option>
            <option value="phd">PhD</option>
          </select>
        </div>

        {/* Course/Program Input */}
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Course/Program</label>
          <input
            type="text"
            name="courseProgram"
            value={form.courseProgram}
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
            value={form.board}
            onChange={handleChange}
            required
            placeholder="Enter your Board Level/University"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>

        {/* Board/University Input */}
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">College</label>
          <input
            type="text"
            name="college"
            value={form.college}
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
            value={form.startDate}
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
          <label className="text-gray-400 w-36 text-sm">End Date</label>
          {!form.currentlyStudying && (
            <select
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            >
              <option value="">Select End Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Checkbox for Currently Studying */}
        <div className="flex items-center">
          <label className="text-gray-400 text-sm">Currently Studying</label>
          <input
            type="checkbox"
            name="currentlyStudying"
            checked={form.currentlyStudying}
            onChange={handleChange}
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="submit"
            className="px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white rounded-lg shadow-2xl"
          >
            Update
          </button>

          <NavLink to="/jobseeker/workexedicationperience/info">
            <button className="px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white rounded-lg shadow-2xl">
              Cancel
            </button>
          </NavLink>
        </div>
      </form>
    </>
  );
}
