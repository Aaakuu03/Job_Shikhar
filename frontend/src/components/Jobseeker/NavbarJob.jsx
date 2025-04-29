import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/logo.png";
import { FaCog, FaHome, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Notification from "./Notification";
import axios from "axios";
import { getJobSeekerInfo } from "../../service/jobSeekerService";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies easily
import LogoutButton from "./LogoutButton";

export default function NavbarJob() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});
  const storedUser = JSON.parse(Cookies.get("user"));
  const [formData, setFormData] = useState({
    imageUrl: "",
  });

  useEffect(() => {
    if (!storedUser?.id) {
      toast.error("User ID not found. Please log in.");
      navigate("/login");
      return;
    }

    // Fetch existing job seeker information
    const fetchJobSeekerInfo = async () => {
      try {
        const data = await getJobSeekerInfo(storedUser.id);
        // Convert ISO date to "YYYY-MM-DD" format
        const formattedDOB = data.dob
          ? new Date(data.dob).toISOString().split("T")[0]
          : "";
        // ✅ Correctly set form data with fetched info
        setFormData({
          imageUrl: data.imageUrl || "",
        });
      } catch (error) {
        toast.error("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobSeekerInfo();
  }, [storedUser?.id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/employers/category",
          { withCredentials: true }
        );
        console.log("Categories fetched:", response.data); // Log the response
        setCategories(response.data);
      } catch (err) {
        console.error("Error loading categories:", err);
        setError({ message: "Failed to load categories" });
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="navbar bg-base-100  cursor-pointer px-10 shadow-2xl">
      <div className="navbar-start">
        <a className="flex items-center space-x-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-auto 
          "
          />
          <div className="text-3xl font-bold  group">
            <NavLink to="/jobseeker/home">
              <span className="text-customGray group-hover:text-customSil">
                Job
              </span>
              <span className="text-customSil group-hover:text-customGray">
                Shikhar
              </span>
            </NavLink>
          </div>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex font-bold text-customGray ">
        <ul className="menu menu-horizontal   px-1">
          <li>
            <details>
              <summary>Browse Jobs</summary>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box shadow  p-4 grid grid-cols-4 gap-4 min-w-[800px]  origin-left absolute z-50"
              >
                {categories.map((category) => (
                  <li key={category} className="px-3">
                    <Link
                      to={`/jobseeker/jobs/category/${category.name}`}
                      className="block text-sm font-semibold text-gray-700 hover:text-customSil transition whitespace-nowrap cursor-pointer"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <NavLink to="/jobseeker/blogs">
              <a>Blogs</a>
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobseeker/faqs">
              <a>FAQs</a>
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobseeker/about">
              <a>About Us</a>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end  ">
        <NavLink to="/jobseeker/dashboard">
          <button className="btn btn-ghost ">
            <FaHome size={24} />
          </button>
        </NavLink>

        <NavLink to="/jobseeker/profile">
          <button className="btn btn-ghost ">
            <FaUserCircle size={24} />
          </button>
        </NavLink>
        <button className="btn btn-ghost ">
          <Notification />
        </button>

        <div className="  dropdown dropdown-end aria-controls">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar "
          >
            <div className="w-10 rounded-full">
              {formData.imageUrl ? (
                <img
                  src={`http://localhost:5000${formData.imageUrl}`}
                  alt="Profile"
                  className="w-14 h-14 object-cover rounded-full border border-gray-300"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
                  No Image
                </div>
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/jobseeker/basic-details">
                <a className="justify-between">Edit Profile</a>
              </NavLink>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
