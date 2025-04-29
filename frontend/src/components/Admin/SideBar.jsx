import { BiCategory } from "react-icons/bi";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard, MdWork } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import logo2 from "@/assets/logo2.png";

export default function SideBar({ isMobile, collapsed, setCollapsed }) {
  const menuItems = [
    { icon: MdDashboard, label: "Dashboard", to: "/admin" },
    { icon: FaUsers, label: "Manage Users", to: "/admin/users" },
    { icon: MdWork, label: "Manage Jobs", to: "/admin/jobs" },
    { icon: BiCategory, label: "Category", to: "/admin/categories" },
    { icon: FaDollarSign, label: "Products", to: "/admin/products" },
  ];

  return (
    <nav
      className={`bg-[#B3B3B3] text-white shadow-xl transition-all duration-300 h-screen overflow-y-auto flex flex-col ${
        collapsed ? "w-[80px]" : "w-[220px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <img src={logo2} alt="Logo" className="h-10 w-auto" />
          {!collapsed && (
            <span className="text-xl font-bold">
              Job<span className="text-blue-300">Shikhar</span>
            </span>
          )}
        </div>
        <IoIosArrowBack
          size={24}
          className={`cursor-pointer transition-transform duration-300 hover:scale-110 ${
            collapsed ? "rotate-180 ml-auto" : ""
          }`}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Menu */}
      <ul className="flex-1 space-y-4 px-3 mt-6">
        {menuItems.map(({ icon: Icon, label, to }, index) => (
          <li key={index}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-blue-500/20 hover:text-blue-300 ${
                  isActive ? "bg-blue-500/30 text-blue-200" : "text-white"
                }`
              }
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="px-4 pb-6">
        <button className="flex items-center gap-3 text-sm font-medium text-white hover:text-red-400 transition">
          <FiLogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </nav>
  );
}
