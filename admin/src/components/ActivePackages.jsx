import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ActivePackages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/active-packages")
      .then((res) => setPackages(res.data))
      .catch(() => toast.error("Failed to fetch active packages"));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Active Employer Packages
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Employer</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Package</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Duration (Days)</th>
              <th className="px-4 py-2">Job Count</th>
              <th className="px-4 py-2">Expires At</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-t">
                <td className="px-4 py-2">{pkg.employer.user?.name}</td>
                <td className="px-4 py-2">{pkg.employer.user?.email}</td>
                <td className="px-4 py-2">{pkg.package.name}</td>
                <td className="px-4 py-2">Rs. {pkg.package.price}</td>
                <td className="px-4 py-2">{pkg.package.duration}</td>
                <td className="px-4 py-2">{pkg.jobCount}</td>
                <td className="px-4 py-2">
                  {new Date(pkg.expiresAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No active packages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
