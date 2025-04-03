import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard, MdWork } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import logo2 from "@/assets/logo2.png";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className={`bg-[#B3B3B3] shadow-lg h-screen fixed top-0 left-0 py-6 px-6 font-[sans-serif] flex flex-col overflow-auto transition-all duration-300 ${
        collapsed ? "w-20" : "min-w-[220px]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {!collapsed && (
            <img
              src={logo2}
              alt="Logo"
              className="h-20 w-auto transition-all duration-300"
            />
          )}
          {!collapsed && (
            <div className="text-xl font-bold group">
              <NavLink to="/admin">
                <span className="text-customGray group-hover:text-[#D4D4D4]">
                  Job
                </span>
                <span className="text-[#D4D4D4] group-hover:text-customGray">
                  Shikhar
                </span>
              </NavLink>
            </div>
          )}
        </div>
        <IoIosArrowBack
          size={24}
          className={`cursor-pointer text-white transition-transform duration-300 hover:scale-110 ${
            collapsed ? "rotate-180" : ""
          }`}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      <ul className="space-y-8 pl-3 flex-1 mt-10 text-white">
        {[
          { icon: MdDashboard, label: "Dashboard" },
          { icon: FaUsers, label: "Manage Users" },
          { icon: MdWork, label: "Manage Jobs" },
          { icon: BiCategory, label: "Category" },
          { icon: FaDollarSign, label: "Products" },
        ].map((item, index) => (
          <li key={index}>
            <button className="text-white font-semibold text-sm flex items-center rounded-md left-0 hover:left-1 relative transition-all cursor-pointer bg-transparent border-none">
              <item.icon size={18} className="mr-4" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>

      <ul className="space-y-8 pl-3 mt-8">
        <li>
          <button className="text-white font-semibold text-sm flex items-center rounded-md left-0 hover:left-1 relative transition-all cursor-pointer bg-transparent border-none">
            <FiLogOut size={18} className="mr-4" />
            {!collapsed && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </nav>
  );
}
