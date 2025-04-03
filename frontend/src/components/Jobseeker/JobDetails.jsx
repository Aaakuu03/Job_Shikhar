import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClock,
  FaBuilding,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/jobseekers/job/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJob();
  }, [jobId]);

  if (!job)
    return (
      <p className="text-center text-gray-500 mt-10">Loading job details...</p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Job Title Section */}
      <div className="text-center border-b pb-4">
        <h1 className="text-3xl font-bold text-blue-600 flex justify-center items-center gap-2">
          <FaBriefcase className="text-blue-600" />
          {job.title}
        </h1>
        <p className="text-gray-500">{job.category}</p>
      </div>

      {/* Job Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaClock className="text-indigo-500" />
            Job Details
          </h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <FaBriefcase className="text-green-500" />
              <span className="font-medium">Experience:</span>{" "}
              {job.experience || "Not specified"}
            </li>
            <li className="flex items-center gap-2">
              <FaClock className="text-purple-500" />
              <span className="font-medium">Job Type:</span> {job.jobType}
            </li>
            <li className="flex items-center gap-2">
              <FaMoneyBillWave className="text-yellow-500" />
              <span className="font-medium">Salary:</span>{" "}
              {job.salary || "Negotiable"}
            </li>
            <li className="flex items-center gap-2">
              <FaCalendarAlt className="text-red-500" />
              <span className="font-medium">Deadline:</span>{" "}
              {new Date(job.applicationDeadline).toDateString()}
            </li>
          </ul>
        </div>

        {/* Employer Information - Fetching User Data */}
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaBuilding className="text-gray-600" />
            Company Information
          </h3>
          <p className="text-gray-700 mt-2">
            <span className="font-medium">Company:</span>{" "}
            {job.employer?.user?.name || "Not available"}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />{" "}
            {job.employer?.user?.email || "Not available"}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FaPhone className="text-green-500" />{" "}
            {job.employer?.user?.phoneNumber || "Not available"}
          </p>
        </div>
      </div>

      {/* Job Description */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Job Description</h3>
        <p className="text-gray-600 mt-2">{job.description}</p>
      </div>

      {/* Apply Button */}
      <div className="mt-6 text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
