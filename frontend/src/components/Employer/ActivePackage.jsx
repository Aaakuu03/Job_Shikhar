import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const ActivePackage = () => {
  const [activePackage, setActivePackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivePackage = async () => {
      const storedUser = JSON.parse(Cookies.get("user"));
      const userId = storedUser?.id;

      if (!userId) {
        toast.error("User ID not found. Please log in.");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/employers/active-package`,
          { withCredentials: true }
        );

        // Check if the response contains an active package
        if (res.data && res.data.package) {
          setActivePackage(res.data);
        } else {
          setActivePackage(null); // Ensure activePackage is null if no package is found
        }
      } catch (err) {
        console.error("Error fetching active package:", err);
        setError("Failed to load active package.");
        toast.error("Failed to load active package.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivePackage();
  }, []);

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-md mt-2 mb-2">
      {loading ? (
        <p className="text-center text-gray-500 text-lg">
          Loading active package...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : activePackage ? (
        <div className="flex flex-col items-center space-y-6">
          <h3 className="text-3xl font-semibold text-gray-800">
            Active Package Details
          </h3>
          <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-between mb-4">
              <p className="text-xl font-medium text-gray-600">Package:</p>
              <p className="text-xl text-gray-800">{activePackage.package}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-xl font-medium text-gray-600">Expires On:</p>
              <p className="text-xl text-gray-800">
                {new Date(activePackage.expiresAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No active package found.
        </p>
      )}
    </div>
  );
};

export default ActivePackage;
