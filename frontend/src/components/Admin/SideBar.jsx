import { BiCategory } from "react-icons/bi";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard, MdWork } from "react-icons/md";
import logo2 from "@/assets/logo2.png";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <nav className="bg-[#B3B3B3] shadow-lg h-screen fixed top-0 left-0 min-w-[220px] py-6 px-6 font-[sans-serif] flex flex-col overflow-auto">
      <div className="flex flex-wrap items-center cursor-pointer">
        <a className="flex items-center space-x-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
          <img
            src={logo2}
            alt="Logo"
            className="h-20 w-auto 
          "
          />
          <div className="text-xl font-bold  group">
            <NavLink to="/admin">
              <span className="text-customGray group-hover:text-[#D4D4D4]">
                Job
              </span>
              <span className="text-[#D4D4D4] group-hover:text-customGray">
                Shikhar
              </span>
            </NavLink>
          </div>
        </a>
      </div>

      <ul className="space-y-8 pl-3 flex-1 mt-10 text-white">
        <li>
          <a className="text-white font-semibold text-sm flex items-center rounded-md left-0 hover:left-1 relative transition-all ">
            <MdDashboard size={18} className=" mr-4" />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            className="text-white font-semibold text-sm flex items-center rounded-md left-0 hover:left-1 relative transition-all"
          >
            <FaUsers size={18} className=" mr-4" />

            <span> Manage Users</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            className="text-white font-semibold text-sm flex items-center rounded-md left-0 hover:left-1 relative transition-all"
          >
            <MdWork size={18} className=" mr-4" />
            <span>Manage Jobs</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            className="text-white font-semibold text-sm flex items-center rounded-md left-0 hover:left-1 relative transition-all"
          >
            <BiCategory size={18} className=" mr-4" />

            <span>Category</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            className="text-white font-semibold text-sm flex items-center rounded-md left-0 hover:left-1 relative transition-all"
          >
            <FaDollarSign size={18} className=" mr-4" />
            <span>Products</span>
          </a>
        </li>
      </ul>

      <ul className="space-y-8 pl-3 mt-8">
        <li>
          <a
            href="javascript:void(0)"
            className="text-white font-semibold text-sm flex items-center rounded-md left-0 hover:left-1 relative transition-all"
          >
            <FiLogOut size={18} className=" mr-4" />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
