import axios from "axios";

// Fetch JobSeeker Information by User ID
export const getJobSeekerInfo = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/jobseeker/info/${userId}`,
      { withCredentials: true } // Ensure cookies (JWT) are sent
    );
    return response.data.basicInfo;
  } catch (error) {
    console.error("❌ Error fetching JobSeeker info:", error);
    throw error.response?.data?.error || "Failed to fetch information";
  }
};

export const getJobSeekerProfileDetails = async (userId) => {
  try {
    const response = await axios.get(`/api/jobseeker/profiledetails/${userId}`);
    return response.data; // Ensure this returns the entire profile object
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
