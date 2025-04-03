import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaUserTie,
  FaList,
  FaFileAlt,
  FaCalendarAlt,
  FaClipboardList,
  FaMoneyBillWave,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";

const jobTypes = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "FREELANCE",
  "TEMPORARY",
];

const categoryTypes = [
  "SOFTWARE_DEVELOPMENT",
  "DATA_SCIENCE_AI",
  "NETWORKING_CYBERSECURITY",
  "ACCOUNTING_FINANCE",
  "SALES_MARKETING",
  "HEALTHCARE_MEDICAL",
  "TEACHING_EDUCATION",
  "MECHANICAL_ENGINEERING",
  "CUSTOMER_SUPPORT",
  "GRAPHIC_DESIGN_MULTIMEDIA",
  "HUMAN_RESOURCES",
  "TRANSPORT_LOGISTICS",
];

const JobPostForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    applicationDeadline: "",
    requirement: "",
    jobLocation: "",
    jobType: jobTypes[0],
    salary: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate deadline before submission
  const isValidDeadline = () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    return formData.applicationDeadline >= today;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidDeadline()) {
      toast.error("Application deadline cannot be in the past.");
      return;
    }

    setLoading(true);
    toast.loading("Posting job...", { id: "jobPost" });

    try {
      const formattedDeadline = new Date(
        formData.applicationDeadline
      ).toISOString(); // Convert to ISO format

      const response = await axios.post(
        "/api/employers/jobpost",
        {
          ...formData,
          applicationDeadline: formattedDeadline, // Send correctly formatted deadline
        },
        {
          withCredentials: true, // ✅ Ensures cookies are sent
        }
      );

      toast.success("Job posted successfully!");
      console.log("Success:", response.data);
      navigate("/employer/dashboard");

      // Reset form
      setFormData({
        title: "",
        category: "",
        description: "",
        applicationDeadline: "",
        requirement: "",
        jobLocation: "",
        jobType: jobTypes[0],
        salary: "",
        experience: "",
      });
    } catch (error) {
      console.error(
        "Error posting job:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.error || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl bg-[#F2F0EF] mx-auto my-8 p-10 border-2 border-gray-400 rounded-3xl shadow-lg">
      <h1 className="mb-6 text-xl text-[#2B2B2B] font-medium text-center">
        Post the Job
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className="relative mb-4">
          <FaUserTie className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="pl-10 w-full border p-2 rounded"
            required
          />
        </div>

        {/* Category */}
        <div className="relative mb-4">
          <FaList className="absolute left-3 top-3 text-gray-500" />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="pl-10 w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categoryTypes.map((category, index) => (
              <option key={index} value={category}>
                {category.replace("_", " ")} {/* Display user-friendly text */}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="relative mb-4">
          <FaFileAlt className="absolute left-3 top-3 text-gray-500" />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="pl-10 w-full border p-2 rounded h-24"
            required
          />
        </div>

        {/* Application Deadline */}
        <div className="relative mb-4">
          <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
            className="pl-10 w-full border p-2 rounded"
            required
          />
        </div>

        {/* Requirements */}
        <div className="relative mb-4">
          <FaClipboardList className="absolute left-3 top-3 text-gray-500" />
          <textarea
            name="requirement"
            value={formData.requirement}
            onChange={handleChange}
            placeholder="Job Requirements"
            className="pl-10 w-full border p-2 rounded h-24"
            required
          />
        </div>

        {/* Job Type Selection */}
        <div className="relative mb-4">
          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />

          <input
            type="text"
            name="jobLocation"
            value={formData.jobLocation}
            onChange={handleChange}
            placeholder="Job Location"
            className="pl-10 w-full border p-2 rounded"
            required
          />
        </div>

        {/* Work Mode Selection */}
        <div className="relative mb-4">
          <FaBriefcase className="absolute left-3 top-3 text-gray-500" />

          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="pl-10 w-full border p-2 rounded"
            required
          >
            {jobTypes.map((type, index) => (
              <option key={index} value={type}>
                {type.replace("_", " ")} {/* Display user-friendly text */}
              </option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div className="relative mb-4">
          <FaMoneyBillWave className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="pl-10 w-full border p-2 rounded"
            required
          />
        </div>

        {/* Experience */}
        <div className="relative mb-4">
          <FaUserTie className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience (e.g. 2 years)"
            className="pl-10 w-full border p-2 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-800 text-white py-2 rounded transition"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;
