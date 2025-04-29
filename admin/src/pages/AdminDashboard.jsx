import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import RecentJobs from "../components/RecentJobs";
import RecentApplication from "../components/RecentApplication";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("/api/admin/dashboard-stats")
      .then((res) => setStats(res.data))
      .catch(() => toast.error("Failed to fetch dashboard stats"));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      {/* Summary Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-black">
        <SummaryBox title="Total Users" value={stats.totalUsers} />
        <SummaryBox title="Job Seekers" value={stats.totalJobSeekers} />
        <SummaryBox title="Employers" value={stats.totalEmployers} />
        <SummaryBox title="Applications" value={stats.totalApplications} />
        <SummaryBox title="Job Listings" value={stats.totalJobs} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartBox
          title="Applications Per Month"
          data={stats.applicationsPerMonth}
          color="#000000"
        />
        <ChartBox
          title="Jobs Per Month"
          data={stats.jobsPerMonth}
          color="#000000"
        />
      </div>

      {/* Recent Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentJobs jobs={stats.recentJobs} />
        <RecentApplication applications={stats.recentApplications} />
      </div>
    </div>
  );
}

function SummaryBox({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center text-black">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function ChartBox({ title, data, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2 text-black">{title}</h2>
      <LineChart width={350} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone" // Ensures a smooth line graph
          dataKey="count" // The field to plot on the y-axis
          stroke={color} // Line color
          strokeWidth={3} // Thickness of the line
          dot={false} // Optionally remove the dots on the line
        />
      </LineChart>
    </div>
  );
}
