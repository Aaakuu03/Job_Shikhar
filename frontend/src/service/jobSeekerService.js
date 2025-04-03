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
    const response = await axios.get(
      `/api/jobseeker/profiledetails/${userId}`,
      { withCredentials: true } // Ensure cookies (JWT) are sent
    );
    return response.data; // Ensure this returns the entire profile object
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const getPreferredJobInfo = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/jobseeker/preferred-job/${userId}`,
      { withCredentials: true } // Ensure cookies (JWT) are sent
    );
    return response.data.preferredJob;
  } catch (error) {
    console.error("❌ Error fetching preferred job info:", error);
    throw error.response?.data?.error || "Failed to fetch information";
  }
};

export const getEmployerProfileDetails = async (userId) => {
  try {
    const response = await axios.get(`/api/employers/profiledetails/${userId}`);
    return response.data; // Ensure this returns the entire profile object
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const fetchEmployerJobs = async (token) => {
  try {
    const response = await axios.get("/api/employers/jobs", {
      withCredentials: true, // ✅ Ensures cookies are sent
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching employer jobs:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchJobById = async (jobId, token) => {
  try {
    const response = await axios.get(`/api/employers/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching job:", error.response?.data || error.message);
    throw error;
  }
};

export const editJob = async (jobId, jobData, token) => {
  try {
    const response = await axios.put(`/api/employers/jobs/${jobId}`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error.response?.data || error.message);
    throw error;
  }
};
