import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { getJobSeekerInfo } from "../../service/jobSeekerService";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies easily
export default function BasicInformationForm() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(Cookies.get("user"));

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    dob: "",
    gender: "",
    imageUrl: "", // Store URL for preview
  });
  const [imageFile, setImageFile] = useState(null); // Store file separately

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storedUser?.id) {
      toast.error("User ID not found. Please log in.");
      navigate("/login");
      return;
    }

    // Fetch existing job seeker information
    const fetchJobSeekerInfo = async () => {
      try {
        const data = await getJobSeekerInfo(storedUser.id);
        // Convert ISO date to "YYYY-MM-DD" format
        const formattedDOB = data.dob
          ? new Date(data.dob).toISOString().split("T")[0]
          : "";
        // ✅ Correctly set form data with fetched info
        setFormData({
          name: data.name || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          dob: formattedDOB || "",
          gender: data.gender || "",
          imageUrl: data.imageUrl || "", // Get image from jobseeker table
        });
      } catch (error) {
        toast.error("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobSeekerInfo();
  }, [storedUser?.id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("address", formData.address);
    form.append("dob", formData.dob);
    form.append("gender", formData.gender);
    if (imageFile) {
      form.append("image", imageFile); // ✅ this was wrong before
    }

    try {
      await axios.put(
        `http://localhost:3000/api/jobseeker/profile/${storedUser.id}`,
        form,
        { withCredentials: true }
      );

      toast.success("Profile updated successfully!");
      navigate("/jobseeker/basic-details");
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 m-3 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Current Image
            </label>
            {formData.imageUrl && !imageFile && (
              <img
                src={`http://localhost:5000${formData.imageUrl}`}
                alt="Current menu item"
                className="w-20 h-20 object-cover rounded mt-2"
              />
            )}
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload New Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}
