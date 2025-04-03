import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function JobSearchResults() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // Filter state
  const [searchParams] = useSearchParams();
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
        setJobs(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]); // Ensure jobs is always an array
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs by type
  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true;
    return job.type.toLowerCase() === filter;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-[#2b2b2b] mb-6">
        Search Results for "{keyword}"
      </h1>

      {/* Filter Options */}
      <div className="flex gap-4 justify-center mb-4">
        {["all", "full-time", "part-time", "remote"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg ${
              filter === type ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {!loading && filteredJobs.length === 0 && <p>No jobs found.</p>}
      {!loading && filteredJobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#f2f0ef] text-[#2b2b2b] p-6 rounded-xl shadow-md border border-[#baa898] relative"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600 text-sm">{job.company}</p>

              <div className="flex items-center gap-2 my-3">
                {job.salary && (
                  <span className="bg-[#2b2b2b] text-[#f2f0ef] text-xs px-2 py-1 rounded">
                    {job.salary}
                  </span>
                )}
                {job.type && (
                  <span className="text-[#2b2b2b] text-xs">{job.type}</span>
                )}
              </div>

              <p className="text-gray-600 text-sm">
                {job.description.length > 80
                  ? job.description.slice(0, 80) + "..."
                  : job.description}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  className="bg-[#2b2b2b] hover:bg-[#baa898] text-white py-2 px-2 rounded w-1/2"
                  onClick={() => navigate(`/jobs/details/${job.id}`)}
                >
                  View
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded w-1/2">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
