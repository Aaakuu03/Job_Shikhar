import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context with default values
export const JobseekerContext = createContext({
  jobseeker: null,
  setJobseeker: () => {},
  userType: null,
  setUserType: () => {},
});

// Context Provider Component
export const JobseekerProvider = ({ children }) => {
  const [jobseeker, setJobseeker] = useState({});
  const [userType, setUserType] = useState("JOBSEEKER");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("/jobseekerProfile", { withCredentials: true })
        .then((res) => {
          setJobseeker(res.data.profile);
        })
        .catch((err) => {
          console.error("Error fetching jobseeker data:", err);
        });
    }
  }, []);

  return (
    <JobseekerContext.Provider value={{ jobseeker, setJobseeker, userType }}>
      {children}
    </JobseekerContext.Provider>
  );
};
