"use client";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies easily

import { getJobSeekerProfileDetails } from "../../../service/jobSeekerService";
import {
  FaBrain,
  FaBriefcase,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaImage,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaEdit,
} from "react-icons/fa";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id: userId } = useParams(); // Get userId from route parameters

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = Cookies.get("user"); // Get user data as a string
        const storedUserId = storedUser ? JSON.parse(storedUser).id : null; // Parse JSON if it exists

        console.log("Stored User ID from Cookie:", storedUserId);

        const id = userId || storedUserId; // Use the stored user ID if route param is missing

        if (!id) {
          setError("User ID not found. Please log in.");
          return;
        }

        // Fetch JobSeeker info by userId
        const data = await getJobSeekerProfileDetails(id);
        setProfile(data);
      } catch (err) {
        setError(err.message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found.</div>;

  const {
    basicInformation: {
      name,
      email,
      phoneNumber,
      dob,
      gender,
      address,
      profileImage,
      expectedSalary,
      jobType,
      preferredJobLocation,
      skills = [],
    },
    education = [],
    training = [],
    workExperience = [],
  } = profile;

  return (
    <div className="max-w-4xl mx-auto my-10 p-10 bg-white shadow-xl rounded-lg border border-gray-300">
      {/* Header Section */}
      <header className="flex items-center gap-10 pb-8 mb-8 border-b border-gray-300">
        {/* Profile Image */}
        <div>
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${name}'s Profile`}
              className="w-40 h-40 object-cover rounded-full border border-gray-300"
            />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center bg-gray-300 rounded-full">
              <FaImage size={50} className="text-gray-600" />
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{name}</h1>
          <p className="text-lg text-gray-600 mt-1">
            {jobType} | {preferredJobLocation}
          </p>
          <p className="text-lg text-gray-600 mt-1">
            Expected Salary: {expectedSalary} NRS/month
          </p>

          <div className="mt-4 text-gray-700">
            <p className="flex items-center gap-2">
              <FaEnvelope /> {email}
            </p>
            <p className="flex items-center gap-2">
              <FaPhone /> {phoneNumber}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> {address}
            </p>
            <p>DOB: {new Date(dob).toLocaleDateString()}</p>
            <p>Gender: {gender}</p>
          </div>
          <NavLink to="/jobseeker/basic-details">
            <button className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700">
              <FaEdit /> Edit Profile
            </button>
          </NavLink>
        </div>
      </header>

      {/* Work Experience */}
      <Section title="Work Experience" icon={FaBriefcase}>
        {workExperience.length > 0 ? (
          workExperience.map((work, index) => (
            <div key={index} className="mb-5">
              <h3 className="text-xl font-semibold">{work.position}</h3>
              <p className="text-gray-600">
                {work.companyName} | {work.jobLocation}
              </p>
              <p className="text-gray-500 italic">
                {work.startDate} - {work.endDate || "Present"}
              </p>
              <p>{work.description}</p>
              <Divider />
            </div>
          ))
        ) : (
          <p>No work experience available.</p>
        )}
      </Section>

      {/* Education */}
      <Section title="Education" icon={FaGraduationCap}>
        {education.length > 0 ? (
          education.map((edu, index) => (
            <div key={index} className="mb-5">
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="text-gray-600">
                {edu.courseProgram} - {edu.college}
              </p>
              <p className="text-gray-500 italic">
                {edu.startDate} - {edu.endDate || "Present"}
              </p>
              <Divider />
            </div>
          ))
        ) : (
          <p>No education records found.</p>
        )}
      </Section>

      {/* Training & Certifications */}
      <Section title="Training & Certifications" icon={FaChalkboardTeacher}>
        {training.length > 0 ? (
          training.map((train, index) => (
            <div key={index} className="mb-5">
              <h3 className="text-xl font-semibold">{train.trainingName}</h3>
              <p className="text-gray-600">
                {train.institute} - {train.year}
              </p>
              <p className="text-gray-500">Duration: {train.duration} months</p>
              <Divider />
            </div>
          ))
        ) : (
          <p>No training records found.</p>
        )}
      </Section>

      {/* Skills */}
      <Section title="Skills" icon={FaBrain}>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p>No skills available.</p>
        )}
      </Section>
    </div>
  );
}

// Reusable Section Component
const Section = ({ title, icon: Icon, children }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-5">
      <Icon size={24} className="text-blue-600" />
      <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

// Divider Component
const Divider = () => <hr className="border-t border-gray-300 my-5" />;
