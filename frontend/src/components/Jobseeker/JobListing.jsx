import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/jobseekers/jobs");
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
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Application submitted successfully!");
        setAppliedJobs((prev) => [...prev, jobId]);
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Unauthorized - Please log in to apply for this job.");
        navigate("/jobseeker/login"); // Optional: redirect to login page
        return;
      }
      const errorMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "An error occurred while applying.";

      toast.error(errorMessage);

      if (errorMessage.toLowerCase().includes("already applied")) {
        setAppliedJobs((prev) => [...prev, jobId]);
        return;
      }

      if (errorMessage.includes("Update profile")) {
        navigate("/jobseeker/profile");
      } else if (errorMessage.includes("Update education")) {
        navigate("/jobseeker/education/info");
      } else if (errorMessage.includes("Update training")) {
        navigate("/jobseeker/training/info");
      } else if (errorMessage.includes("Update work experience")) {
        navigate("/jobseeker/work-experience/info");
      }
    }
  };

  const handleWishlistToggle = async (jobId) => {
    const alreadyWishlisted = wishlist.includes(jobId);

    if (alreadyWishlisted) {
      toast.error("Job is already in wishlist!"); // 🔴 Red colored toast
      return;
    }

    try {
      const response = await axios.post(
        `/api/whishlist/add`, // ✅ Corrected the typo here
        { jobId },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Job added to wishlist!"); // ✅ Green toast
        setWishlist((prev) => [...prev, jobId]);
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Failed to add job to wishlist";

      toast.error(errorMessage); // 🔴 Red toast for error

      if (errorMessage.toLowerCase().includes("not logged in")) {
        navigate("/jobseeker/login");
      }
    }
  };

  if (loading) {
    return (
      <p className="text-center text-lg font-medium text-gray-400">
        Loading jobs...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mt-5 py-3 bg-[#F2F0EF]">
      <h1 className="text-3xl font-bold text-center text-neutral-800 mb-10">
        Featured Jobs
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">
          No jobs available right now.
        </p>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="relative bg-white border border-[#D4D4D4] rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Wishlist Icon */}
                <button
                  className="absolute top-4 right-4"
                  onClick={() => handleWishlistToggle(job.id)}
                >
                  <FaHeart
                    className={
                      wishlist.includes(job.id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>

                {/* Logo + Info */}
                <div className="flex items-center gap-4">
                  {job.employer?.imageUrl ? (
                    <img
                      src={`http://localhost:5000${job.employer?.imageUrl}`}
                      alt={job.employer?.name}
                      className="w-14 h-14 rounded-full object-cover border border-[#BAA898]"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
                      No Image
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-neutral-800">
                      {job.title}
                    </h2>
                    <p className="text-sm text-[#888]">
                      {job.employer?.user?.name}
                    </p>
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-2 gap-3 text-sm text-neutral-600">
                  <p className="flex items-center gap-1">
                    🏢 {job.employer?.user?.name}
                  </p>
                  <p className="flex items-center gap-1">
                    📍 {job.jobLocation || "N/A"}
                  </p>
                  <p className="flex items-center gap-1">
                    💼 {job.employer?.industryType || "N/A"}
                  </p>
                  <p className="flex items-center gap-1">
                    💰 {job.salary || "N/A"}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {job.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#BAA898] text-white text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Timestamp */}
                <p className="text-xs text-[#999] mt-1">
                  Posted: {new Date(job.createdAt).toLocaleDateString("en-CA")}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    className="text-sm font-medium text-white bg-[#7B9ACC] hover:bg-[#6786bb] px-4 py-2 rounded-lg"
                    onClick={() => navigate(`/jobs/details/${job.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className={`text-sm font-medium px-4 py-2 rounded-lg ${
                      appliedJobs.includes(job.id)
                        ? "bg-gray-400 cursor-not-allowed opacity-60 text-white"
                        : "bg-[#4CAF50] hover:bg-[#449e48] text-white"
                    }`}
                    disabled={appliedJobs.includes(job.id)}
                    onClick={() => handleApplyJob(job.id)}
                  >
                    {appliedJobs.includes(job.id) ? "Applied" : "Apply"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <NavLink to="/jobseeker/all">
          <button>Show All</button>
        </NavLink>
      </div>
    </div>
  );
};

export default JobListing;
