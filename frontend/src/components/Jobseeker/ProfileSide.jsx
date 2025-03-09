import { NavLink } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";

export default function ProfileSide() {
  return (
    <nav>
      <div className="relative flex flex-col">
        <ul className="flex-1">
          <li className="border-b border-[#B3B3B3] ">
            <NavLink to="/jobseeker/update">
              <a
                href="javascript:void(0)"
                className="text-sm flex items-center font-extrabold hover:text-[#BAA898]  hover:border-r-[5px] border-[#BAA898] bg-[#F2F0EF] px-8 py-4 transition-all"
              >
                <FaInfoCircle size={20} className="mr-4 " />
                <span>Basic Information</span>
              </a>
            </NavLink>
          </li>
          <li className="border-b border-[#B3B3B3]">
            <NavLink to="/jobseeker/education/info">
              {" "}
              <a
                href="javascript:void(0)"
                className="text-sm flex items-center font-extrabold hover:text-[#BAA898]  hover:border-r-[5px] border-[#BAA898] bg-[#F2F0EF] px-8 py-4 transition-all"
              >
                <FaGraduationCap size={20} className="mr-4 " />
                <span>Education </span>
              </a>
            </NavLink>
          </li>
          <li className="border-b border-[#B3B3B3] ">
            <NavLink to="/jobseeker/training/info">
              <a
                href="javascript:void(0)"
                className="text-sm flex items-center font-extrabold hover:text-[#BAA898]  hover:border-r-[5px] border-[#BAA898] bg-[#F2F0EF] px-8 py-4 transition-all"
              >
                <FaChalkboardTeacher size={20} className="mr-4 " />
                <span>Training</span>
              </a>
            </NavLink>
          </li>
          <li className="border-b border-[#B3B3B3] ">
            <NavLink to="/jobseeker/work/info">
              <a
                href="javascript:void(0)"
                className="text-sm flex items-center font-extrabold hover:text-[#BAA898]  hover:border-r-[5px] border-[#BAA898] bg-[#F2F0EF] px-8 py-4 transition-all"
              >
                <FaBriefcase size={20} className="mr-4 " />
                <span>Work Experience</span>
              </a>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
