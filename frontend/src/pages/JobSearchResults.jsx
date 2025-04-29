import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function JobSearchResults() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // Filter state
  const [searchParams] = useSearchParams();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const keyword = searchParams.get("keyword");
  const navigate = useNavigate();

  useEffect(() => {
    if (!keyword) return;
    fetchJobs();
  }, [keyword]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/jobseeker/job/search?keyword=${keyword}`
      );
      const data = await response.json();
      console.log("Fetched data:", data); // Debugging step

      if (!Array.isArray(data)) {
        console.error("API did not return an array:", data);
        setJobs([]); // Fallback to an empty array
      } else {
        // Ensure all jobs have a type property
        const sanitizedJobs = data.map((job) => ({
          ...job,
          type: job.type || "unknown", // Default to 'unknown' if type is missing
        }));
        setJobs(sanitizedJobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]); // Ensure jobs is always an array
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    console.log("Jobs before filtering:", jobs); // Log all jobs for debugging
    return jobs.filter((job) => {
      const jobType = job.jobType.toUpperCase(); // Normalize to uppercase
      const normalizedFilter = filter.toUpperCase(); // Normalize filter to uppercase

      // Handle filtering based on job type
      if (filter === "all") return true;
      return jobType === normalizedFilter;
    });
  }, [jobs, filter]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-[#2b2b2b] mb-6">
        Search Results for "{keyword}"
      </h1>

      {/* Filter Options */}
      <div className="flex gap-4 justify-center mb-4">
        {[
          "all",
          "FULL_TIME",
          "PART_TIME",
          "CONTRACT",
          "INTERNSHIP",
          "FREELANCE",
          "TEMPORARY",
        ].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg ${
              filter === type ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(type)}
          >
            {type.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {!loading && filteredJobs.length === 0 && <p>No jobs found.</p>}
      {!loading && filteredJobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
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
                  className={`text-xl transition ${
                    wishlist.some((item) => item.id === job.id)
                      ? "text-red-500"
                      : "text-[#BAA898] hover:text-[#a2886e]"
                  }`}
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
      )}
    </div>
  );
}
