import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaHeart } from "react-icons/fa";

const AllJobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("All");

  const navigate = useNavigate();

  const fetchJobs = async (page, employmentType = "All") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/jobseekers/all?page=${page}&limit=10${
          employmentType !== "All" ? `&employmentType=${employmentType}` : ""
        }`
      );
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setError("Something went wrong while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

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
        navigate("/jobseeker/login");
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
      toast.error("Job is already in wishlist!");
      return;
    }

    try {
      const response = await axios.post(
        `/api/whishlist/add`,
        { jobId },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Job added to wishlist!");
        setWishlist((prev) => [...prev, jobId]);
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Failed to add job to wishlist";

      toast.error(errorMessage);

      if (errorMessage.toLowerCase().includes("not logged in")) {
        navigate("/jobseeker/login");
      }
    }
  };

  useEffect(() => {
    fetchJobs(currentPage, selectedEmploymentType);
  }, [currentPage, selectedEmploymentType]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Job Listings</h1>

      {/* Employment Type Filter Buttons */}
      <div className="flex gap-3 flex-wrap mb-6">
        {[
          "All",
          "FULL_TIME",
          "PART_TIME",
          "CONTRACT",
          "INTERNSHIP",
          "FREELANCE",
          "TEMPORARY",
        ].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full border ${
              selectedEmploymentType === type
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800"
            }`}
            onClick={() => {
              setSelectedEmploymentType(type);
              setCurrentPage(1);
            }}
          >
            {type.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-lg font-medium text-gray-400">
          Loading jobs...
        </p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">
          No jobs available for this filter.
        </p>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="relative bg-white border border-[#D4D4D4] rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
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

                <div className="grid grid-cols-2 gap-3 text-sm text-neutral-600">
                  <p className="flex items-center gap-1">
                    🏢 {job.employer?.user?.name}
                  </p>
                  <p className="flex items-center gap-1">
                    📍 {job.jobLocation || "N/A"}
                  </p>
                  <p className="flex items-center gap-1">
                    💼 {job.employmentType || "N/A"}
                  </p>
                  <p className="flex items-center gap-1">
                    💰 {job.salary || "N/A"}
                  </p>
                </div>

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

                <p className="text-xs text-[#999] mt-1">
                  Posted: {new Date(job.createdAt).toLocaleDateString("en-CA")}
                </p>

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

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-full ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllJobListingPage;
