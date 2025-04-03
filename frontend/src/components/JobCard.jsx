import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobCard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Job Listings
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">
          No jobs available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg relative"
            >
              {/* Favorite Button */}
              <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                <FaHeart />
              </button>

              {/* Logo */}
              {job.logo && (
                <div className="mb-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-md"
                  />
                </div>
              )}

              {/* Job Title & Company */}
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-400 text-sm">{job.company}</p>

              {/* Salary & Experience */}
              <div className="flex items-center gap-2 my-3">
                {job.salary && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    {job.salary}
                  </span>
                )}
                {job.experience && (
                  <span className="bg-green-400 text-black text-xs px-2 py-1 rounded">
                    {job.experience}
                  </span>
                )}
                {job.type && (
                  <span className="text-blue-400 text-xs">{job.type}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm">
                {job.description.length > 80
                  ? job.description.slice(0, 80) + "..."
                  : job.description}
              </p>

              {/* Posted Time */}
              <p className="text-gray-500 text-xs mt-3">{job.postedTime}</p>

              {/* Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded w-1/2"
                  onClick={() => navigate(`/jobs/details/${job.id}`)}
                >
                  View
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-2 rounded w-1/2"
                  onClick={() => navigate(`/jobs/apply/${job.id}`)}
                >
                  Apply Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobCard;
