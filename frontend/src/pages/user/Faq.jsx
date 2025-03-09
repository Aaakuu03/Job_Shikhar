import EmpFaqs from "../../components/Employer/EmpFaqs";
import JobseekerFaqs from "../../components/Jobseeker/JobseekerFaqs";
import { useState } from "react";
import { FaUser, FaBuilding } from "react-icons/fa";

export default function Faq() {
  const [activeTab, setActiveTab] = useState("jobseeker");

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("jobseeker")}
          className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold focus:outline-none ${
            activeTab === "jobseeker"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-600"
          }`}
        >
          <FaUser /> Job Seeker
        </button>

        <button
          onClick={() => setActiveTab("employer")}
          className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold focus:outline-none ${
            activeTab === "employer"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-600"
          }`}
        >
          <FaBuilding /> Employer
        </button>
      </div>

      <div className="p-10 bg-white border border-gray-200 rounded-b-lg shadow-sm">
        {activeTab === "jobseeker" ? <JobseekerFaqs /> : <EmpFaqs />}
      </div>
    </div>
  );
}
