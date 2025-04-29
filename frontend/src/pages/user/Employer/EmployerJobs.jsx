import { FaUsers, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
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

  // 👉 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 2;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/employers/postedjobs", {
          withCredentials: true,
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

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/employers/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Refresh the jobs list after deletion
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete job");
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // 👉 Calculate paginated jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // 👉 Handle pagination clicks
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Posted Jobs</h1>
        <NavLink to="/employer/jobpost">
          <button className="bg-[#2B2B2B] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-[#181717] transition">
            <FaPlus /> Post a Job
          </button>
        </NavLink>
      </div>

      {/* Jobs Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {currentJobs.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#E5E5E5] text-gray-700">
                <th className="p-4 text-left">Job Title</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-center">Total Applicants</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-4">{job.title}</td>
                  <td className="p-4">{job.category?.name}</td>
                  <td className="p-4 text-center flex items-center justify-center gap-2">
                    <FaUsers className="text-blue-600" /> {job.applicantsCount}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className="bg-[#404040] hover:bg-[#2B2B2B] text-[#F9FAFB]  px-4 py-2 rounded-lg transition mr-2"
                      onClick={() => handleApplicationClick(job)}
                    >
                      View Applicants
                    </button>

                    <button
                      className=" hover:bg-[#D4D4D4] text-[#2B2B2B] px-4 py-2 rounded-lg transition"
                      onClick={() => handleEditClick(job)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                      onClick={() => handleDeleteJob(job.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-6 text-center">No jobs posted yet.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {jobs.length > jobsPerPage && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployerJobs;
