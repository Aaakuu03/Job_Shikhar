import { NavLink } from "react-router-dom";
import ProfileSide from "../../../components/Jobseeker/ProfileSide";
import axios from "axios";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi"; // import edit and trash icons

export default function EducationList() {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the education data
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get("/api/education/", {
          withCredentials: true, // ✅ Ensures cookies are sent
        });
        setEducationList(response.data.education);
      } catch (error) {
        console.error(
          "Error fetching education records:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this education record?"
      );
      if (confirmDelete) {
        await axios.delete(`/api/education/${id}`, {
          withCredentials: true, // ✅ Ensures cookies are sent
        });
        // Refresh the education list after deletion
        setEducationList(
          educationList.filter((education) => education.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting education record:", error);
    }
  };

  if (loading) return <p>Loading education records...</p>;

  return (
    <div className="m-10">
      <div className="p-4 border border-[#B3B3B3] bg-[#F0EFEF] mb-1">
        <h3 className="text-lg font-semibold">Account Settings</h3>
      </div>
      <div className=" flex border border-[#B3B3B3] bg-[#F2F0EF] ">
        <div className="flex  border border-[#B3B3B3] bg-[#F2F0EF] shadow-xl  font-sans overflow">
          <ProfileSide />
        </div>
        <div className="flex-1 border-b border-[#B3B3B3] bg-[#F2F0EF]">
          <div className="relative border-b border-[#B3B3B3]  p-4 font-bold">
            Education Information
          </div>
          <section className=" p-1 bg-[#F2F0EF] ">
            <div class="space-y-6 p-4  mx-auto font-[sans-serif]">
              <h2 className="text-xl font-bold mb-4">Education Records</h2>
              {educationList.length === 0 ? (
                <div>
                  <p>No education records found. Here Add Education</p>
                </div>
              ) : (
                <ul>
                  {educationList.map((education) => (
                    <li
                      key={education.id}
                      className="relative p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
                    >
                      {/* Edit Icon */}
                      <NavLink to={`/jobseeker/education/edit/${education.id}`}>
                        <button
                          className="absolute top-3 right-12 text-blue-500 hover:text-blue-700"
                          aria-label="Edit Training"
                        >
                          <FiEdit size={20} />
                        </button>
                      </NavLink>
                      {/* Delete Icon */}
                      <button
                        onClick={() => handleDelete(education.id)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                        aria-label="Delete Training"
                      >
                        <FiTrash size={20} />
                      </button>
                      {/* Education Details */}
                      <li className="mb-4">
                        <strong className="text-lg font-semibold text-gray-800">
                          {education.degree}
                        </strong>{" "}
                        -
                        <span className="text-gray-700">
                          {education.courseProgram}
                        </span>
                        <p className="text-gray-600 mt-1">
                          {education.board}, {education.college}
                        </p>
                        <span className="text-sm text-gray-500">
                          ( {education.startDate} -{" "}
                          {education.currentlyStudying
                            ? "Currently Studying"
                            : education.endDate}{" "}
                          )
                        </span>
                      </li>
                    </li>
                  ))}
                </ul>
              )}
              <div className="border-t mt-8 pt-6 flex justify-center">
                <NavLink to="/jobseeker/education/add">
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
