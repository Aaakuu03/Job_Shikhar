import React, { useState, useEffect } from "react";

export default function JobStats() {
  const [appliedJobsCount, setAppliedJobsCount] = useState(0);
  const [pendingApplicationsCount, setPendingApplicationsCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobCount = async () => {
      try {
        const response = await fetch("/api/jobseekers/applied-jobs/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAppliedJobsCount(data.appliedJobsCount ?? 0); // Ensures default 0
          setPendingApplicationsCount(data.pendingApplicationsCount ?? 0);
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
    <div className="mr-10 ml-10">
      <div className="flex flex-col lg:flex-row gap-5 m-2 justify-center">
        <div className="flex-1 grid h-32 w-32 rounded-box place-items-center bg-[#B3B3B3]">
          <div className="place-items-center">
            <h2 className="text-5xl font-bold">{appliedJobsCount}</h2>
            <h3 className="text-xl font-bold text-gray-800">Job Applied</h3>
          </div>
        </div>

        <div className="flex-1 grid h-32 w-32 rounded-box place-items-center bg-[#D4D4D4]">
          <div className="place-items-center">
            <h2>{pendingApplicationsCount}</h2>
            <h3 className="text-xl font-bold text-gray-800">Heading</h3>
          </div>
        </div>

        <div className="flex-1 grid h-32 w-32 rounded-box place-items-center bg-[#F2F0EF]">
          <div className="place-items-center">
            <h2>0</h2>
            <h3 className="text-xl font-bold text-gray-800">Heading</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
