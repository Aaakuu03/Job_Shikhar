import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import ProfileSide from "../ProfileSide";

export default function TrainingList() {
  return (
    <div className="m-10">
      <div className="p-4 border border-[#B3B3B3] bg-[#F0EFEF] mb-1">
        <h3 className="text-lg font-semibold">Account Settings</h3>
      </div>
      <div className=" flex border border-[#B3B3B3] bg-[#F2F0EF] ">
        <div className="flex  border border-[#B3B3B3] bg-[#F2F0EF] shadow-xl  font-sans overflow">
          <ProfileSide />
        </div>
        <div className="flex-1 border-b border-[#B3B3B3] bg-[#F2F0EF]">
          <div className="relative border-b border-[#B3B3B3]  p-4 font-bold">
            Training Details
            <NavLink to="/jobseeker/training/edit">
              <button
                type="button"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 py-3 px-4  mr-2 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Edit
              </button>
            </NavLink>
          </div>
          <section className=" p-1 bg-[#F2F0EF] ">
            <div class="space-y-6 p-4  mx-auto font-[sans-serif]">
              <div class=" relative flex flex-col justify-start  border-t-2 border-b-2 focus:border-[#333]  p-1">
                <label class="text-gray-400 w-36 text-lg">Training Name</label>
                <label class="text-gray-400 w-36 text-base ">
                  Training Institute
                </label>
                <label class="text-gray-400 w-36 text-sm">Duration</label>
                <label class="text-gray-400 w-36 text-sm">Date</label>

                <button
                  type="button"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 py-3 px-4  mr-2 text-sm tracking-wider "
                >
                  <AiOutlineClose size={20} className="" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
