import { useEffect, useState } from "react";
import { FaCheckCircle, FaClipboardList, FaUserFriends } from "react-icons/fa";

export default function PostedJobStats() {
  const [jobStats, setJobStats] = useState({
    totalJobsPosted: 0,
    totalApplicants: 0,
    activeJobsCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobCount = async () => {
      try {
        const response = await fetch("/api/jobseekers/posted-jobs/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setJobStats(data);
        } else {
          setError("Failed to fetch applied job count");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobCount();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex m-3 justify-center items-center">
      <div className="stats bg-base-100 border border-base-300">
        <div className="stat">
          <div className="stat-figure text-primary">
            <FaCheckCircle className="text-green-500 text-lg" />
          </div>
          <div className="stat-title font-bold ">Total Active Jobs</div>
          <div className="stat-value ">{jobStats.activeJobsCount}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <FaClipboardList className="text-blue-500 text-xl" />{" "}
          </div>
          <div className="stat-title font-bold ">Total Job Posted</div>
          <div className="stat-value">{jobStats.totalJobsPosted}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <FaUserFriends className="text-green-500 text-xl" />{" "}
            {/* Represents multiple applicants */}
          </div>
          <div className="stat-title font-bold ">Total Applicant</div>
          <div className="stat-value">{jobStats.totalApplicants}</div>
        </div>
      </div>
    </div>
  );
}
