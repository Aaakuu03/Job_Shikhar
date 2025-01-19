import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function NavbarJob() {
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
        <div className="dropdown dropdown-bottom dropdown-end ">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 text-xl font-black  text-customGray capitalize hover:uppercase"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
                clipRule="evenodd"
              />
            </svg>
            Employer
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow font-semibold"
          >
            <li>
              <a>Login </a>
            </li>
            <li>
              <NavLink to="/employer/register">
                <a> Register</a>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
