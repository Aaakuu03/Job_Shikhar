import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const AdminCategoryJobPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryEditId, setCategoryEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please log in again.");
      return;
    }
    try {
      const res = await api.get("/admin/category/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      if (categoryEditId) {
        await api.put(
          `/admin/category/update/${categoryEditId}`,
          { name: categoryName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Category updated successfully!");
      } else {
        await api.post(
          "/admin/category/create",
          { name: categoryName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Category added successfully!");
      }
      setCategoryName("");
      setCategoryEditId(null);
      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      toast.error("Operation failed. Category might already exist.");
    }
  };

  const handleCategoryEdit = (category) => {
    setCategoryEditId(category.id);
    setCategoryName(category.name);
    setModalOpen(true);
  };

  const handleCategoryDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await api.delete(`/admin/category/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to delete category.");
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
        Manage Job Categories
      </h1>

      {/* Add/Edit Category Button */}
      <div className="text-right mb-6">
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-neutral btn-outline"
        >
          Add Category
        </button>
      </div>

      {/* Category List */}
      <section>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Existing Categories
        </h3>
        <ul className="space-y-4">
          {currentCategories.map((cat) => (
            <li
              key={cat.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100"
            >
              <span className="text-gray-800 font-bold">{cat.name}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleCategoryEdit(cat)}
                  className="btn btn-neutral btn-dash"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCategoryDelete(cat.id)}
                  className="btn btn-dash btn-error"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-neutral"
          >
            Prev
          </button>
          <span className="flex items-center text-black">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === totalPages}
            className="btn btn-neutral"
          >
            Next
          </button>
        </div>
      </section>

      {/* Modal for Add/Edit Category */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4 text-[#2B2B2B]">
              {categoryEditId ? "Edit Category" : "Add Category"}
            </h2>
            <form onSubmit={handleCategorySubmit}>
              <input
                type="text"
                placeholder="Enter category name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
              <div className="flex gap-4 justify-between">
                <button type="submit" className="btn btn-soft">
                  {categoryEditId ? "Update Category" : "Add Category"}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoryJobPage;
