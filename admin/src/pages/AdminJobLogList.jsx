import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminJobLogList() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [categories, setCategories] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 2;
  const navigate = useNavigate();
  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/admin/job-logs");
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (err) {
      toast.error("Failed to fetch job logs");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/employers/category"
      );
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch job categories");
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((job) => job.category === categoryFilter);
    }

    if (jobTypeFilter) {
      filtered = filtered.filter((job) => job.jobType === jobTypeFilter);
    }

    if (dateFilter) {
      const selectedDate = new Date(dateFilter);
      filtered = filtered.filter((job) => {
        const jobDeadline = new Date(job.deadline);
        return (
          jobDeadline.getFullYear() === selectedDate.getFullYear() &&
          jobDeadline.getMonth() === selectedDate.getMonth() &&
          jobDeadline.getDate() === selectedDate.getDate()
        );
      });
    }

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setJobTypeFilter("");
    setDateFilter("");
    setFilteredJobs(jobs);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, categoryFilter, jobTypeFilter, dateFilter, jobs]);

  // Pagination calculations
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📄 Job Logs</h2>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by job title or company"
          className="input input-bordered w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-1/4"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-1/4"
          value={jobTypeFilter}
          onChange={(e) => setJobTypeFilter(e.target.value)}
        >
          <option value="">Select Job Type</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="FREELANCE">Freelance</option>
          <option value="TEMPORARY">Temporary</option>
        </select>

        <input
          type="date"
          className="input input-bordered w-1/4"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <button onClick={clearFilters} className="btn">
          Clear Filters
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b font-semibold">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Job Category</th>
              <th className="px-6 py-4">Deadline</th>
              <th className="px-6 py-4">Employment Type</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job, index) => (
              <tr
                key={job.id}
                className="hover:bg-gray-50 transition-colors border-b"
              >
                <td className="px-6 py-4">
                  {(currentPage - 1) * jobsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-blue-600">
                  {job.title}
                </td>
                <td className="px-6 py-4">{job.companyName}</td>
                <td className="px-6 py-4">{job.category}</td>
                <td className="px-6 py-4">
                  {new Date(job.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 capitalize">{job.jobType}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => navigate(`/admin/details/${job.id}`)}
                    className="btn btn-outline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {currentJobs.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="btn btn-sm"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn btn-sm ${
                currentPage === index + 1 ? "btn-primary" : "btn-primary"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="btn btn-sm"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
