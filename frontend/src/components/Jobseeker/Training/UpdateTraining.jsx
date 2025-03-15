import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateTraining() {
  const { id } = useParams(); // Get the ID from the URL params
  const navigate = useNavigate(); // Navigate after successful update

  const [form, setForm] = useState({
    trainingName: "",
    institute: "",
    duration: "",
    year: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing training data when the component mounts
  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios.get(`/api/training/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(response.data); // Log the response to verify the data
        setForm({
          trainingName: response.data.training.trainingName,
          institute: response.data.training.institute,
          duration: response.data.training.duration,
          year: response.data.training.year,
        });
      } catch (error) {
        console.error("Error fetching training data:", error.response || error);
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchTrainingData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to update the training
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/training/update/${id}`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data); // Log the response to verify the data
      navigate("/jobseeker/training/info"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating training:", error.response || error);
    }
  };

  if (loading) return <p>Loading training data...</p>;

  return (
    <>
      <h2 className="text-3xl mb-3 font-bold">Fill the Training Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6 font-[sans-serif]">
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="trainingName">
            Name of Training
          </label>
          <input
            type="text"
            name="trainingName"
            placeholder="Enter training name"
            value={form.trainingName} // Pre-fill with existing value
            onChange={handleChange}
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="institute">
            Institute Name
          </label>
          <input
            type="text"
            name="institute"
            placeholder="Enter institute name"
            value={form.institute} // Pre-fill with existing value
            onChange={handleChange}
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="duration">
            Duration (in months)
          </label>
          <input
            type="number"
            name="duration"
            placeholder="Enter duration"
            min="1"
            value={form.duration} // Pre-fill with existing value
            onChange={handleChange}
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="year">
            Completion Year
          </label>
          <input
            type="number"
            name="year"
            placeholder="Enter completion year"
            min="1900"
            max="2099"
            value={form.year} // Pre-fill with existing value
            onChange={handleChange}
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-8 px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block rounded-lg shadow-2xl"
        >
          Update
        </button>
      </form>
    </>
  );
}
