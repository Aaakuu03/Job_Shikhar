import axios from "axios";
import { useEffect, useState } from "react";

export default function AppliedJob() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get("/api/jobseekers/applied-jobs", {
          withCredentials: true, // ✅ Ensures cookies are sent
        });

        setAppliedJobs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) return <p>Loading applied jobs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th>Job</th>
            <th>Company</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appliedJobs.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No applied jobs found.
              </td>
            </tr>
          ) : (
            appliedJobs.map((application) => (
              <tr key={application.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            application.job?.companyLogo ||
                            "https://via.placeholder.com/50"
                          }
                          alt={application.job?.title || "Job"}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{application.job?.title}</div>
                      <div className="text-sm opacity-50">
                        {application.job?.location || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{application.job?.companyName || "Unknown"}</td>
                <td>
                  {application.job?.applicationDeadline
                    ? new Date(
                        application.job.applicationDeadline
                      ).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  <span
                    className={`badge ${
                      application.status === "Approved"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {application.status || "Pending"}
                  </span>
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs">Details</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
