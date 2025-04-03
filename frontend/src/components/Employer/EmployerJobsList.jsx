import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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

const EmployerJobsList = () => {
  const { jobId } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/employers/jobs/${jobId}`, {
          withCredentials: true, // ✅ Ensures cookies (JWT) are automatically sent
        });
        setFormData({
          ...response.data,
          applicationDeadline:
            response.data.applicationDeadline?.split("T")[0] || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/employers/jobs/${jobId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/employer/jobs"); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update job");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="max-w-3xl bg-[#F2F0EF] mx-auto my-8 p-10 border-2 border-gray-400 rounded-3xl shadow-lg">
      <h1 className="mb-6 text-xl text-[#2B2B2B] font-medium text-center">
        Edit Job
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className="relative mb-4">
          <FaUserTie className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            placeholder="Experience (e.g. 2 years)"
            className="pl-10 w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EmployerJobsList;
