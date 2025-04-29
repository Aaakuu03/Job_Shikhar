import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppliedJob() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const navigate = useNavigate();
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
                          src={`http://localhost:5000${application.job?.employer?.imageUrl}`}
                          alt="Company Logo"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{application.job?.title}</div>
                      <div className="text-sm opacity-50">
                        {application.job?.jobLocation || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{application.job?.employer?.user?.name || "Unknown"}</td>
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
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() =>
                      navigate(`/jobseeker/jobs/details/${application.job.id}`)
                    }
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedApplication && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {selectedApplication.job?.title}
            </h3>
            <p className="py-2">
              <strong>Company:</strong>{" "}
              {selectedApplication.job?.employer?.user?.name}
            </p>
            <p className="py-1">
              <strong>Location:</strong> {selectedApplication.job?.jobLocation}
            </p>
            <p className="py-1">
              <strong>Description:</strong>{" "}
              {selectedApplication.job?.description}
            </p>
            <p className="py-1">
              <strong>Status:</strong> {selectedApplication.status}
            </p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
