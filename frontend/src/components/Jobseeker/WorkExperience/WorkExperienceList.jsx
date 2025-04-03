import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import ProfileSide from "../ProfileSide";
import axios from "axios";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi"; // import edit and trash icons

export default function WorkExperienceList() {
  const [workexperienceList, setWorkexperienceList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the training data
  useEffect(() => {
    const fetchWorkexperience = async () => {
      try {
        const response = await axios.get("/api/workexperience/", {
          withCredentials: true, // ✅ Ensures cookies are sent
        });
        setWorkexperienceList(response.data.workExperience);
      } catch (error) {
        console.error(
          "Error fetching work Experience records:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkexperience();
  }, []);

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this work experience record?"
      );
      if (confirmDelete) {
        await axios.delete(`/api/workexperience/${id}`, {
          withCredentials: true, // ✅ Ensures cookies are sent
        });
        // Refresh the workExperience list after deletion
        setWorkexperienceList(
          workexperienceList.filter(
            (workExperience) => workExperience.id !== id
          )
        );
      }
    } catch (error) {
      console.error("Error deleting workExperience record:", error);
    }
  };

  if (loading) return <p>Loading workExperience records...</p>;

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
            Work Experience Details
          </div>
          <section className="p-1 bg-[#F2F0EF]">
            <div className="space-y-6 p-4 mx-auto font-[sans-serif]">
              <h2 className="text-xl font-bold mb-4">
                Work Experience Records
              </h2>
              {workexperienceList.length === 0 ? (
                <div>
                  <p>
                    No work Experience records found. Here Add work Experience
                  </p>
                </div>
              ) : (
                <ul>
                  {workexperienceList.map((workExperience) => (
                    <li
                      key={workExperience.id}
                      className="relative p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
                    >
                      {/* Edit Icon */}
                      <NavLink
                        to={`/jobseeker/workexperience/edit/${workExperience.id}`}
                      >
                        <button
                          className="absolute top-3 right-12 text-blue-500 hover:text-blue-700"
                          aria-label="Edit Training"
                        >
                          <FiEdit size={20} />
                        </button>
                      </NavLink>
                      {/* Delete Icon */}
                      <button
                        onClick={() => handleDelete(workExperience.id)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                        aria-label="Delete Training"
                      >
                        <FiTrash size={20} />
                      </button>
                      {/* Training Details */}
                      <p className="text-lg font-semibold text-gray-700">
                        {workExperience.position}
                      </p>
                      <p className="text-gray-600">
                        <strong className="text-gray-800">
                          {workExperience.companyName}
                        </strong>{" "}
                        -{" "}
                        <span className="text-sm text-gray-600">
                          {workExperience.jobLocation}
                        </span>
                      </p>
                      <p className="block text-sm text-gray-500 mt-1">
                        {workExperience.startDate} - {workExperience.endDate}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="border-t mt-8 pt-6 flex justify-center">
                <NavLink to="/jobseeker/workexperience/add">
                  <button
                    type="button"
                    className="py-3 px-6 text-sm font-semibold border-2 border-gray-800 rounded-md text-white bg-gray-800 hover:bg-white hover:text-gray-800 transition-colors"
                  >
                    Add Work Experience
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
