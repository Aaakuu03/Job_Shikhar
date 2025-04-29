import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AdminUserList() {
  const [users, setUsers] = useState([]); // Stores all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Stores filtered users
  const [searchTerm, setSearchTerm] = useState(""); // Search by name or email
  const [userTypeFilter, setUserTypeFilter] = useState(""); // Filter by userType (JOBSEEKER or EMPLOYER)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Users per page

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      setUsers(res.data);
      setFilteredUsers(res.data); // Initially show all users
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  // Filter the users based on search term and selected filters
  const filterUsers = () => {
    let filtered = users;

    // Filter by search term (name or email)
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by userType (either JOBSEEKER or EMPLOYER)
    if (userTypeFilter) {
      filtered = filtered.filter((user) => user.userType === userTypeFilter);
    }

    setFilteredUsers(filtered);
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/api/admin/users/${id}`);
      toast.success("User deleted!");
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id)); // Update filtered list as well
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setUserTypeFilter("");
    setFilteredUsers(users); // Reset to all users
  };

  // Run the filter function when search term or filters change
  useEffect(() => {
    filterUsers();
  }, [searchTerm, userTypeFilter, users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Logic for Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black">All Users</h2>

      {/* Search Bar and Filters */}
      <div className="mb-4">
        <div className="flex gap-4 mb-2">
          {/* Search Input */}
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filter by User Type */}
          <select
            className="p-2 border rounded"
            value={userTypeFilter}
            onChange={(e) => setUserTypeFilter(e.target.value)}
          >
            <option value="">Filter by User Type</option>
            <option value="JOBSEEKER">Jobseeker</option>
            <option value="EMPLOYER">Employer</option>
          </select>
          <button onClick={clearFilters} className="btn">
            Clear Filters
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b font-semibold">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Verified</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors border-b"
              >
                <td className="px-6 py-4">
                  {index + 1 + (currentPage - 1) * usersPerPage}
                </td>
                <td>
                  <p className="px-6 py-4 text-sm text-gray-500">{user.name}</p>
                </td>
                <td>
                  <p className="px-6 py-4 text-sm text-gray-500">
                    {user.email}
                  </p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.userType}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.isVerified ? "✅" : "❌"}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="join grid grid-cols-2 mt-4">
        {/* Previous Button */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="join-item btn btn-outline"
        >
          Previous page
        </button>

        {/* Next Button */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredUsers.length / usersPerPage)
          }
          className="join-item btn btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
}
