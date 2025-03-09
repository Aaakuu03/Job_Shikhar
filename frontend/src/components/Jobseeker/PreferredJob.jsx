import { Calendar, Wand2, Asterisk, Briefcase, MapPin } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PreferredJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skills: "",
    jobType: "",
    dob: "",
    gender: "",
    expectedSalary: "",
    currency: "NRS",
    salaryType: "above",
    salaryFrequency: "monthly",
    address: "",
    preferredJobLocation: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/jobseekers/profile",
        formData,
        { withCredentials: true }
      );

      // ✅ Check if the request was successful
      if (response.status === 201) {
        toast.success("Profile submitted successfully!");

        // ✅ Update user data in localStorage (isFormFilled: true)
        const user = JSON.parse(localStorage.getItem("user"));
        user.isFormFilled = true;
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Redirect to dashboard
        navigate("/jobseeker/dashboard");
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error submitting profile:", error);

      // ✅ Handle different error cases
      const errorMessage =
        error.response?.data?.error ||
        "Failed to submit profile. Please try again.";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="max-w-3xl  bg-[#F2F0EF] mx-auto my-8 p-10 border-2 border-gray-400 rounded-3xl shadow-lg">
      <h1 className="mb-6 text-xl text-[#2B2B2B] font-medium text-center">
        Please Fill your further information
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Skills you possess?
            <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="relative text-gray-500 focus-within:text-gray-900 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Wand2 />
            </div>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              placeholder="Enter your skills"
            />
          </div>
        </div>
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Job Level
            <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="relative text-gray-500 focus-within:text-gray-900 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Briefcase />
            </div>

            <select
              id="level"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            >
              <option value="" disabled selected>
                Choose a job by employment type
              </option>
              <option value="FT">Full Time</option>
              <option value="PT">Part Time</option>
              <option value="IS">Internship</option>
              <option value="FL">Freelance</option>
            </select>
          </div>
        </div>
        <div className="relative mb-6">
          <label
            htmlFor="dob"
            className="flex items-center mb-2 text-gray-600 text-sm font-medium"
          >
            Date of Birth
            <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="relative text-gray-500 focus-within:text-gray-900 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar />
            </div>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Gender
            <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="flex items-center gap-4">
            {["male", "female", "other"].map((gender) => (
              <label key={gender} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleChange}
                  required
                />
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Expected Salary
            <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="flex gap-4">
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="block w-20 h-11 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 text-center focus:outline-none"
            >
              <option value="NRS">NRS</option>
              <option value="USD">USD</option>
            </select>

            <select
              id="salaryType"
              name="salaryType"
              value={formData.salaryType}
              onChange={handleChange}
              className="block w-28 h-11 px-3 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>

            <input
              type="number"
              id="expectedSalary"
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
              className="block w-100 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              placeholder="Enter amount"
            />

            <select
              id="salaryFrequency"
              name="salaryFrequency"
              value={formData.salaryFrequency}
              onChange={handleChange}
              className="block w-28 h-11 px-3 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            >
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
        </div>
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Address
            <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="relative text-gray-500 focus-within:text-gray-900 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin />
            </div>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              placeholder="Enter job location"
            />
          </div>
        </div>
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Job Location
            <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="relative text-gray-500 focus-within:text-gray-900 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin />
            </div>
            <input
              type="text"
              id="location"
              name="preferredJobLocation"
              value={formData.preferredJobLocation}
              onChange={handleChange}
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              placeholder="Enter job location"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 h-11 px-5 text-base font-normal shadow-sm text-gray-900 bg-transparent border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 hover:w-1/2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
