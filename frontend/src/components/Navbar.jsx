import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.png";
import { HiOfficeBuilding } from "react-icons/hi";
import { FaSignInAlt, FaUserTie } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
export default function Navbar() {
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
          <li>
            <details>
              <summary>Browse Jobs</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
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
        <NavLink to="/jobseeker/login">
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
