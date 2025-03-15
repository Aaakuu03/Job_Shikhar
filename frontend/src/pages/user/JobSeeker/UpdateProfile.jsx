import { NavLink } from "react-router-dom";
import ProfileSide from "../../../components/Jobseeker/ProfileSide";
import { useEffect, useState } from "react";

import { getJobSeekerInfo } from "../../../service/jobSeekerService";

export default function UpdateProfile() {
  const [jobSeeker, setJobSeeker] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get userId from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser?.id) {
          toast.error("User ID not found. Please log in.");
          return;
        }

        // Fetch JobSeeker info by userId
        const data = await getJobSeekerInfo(storedUser.id);
        setJobSeeker(data);
      } catch (error) {
        toast.error(error || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading job seeker information...</p>;
  return (
    <div className="m-10">
      <div className="p-4 border border-[#B3B3B3] bg-[#F0EFEF] mb-1">
        <h3 className="text-lg font-semibold">Account Settings</h3>
      </div>
      <div className="flex border border-[#B3B3B3] bg-[#F2F0EF]">
        <div className="flex border border-[#B3B3B3] bg-[#F2F0EF] shadow-xl font-sans">
          <ProfileSide />
        </div>
        <div className="flex-1 border-b border-[#B3B3B3] bg-[#F2F0EF]">
          <div className="relative border-b border-[#B3B3B3] p-4 font-bold">
            Basic Information
            <NavLink to="/jobseeker/edit/${jobSeekerId}">
              <button
                type="button"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 py-3 px-4 mr-2 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Edit
              </button>
            </NavLink>
          </div>
          <section className="p-1 bg-[#F2F0EF]">
            <div className="space-y-6 p-4 mx-auto font-[sans-serif]">
              <div>
                <h2>Job Seeker Details</h2>
                <p>
                  <strong>Name:</strong> {jobSeeker.name || "N/A"}
                </p>
                <p>
                  <strong>Phone Number:</strong>{" "}
                  {jobSeeker.phoneNumber || "N/A"}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {jobSeeker.dob
                    ? new Date(jobSeeker.dob).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Gender:</strong> {jobSeeker.gender || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {jobSeeker.address || "N/A"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
