import { FaUsers, FaEdit, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const EmployerJobs = () => {
  const navigate = useNavigate();
  const handleEditClick = (job) => {
    navigate(`/employer/edit-job/${job.id}`);
  };

  const handleApplicationClick = (job) => {
    navigate(`/employer/applicantlist/${job.id}`);
  };

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming auth token is stored in localStorage
        const response = await axios.get("/api/employers/postedjobs", {
          withCredentials: true, // ✅ Ensures cookies are sent
        });
        setJobs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Posted Jobs</h1>
        <NavLink to="/employer/jobpost">
          {" "}
          <button className="bg-green-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition">
            <FaPlus /> Post a Job
          </button>
        </NavLink>
      </div>

      {/* Jobs Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {jobs.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 text-left">Job Title</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-center">Total Applicants</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-4">{job.title}</td>
                  <td className="p-4">{job.category}</td>
                  <td className="p-4 text-center flex items-center justify-center gap-2">
                    <FaUsers className="text-blue-600" /> {job.applicantsCount}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mr-2"
                      onClick={() => handleApplicationClick(job)}
                    >
                      View Applicants
                    </button>

                    <button
                      className=" text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
                      onClick={() => handleEditClick(job)}
                    >
                      <FaEdit /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerJobs;
