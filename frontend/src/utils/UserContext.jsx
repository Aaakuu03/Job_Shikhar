import { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  userType: null, // Add this line
  setUserType: () => {}, // Add this line
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState(null); // Add this line
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("/profile", {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data.profile);
          setUserType(res.data.userType); // Assume userType is included in the response data
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, userType, setUserType, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
