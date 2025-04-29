import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PaymentForm from "../../pages/user/Employer/PaymentForm";
import { toast } from "react-hot-toast"; // if you're using toast

const PricingComparision = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [employerId, setEmployerId] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [hasActivePackage, setHasActivePackage] = useState(false);
  const [activePackageDetails, setActivePackageDetails] = useState(null);

  // Fetch available packages
  useEffect(() => {
    const fetchPackages = async () => {
      const storedUser = JSON.parse(Cookies.get("user"));
      const userId = storedUser?.id;

      if (!userId) {
        toast.error("User ID not found. Please log in.");
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/employers/packages",
          {
            withCredentials: true,
          }
        );

        setPackages(res.data.packages);
        setEmployerId(res.data.employerId);
      } catch (err) {
        setError("Failed to load packages");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Check if the employer has an active package
  const checkActivePackage = async (selectedPackage) => {
    try {
      const storedUser = JSON.parse(Cookies.get("user"));
      const userId = storedUser?.id;

      if (!userId) {
        toast.error("User ID not found. Please log in.");
        return;
      }

      // Call the API to check if the employer has an active package
      const res = await axios.get(
        `http://localhost:5000/api/employers/active-package`,
        { withCredentials: true }
      );

      if (res.data.hasActivePackage) {
        setHasActivePackage(true);
        setActivePackageDetails(res.data.activePackage);
        toast.error(
          "You already have an active package! Please wait until it expires."
        );
      } else {
        setHasActivePackage(false);
        setSelectedPackage(selectedPackage);
      }
    } catch (err) {
      console.error("Error checking active package:", err);
      toast.error("Failed to check active package.");
    }
  };

  return (
    <div className="container mx-auto p-8 mb-2">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Recruitment Packages
      </h2>
      <p className="text-xl text-gray-600 text-center mb-2">
        Choose the perfect job posting package to attract qualified candidates
        for your organization.
      </p>

      {/* Display active package details if present */}
      {hasActivePackage &&
        activePackageDetails &&
        activePackageDetails.package && (
          <div className="alert alert-info text-center mb-4">
            <p>
              You already have an active package:{" "}
              <strong>{activePackageDetails.package.name}</strong>! Please wait
              until it expires before purchasing a new one.
            </p>
          </div>
        )}

      <div className="grid md:grid-cols-2 gap-8 p-5">
        {loading && <p>Loading packages...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="card bg-[#F2F0EF] border shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-[1.03] transition-all duration-300"
          >
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-center">
                {pkg.name}
              </h2>
              <p className="text-center text-lg font-semibold text-gray-700">
                NRP {pkg.price} (excl. VAT)
              </p>
              <ul className="mt-4 space-y-2">
                <li>Duration: {pkg.duration} days</li>
                <li>Job Posts: {pkg.jobLimit}</li>
                <li>
                  {pkg.isFeatured
                    ? "✔️ Featured Listing"
                    : "❌ No Featured Listing"}
                </li>
                <li>
                  {pkg.support
                    ? `✔️ ${pkg.support}`
                    : "❌ No dedicated support"}
                </li>
              </ul>
              <div className="mt-6">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => checkActivePackage(pkg)} // Check active package before selecting
                  disabled={hasActivePackage} // Disable button if the user has an active package
                >
                  {hasActivePackage
                    ? "Active Package - Cannot Choose"
                    : "Choose Plan"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Render PaymentForm when a package is selected */}
        {selectedPackage && employerId && (
          <div className="col-span-2 mt-8">
            <PaymentForm
              selectedPackage={selectedPackage}
              employerId={employerId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingComparision;
