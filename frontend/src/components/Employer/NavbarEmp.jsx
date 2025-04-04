import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.png";
import { FaCog, FaHome, FaBuilding } from "react-icons/fa";

export default function NavbarEmp() {
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
        <ul className="menu menu-horizontal   px-1">
          <li>
            <NavLink to="/blogs">
              <a>Blogs</a>
            </NavLink>
          </li>
          <li>
            <a>FAQs</a>
          </li>
          <li>
            <NavLink to="/about">
              <a>About Us</a>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end  ">
        <button className="btn btn-ghost btn-circle w-20">
          <div className="flex flex-col items-center">
            <div className="indicator">
              <FaHome size={20} />
            </div>
            <span className="btm-nav-label mt-2">Home</span>
          </div>
        </button>

        <NavLink to="/employer/setting">
          <button className="btn btn-ghost btn-circle w-20">
            <div className="flex flex-col items-center">
              <div className="indicator">
                <FaCog size={20} />
              </div>
              <span className="btm-nav-label mt-2 ">Setting</span>
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
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/jobseeker/update">
                <a className="justify-between">Edit Profile</a>
              </NavLink>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
