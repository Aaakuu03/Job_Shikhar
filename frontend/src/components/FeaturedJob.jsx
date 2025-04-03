import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import hot toast

const FeaturedJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]); // ✅ Store applied job IDs

  const [applicationError, setApplicationError] = useState(null); // State to handle application errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/jobseekers/jobs"); // Backend API call
        setJobs(response.data);
      } catch (err) {
        setError("Failed to load job listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyJob = async (jobId) => {
    try {
      const response = await axios.post(
        `/api/jobseekers/job-application/apply`,
        { jobId },
        {
          withCredentials: true, // ✅ Ensures cookies (JWT) are automatically sent
        }
      );
      console.log("jobId:", jobId);
      if (response.status === 201) {
        toast.success("Application submitted successfully!"); // Success toast
        setAppliedJobs((prev) => [...prev, jobId]); // ✅ Update applied jobs list
      }
    } catch (err) {
      console.error("API Error Response:", err.response); // 🔍 Log full error response

      if (err.response && err.response.data) {
        const errorMessage =
          err.response.data.error ||
          err.response.data.message ||
          "An error occurred while applying.";

        console.log("Extracted Error Message:", errorMessage); // 🔍 Debugging

        // ✅ Check if it's the "Already Applied" error
        if (errorMessage.toLowerCase().includes("already applied")) {
          toast.error("You have already applied for this job.");
          setAppliedJobs((prev) => [...prev, jobId]); // ✅ Update UI to disable button
          return;
        }

        // ✅ Handle other error cases
        toast.error(errorMessage);
        // Redirect based on the error message from the backend
        if (errorMessage.includes("incomplete. Update profile")) {
          navigate("/jobseeker/profile"); // Redirect to Profile page for updating details
        } else if (errorMessage.includes("Update education")) {
          navigate("/jobseeker/education/info"); // Redirect to Education page
        } else if (errorMessage.includes("Update training")) {
          navigate("/jobseeker/training/info"); // Redirect to Training page
        } else if (errorMessage.includes("Update work experience")) {
          navigate("/jobseeker/work-experience/info"); // Redirect to Work Experience page
        }
      } else {
        toast.error("An error occurred while applying.");
      }
    }
  };
  if (loading)
    return (
      <p className="text-center text-lg font-semibold text-gray-300">
        Loading...
      </p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#2b2b2b]">
        Job Listings
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">
          No jobs available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#f2f0ef] text-[#2b2b2b] p-6 rounded-xl shadow-md border border-[#baa898] relative"
            >
              {/* Favorite Button */}
              <button className="absolute top-4 right-4 text-[#b3b3b3] hover:text-red-500">
                <FaHeart />
              </button>

              {/* Logo */}
              {job.logo && (
                <div className="mb-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-md border border-[#baa898]"
                  />
                </div>
              )}

              {/* Job Title & Company */}
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600 text-sm">{job.company}</p>

              {/* Salary & Experience */}
              <div className="flex items-center gap-2 my-3">
                {job.salary && (
                  <span className="bg-[#2b2b2b] text-[#f2f0ef] text-xs px-2 py-1 rounded">
                    {job.salary}
                  </span>
                )}
                {job.experience && (
                  <span className="bg-[#baa898] text-white text-xs px-2 py-1 rounded">
                    {job.experience}
                  </span>
                )}
                {job.type && (
                  <span className="text-[#2b2b2b] text-xs">{job.type}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm">
                {job.description.length > 80
                  ? job.description.slice(0, 80) + "..."
                  : job.description}
              </p>

              {/* Posted Time */}
              <p className="text-gray-500 text-xs mt-3">{job.postedTime}</p>

              {/* Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  className="bg-[#2b2b2b] hover:bg-[#baa898] text-white py-2 px-2 rounded w-1/2"
                  onClick={() => navigate(`/jobs/details/${job.id}`)}
                >
                  View
                </button>
                <button
                  className={`bg-[#b3b3b3] hover:bg-[#2b2b2b] text-white py-2 px-2 rounded w-1/2 ${
                    appliedJobs.includes(job.id)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={appliedJobs.includes(job.id)}
                  onClick={() => handleApplyJob(job.id)}
                >
                  {appliedJobs.includes(job.id) ? "Applied" : "Apply Now →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedJob;
