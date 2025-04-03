import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import ProfileSide from "../ProfileSide";
import axios from "axios";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi"; // import edit and trash icons

export default function TrainingList() {
  const [trainingList, setTrainingList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the training data
  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await axios.get("/api/training/", {
          withCredentials: true, // ✅ Ensures cookies are sent
        });
        setTrainingList(response.data.training);
      } catch (error) {
        console.error(
          "Error fetching training records:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTraining();
  }, []);

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this training record?"
      );
      if (confirmDelete) {
        await axios.delete(`/api/training/${id}`, {
          withCredentials: true, // ✅ Ensures cookies are sent
        });
        // Refresh the training list after deletion
        setTrainingList(trainingList.filter((training) => training.id !== id));
      }
    } catch (error) {
      console.error("Error deleting training record:", error);
    }
  };

  if (loading) return <p>Loading training records...</p>;

  return (
    <div className="m-10">
      <div className="p-4 border border-[#B3B3B3] bg-[#F0EFEF] mb-1">
        <h3 className="text-lg font-semibold">Account Settings</h3>
      </div>
      <div className=" flex border border-[#B3B3B3] bg-[#F2F0EF] ">
        <div className="flex border border-[#B3B3B3] bg-[#F2F0EF] shadow-xl font-sans overflow">
          <ProfileSide />
        </div>
        <div className="flex-1 border-b border-[#B3B3B3] bg-[#F2F0EF]">
          <div className="relative border-b border-[#B3B3B3] p-4 font-bold">
            Training Details
          </div>
          <section className="p-1 bg-[#F2F0EF]">
            <div className="space-y-6 p-4 mx-auto font-[sans-serif]">
              <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
                Training Records
              </h2>
              {trainingList.length === 0 ? (
                <div className="text-center text-gray-500">
                  <h2>No training records found.</h2>
                </div>
              ) : (
                <ul>
                  {trainingList.map((training) => (
                    <li
                      key={training.id}
                      className="relative p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
                    >
                      {/* Edit Icon */}
                      <NavLink to={`/jobseeker/training/edit/${training.id}`}>
                        <button
                          className="absolute top-3 right-12 text-blue-500 hover:text-blue-700"
                          aria-label="Edit Training"
                        >
                          <FiEdit size={20} />
                        </button>
                      </NavLink>
                      {/* Delete Icon */}
                      <button
                        onClick={() => handleDelete(training.id)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                        aria-label="Delete Training"
                      >
                        <FiTrash size={20} />
                      </button>
                      {/* Training Details */}
                      <p className="text-lg font-semibold text-gray-700">
                        {training.trainingName}
                      </p>
                      <p className="text-gray-600">
                        {training.institute} | {training.duration} |{" "}
                        {training.year}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="border-t mt-8 pt-6 flex justify-center">
                <NavLink to="/jobseeker/training/add">
                  <button
                    type="button"
                    className="py-3 px-6 text-sm font-semibold border-2 border-gray-800 rounded-md text-white bg-gray-800 hover:bg-white hover:text-gray-800 transition-colors"
                  >
                    Add Training
                  </button>
                </NavLink>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
