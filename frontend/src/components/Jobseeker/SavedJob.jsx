import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SavedJob() {
  const [wishlist, setWishlist] = useState([]); // Ensure it's an array
  const navigate = useNavigate();
  const fetchWishlist = async () => {
    try {
      const res = await axios.get("/api/whishlist/get", {
        withCredentials: true,
      });

      // Log the response to check the structure
      console.log("API Response:", res.data);

      // Extract the wishlist array from the response object
      setWishlist(res.data.data || []); // Default to empty array if no data
    } catch (err) {
      toast.error("Failed to load wishlist");
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/api/whishlist/remove/${id}`, {
        withCredentials: true,
      });
      setWishlist((prev) => prev.filter((item) => item.id !== id));
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove job");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Job</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-5">
                No jobs in your wishlist.
              </td>
            </tr>
          ) : (
            wishlist.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={`http://localhost:5000${item.job?.employer?.imageUrl}`}
                          alt="Company Logo"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {item.job?.employer?.companyName || "N/A"}
                      </div>
                      <div className="text-sm opacity-50">
                        {item.job?.jobLocation || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {item.job?.title}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item.job?.jobType}
                  </span>
                </td>
                <td>{item.job?.jobLocation || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-error btn-xs mr-3"
                    onClick={() =>
                      navigate(`/jobseeker/jobs/details/${item.job.id}`)
                    }
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="btn btn-error btn-xs"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
