export default function RecentApplication({ applications }) {
  if (!Array.isArray(applications) || applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2 text-[#2B2B2B]">
          Recent Applications
        </h2>
        <p className="text-sm text-gray-500">No recent applications found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 text-black">
      <h2 className="text-lg font-semibold mb-2 text-black">
        Recent Applications
      </h2>
      <ul className="space-y-2 text-sm text-black">
        {applications.map((app) => (
          <li key={app.id} className="border-b pb-2">
            {app.jobSeeker?.user?.name || "Anonymous"} applied for{" "}
            <strong>{app.job?.title || "a job"}</strong> —{" "}
            {new Date(app.appliedAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
