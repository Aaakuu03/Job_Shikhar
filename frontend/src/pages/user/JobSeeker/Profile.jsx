import logo from "@/assets/logo.png";
import {
  FaBrain,
  FaBriefcase,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";

export default function Profile() {
  return (
    <>
      <div className="max-w-5xl mx-auto my-5  p-5 border border-black  shadow-lg rounded-xl">
        <div className="flex justify-start items-start gap-30 mx-5 p-10 border border-b-black">
          <div className="flex w-2/6">
            <img
              src={logo}
              alt="image"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-400 shadow-md"
            />
          </div>
          <div className="flex space-x-2">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-800">Name</h1>
              <h1 className="text-lg text-gray-600">Address</h1>
              <h1 className="text-lg text-gray-600">Phone Number</h1>
              <h1 className="text-lg text-gray-600">Email</h1>
              <h1 className="text-lg text-gray-600">DOB</h1>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-start gap-30 mx-5 p-10 border border-b-black">
          <div className="flex justify-start items-center w-2/6">
            <FaGraduationCap size={30} className="mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <h1>Degree</h1>
              <h1>Board Level</h1>
              <h1>College</h1>
              <h1>Address</h1>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-start gap-30 mx-5 p-10 border border-b-black">
          <div className="flex justify-start items-center w-2/6">
            <FaChalkboardTeacher size={30} className="mr-3 " />
            <h2 className="text-2xl font-semibold text-gray-800">Training</h2>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <h1>Training Name</h1>
              <h1>Training Institute</h1>
              <h1>Duration</h1>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-start gap-30 mx-5 p-10 border border-b-black">
          <div className="flex justify-start items-center w-2/6">
            <FaBriefcase size={30} className="mr-3 " />
            <h2 className="text-2xl font-semibold text-gray-800">
              Work Experience
            </h2>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <h1>Organization Name</h1>
              <h1>Position</h1>
              <h1>Date</h1>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-start gap-30 mx-5 p-10 ">
          <div className="flex justify-start items-center w-2/6">
            <FaBrain size={30} className="mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <h1>Training Name</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
