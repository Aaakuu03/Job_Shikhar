import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ApplicantList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { jobId } = useParams();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobId) {
        console.error("❌ jobId is undefined or missing!");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employer/application/${jobId}`,
          {
            withCredentials: true, // ✅ Ensures cookies are sent
          }
        );
        setApplications(response.data.applications || []);
      } catch (error) {
        console.error("❌ Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-3">Job Applications</h2>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Applicant Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.applicationId} className="border">
                <td className="border p-2">{app.jobSeeker?.name || "N/A"}</td>
                <td className="border p-2">{app.jobSeeker?.email || "N/A"}</td>
                <td className="border p-2">{app.status}</td>
                <td className="border p-2">
                  <td className="border p-2">
                    <Link
                      to={`/employer/job/${jobId}/application/${app.applicationId}`} // ✅ Matches Route
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </Link>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicantList;
