import React, { useState } from "react";
import axios from "axios";

const UpdateStatus = ({ applicationId }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleStatusChange = async () => {
    if (!status) {
      setMessage("❌ Please select a status.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/api/employer/application/${applicationId}/status`,
        { status },
        {
          withCredentials: true, // ✅ Ensures cookies are sent
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("🔥 Error updating status:", error);
      setMessage("❌ Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-bold mb-2">Update Application Status</h3>
      <select
        className="border p-2 rounded w-full mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Rejected">Rejected</option>
        <option value="Accepted">Accepted</option>
      </select>
      <button
        onClick={handleStatusChange}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Updating..." : "Update Status"}
      </button>
      {message && <p className="mt-2 text-gray-600">{message}</p>}
    </div>
  );
};

export default UpdateStatus;
