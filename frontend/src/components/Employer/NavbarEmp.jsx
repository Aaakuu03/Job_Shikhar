import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "@/assets/logo.png";
import { FaCreditCard, FaHome, FaBuilding } from "react-icons/fa";
import LogoutButton from "../Jobseeker/LogoutButton";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import { getEmployerProfileDetails } from "../../service/jobSeekerService";
export default function NavbarEmp() {
  const storedUser = JSON.parse(Cookies.get("user"));
  const [formData, setFormData] = useState({
    imageUrl: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!storedUser?.id) {
      toast.error("User ID not found. Please log in.");
      navigate("/login");
      return;
    }

    // Fetch existing job seeker information
    const fetchJobSeekerInfo = async () => {
      try {
        const data = await getEmployerProfileDetails(storedUser.id);

        console.log("Fetched data:", data); // Log full data to verify if imageUrl is included

        // Extract imageUrl from companyDetails
        if (data && data.companyDetails && data.companyDetails.imageUrl) {
          setFormData({
            imageUrl: data.companyDetails.imageUrl, // Correctly set form data with imageUrl from companyDetails
          });
        } else {
          console.warn("No image URL found in the companyDetails.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to fetch profile data.");
      }
    };

    fetchJobSeekerInfo();
  }, [storedUser?.id, navigate]);

  return (
    <div className="navbar bg-base-100  cursor-pointer px-10 shadow-2xl ">
      <div className="navbar-start">
        <a className="flex items-center space-x-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-auto 
          "
          />
          <div className="text-3xl font-bold  group">
            <NavLink to="/employer/dashboard">
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
            <NavLink to="/employer/blogs">
              <a>Blogs</a>
            </NavLink>
          </li>
          <li>
            <NavLink to="/employer/faq">FAQs</NavLink>
          </li>
          <li>
            <NavLink to="/employer/about">About Us</NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end  ">
        <NavLink to="/employer/dashboard">
          <button className="btn btn-ghost btn-circle w-20">
            <div className="flex flex-col items-center">
              <div className="indicator">
                <FaHome size={20} />
              </div>
              <span className="btm-nav-label mt-2">Home</span>
            </div>
          </button>
        </NavLink>

        <NavLink to="/employer/price">
          <button className="btn btn-ghost btn-circle w-20">
            <div className="flex flex-col items-center">
              <div className="indicator">
                <FaCreditCard size={20} />
              </div>
              <span className="btm-nav-label mt-2 ">Packages</span>
            </div>
          </button>
        </NavLink>

        <NavLink to="/employer/profile">
          <button className="btn btn-ghost btn-circle w-20">
            <div className="flex flex-col items-center">
              <div className="indicator">
                <FaBuilding size={20} />
              </div>
              <span className="btm-nav-label mt-2 ">Company Profile</span>
            </div>
          </button>
        </NavLink>

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
                  alt={"Profile"}
                  className="w-40 h-40 object-cover rounded-full border border-gray-300"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
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
              <NavLink to="/employer/active">My Active Package </NavLink>
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
