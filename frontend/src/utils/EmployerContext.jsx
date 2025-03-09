import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EmployerContext = createContext({
  employer: null,
  setEmployer: () => {},
  userType: null,
  setUserType: () => {},
  isLoading: true,
});

export const EmployerProvider = ({ children }) => {
  const [employer, setEmployer] = useState({});
  const [userType, setUserType] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("/employer/getEmployerProfile", {
          withCredentials: true,
        })
        .then((res) => {
          setEmployer(res.data.profile);
          setUserType(res.data.userType);
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
    <EmployerContext.Provider
      value={{ employer, setEmployer, userType, isLoading, setUserType }}
    >
      {children}
    </EmployerContext.Provider>
  );
};
