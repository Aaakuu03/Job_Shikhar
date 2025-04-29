export default function RecentJobs({ jobs }) {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4 text-black">
        <h2 className="text-lg font-semibold mb-2 text-[#2B2B2B]">
          Recent Job Listings
        </h2>
        <p className="text-sm  text-black">No recent jobs found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 text-black">
      <h2 className="text-lg font-semibold mb-2 text-[#2B2B2B]">
        Recent Job Listings
      </h2>
      <ul className="space-y-2 text-sm text-black">
        {jobs.map((job) => (
          <li key={job.id} className="border-b pb-2 text-black">
            <strong>{job.title}</strong> at{" "}
            {job.employer?.user?.name || "Unknown"} —{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
