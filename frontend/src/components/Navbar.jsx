import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/logo.png";
import { HiOfficeBuilding } from "react-icons/hi";
import { FaSignInAlt, FaUserTie } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});

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
    <div className="navbar bg-base-100  cursor-pointer px-10 shadow-lg">
      <div className="navbar-start">
        <a className="flex items-center space-x-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-auto 
          "
          />
          <div className="text-3xl font-bold  group">
            <NavLink to="/">
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
        <ul className="menu menu-horizontal   ">
          <li className="dropdown dropdown-center">
            <details>
              <summary>Browse Jobs</summary>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box shadow  p-4 grid grid-cols-4 gap-4 min-w-[800px]  origin-left absolute z-50"
              >
                {categories.map((category) => (
                  <li key={category} className="px-3">
                    <Link
                      to={`/jobs/category/${category.name}`}
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
            <NavLink to="/blogs">
              <a>Blogs</a>
            </NavLink>
          </li>
          <li>
            <NavLink to="/faqs">
              <a>FAQs</a>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              <a>About Us</a>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end  ">
        <NavLink to="/account/login">
          <div
            role="button"
            className="btn m-1 text-xl font-black text-customGray capitalize hover:uppercase"
          >
            <AiOutlineLogin title="Login" />
            Login
          </div>
        </NavLink>

        <NavLink to="/account/register">
          <div
            role="button"
            className="btn m-1 text-xl font-black  text-customGray capitalize hover:uppercase"
          >
            <AiOutlineUserAdd />
            Register
          </div>
        </NavLink>
      </div>
    </div>
  );
}
