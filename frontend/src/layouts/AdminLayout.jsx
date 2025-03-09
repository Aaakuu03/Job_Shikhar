import { Outlet } from "react-router-dom";
import SideBar from "../components/Admin/SideBar";

export default function AdminLayout() {
  return (
    <div className="relative font-[sans-serif] bg-gray-100">
      <aside className=" bg-gray-800 text-white h-full">
        <SideBar />
      </aside>

      {/* Main Content (Pushes Right to Avoid Overlap) */}
      <main className="flex-grow w-full pl-64 p-8 bg-[#F2F0EF] rounded-lg shadow  ">
        <div className="flex items-center justify-between w-full text-black ">
          <button className="p-3 border border-black rounded-lg bg-[#DCE8F7] mb-3">
            Store 1001
          </button>
          <button className="p-3 border border-black  rounded-lg bg-[#DCE8F7] mb-3">
            <div className="flex  items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M15.9998 7C15.9998 9.20914 14.2089 11 11.9998 11C9.79067 11 7.99981 9.20914 7.99981 7C7.99981 4.79086 9.79067 3 11.9998 3C14.2089 3 15.9998 4.79086 15.9998 7Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  ></path>
                  <path
                    d="M11.9998 14C9.15153 14 6.65091 15.3024 5.23341 17.2638C4.48341 18.3016 4.10841 18.8204 4.6654 19.9102C5.2224 21 6.1482 21 7.99981 21H15.9998C17.8514 21 18.7772 21 19.3342 19.9102C19.8912 18.8204 19.5162 18.3016 18.7662 17.2638C17.3487 15.3024 14.8481 14 11.9998 14Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  ></path>
                </svg>
              </div>
              <span>My Profile</span>
            </div>
          </button>
        </div>

        {/* FAQ Accordion Component */}
        <Outlet />
      </main>
    </div>
  );
}
