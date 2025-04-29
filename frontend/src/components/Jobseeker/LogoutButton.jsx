// components/LogoutButton.jsx
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Backend logout: deletes token from DB and clears cookie
      await axios.post(
        "http://localhost:5000/api/user/logout", // your logout API
        {},
        {
          withCredentials: true, // send cookie
        }
      );

      // Clear frontend cookies manually
      Cookies.remove("jwt", { path: "/" });
      Cookies.remove("user", { path: "/" });

      // Optional: clear any local storage
      localStorage.removeItem("user");

      // Redirect to login
      navigate("/jobseeker/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
