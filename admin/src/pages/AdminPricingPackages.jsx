import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // Importing react-hot-toast for notifications

const AdminPricingPackages = () => {
  const [packages, setPackages] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [packageData, setPackageData] = useState({
    name: "",
    price: "",
    jobLimit: "",
    duration: "",
  });
  const [packageId, setPackageId] = useState(null);

  useEffect(() => {
    // Fetch existing packages from the database
    const fetchPackages = async () => {
      try {
        const response = await axios.get("/api/admin/packages");
        setPackages(response.data);
      } catch (error) {
        toast.error("Failed to fetch packages");
      }
    };

    fetchPackages();
  }, []);

  // Reset form fields
  const resetForm = () => {
    setPackageData({ name: "", price: "", jobLimit: "", duration: "" });
    setIsUpdating(false);
    setPackageId(null);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setPackageData({ ...packageData, [e.target.name]: e.target.value });
  };

  // Handle form submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, price, jobLimit, duration } = packageData;
      const newPackage = {
        name,
        price: parseInt(price),
        jobLimit: parseInt(jobLimit),
        duration: parseInt(duration),
      };

      let response;
      if (isUpdating) {
        // Update package
        response = await axios.put(
          `/api/admin/update-package/${packageId}`,
          newPackage
        );
        toast.success("Package updated successfully!");
      } else {
        // Add new package
        response = await axios.post("/api/admin/create-package", newPackage);
        toast.success("Package added successfully!");
      }

      // Update package list after success
      setPackages((prevPackages) => [...prevPackages, response.data]);
      resetForm();
      setShowAddModal(false);
      setShowEditModal(false);
    } catch (error) {
      toast.error("Failed to save package");
    }
  };

  // Handle edit button click
  const handleEdit = (pkg) => {
    setPackageData({
      name: pkg.name,
      price: pkg.price,
      jobLimit: pkg.jobLimit,
      duration: pkg.duration,
    });
    setPackageId(pkg.id);
    setIsUpdating(true);
    setShowEditModal(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/delete-package/${id}`);
      setPackages(packages.filter((pkg) => pkg.id !== id));
      toast.success("Package deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Pricing Package Management
      </h2>

      {/* Add Package Button */}
      <button className="btn btn-soft" onClick={() => setShowAddModal(true)}>
        Add Package
      </button>

      {/* Pricing Packages Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-3">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-black">Name</th>
              <th className="px-4 py-2 text-black">Price</th>
              <th className="px-4 py-2 text-black">Job Limit</th>
              <th className="px-4 py-2 text-black">Duration (Days)</th>
              <th className="px-4 py-2 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-b text-center">
                <td className="px-4 py-2 text-black">{pkg.name}</td>
                <td className="px-4 py-2 text-black">{pkg.price}</td>
                <td className="px-4 py-2 text-black">{pkg.jobLimit}</td>
                <td className="px-4 py-2 text-black">{pkg.duration}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="btn btn-neutral btn-dash"
                    onClick={() => handleEdit(pkg)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-dash btn-error"
                    onClick={() => handleDelete(pkg.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-center mb-4 text-black">
              {isUpdating ? "Edit Package" : "Add New Package"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={packageData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={packageData.price}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="jobLimit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Limit
                </label>
                <input
                  id="jobLimit"
                  name="jobLimit"
                  type="number"
                  value={packageData.jobLimit}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration (Days)
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  value={packageData.duration}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                  onClick={() => {
                    resetForm();
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-soft">
                  {isUpdating ? "Update Package" : "Add Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPricingPackages;
