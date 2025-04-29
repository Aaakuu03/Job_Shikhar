import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bell, User } from "lucide-react";
import SideBar from "../components/SideBar";

export default function AdminLayout() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentDateTime(date.toLocaleString()); // Customize this format as needed
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = collapsed ? 50 : 120;

  return (
    <div className="relative font-[sans-serif] bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`${
          isMobile ? "absolute" : "sticky"
        } top-0 z-50 transition-all duration-300`}
        style={{ width: `${sidebarWidth}px` }}
      >
        <SideBar
          isMobile={isMobile}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </aside>

      {/* Main Content */}
      <main
        className="flex-grow px-6 py-6 transition-all duration-300"
        style={{ marginLeft: isMobile ? 0 : `${sidebarWidth}px` }}
      >
        <div className="flex items-center justify-between w-full text-black mb-6">
          {/* Welcome message */}
          <div
            className={`transition-all duration-500 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-3xl font-semibold text-slate-800 mb-1">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 text-sm mb-2">Welcome back, Admin</p>
            <p className="text-slate-600 text-lg">
              Current Time: {currentDateTime}
            </p>
            <div className="h-[1px] w-full bg-slate-200 rounded"></div>
          </div>

          {/* Notification and Profile Buttons */}
          <div className="flex space-x-4">
            <button
              className={`p-2 rounded-full bg-white shadow hover:shadow-lg flex items-center space-x-2 hover:bg-indigo-50 transition-all duration-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <User className="h-5 w-5 text-slate-600" />
              <span className="hidden md:inline text-sm font-medium text-slate-700">
                My Profile
              </span>
            </button>
          </div>
        </div>

        {/* Main page content */}
        <div className="mt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
