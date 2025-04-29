"use client";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaUserTie,
  FaInfoCircle,
  FaEdit,
} from "react-icons/fa";
import { getEmployerProfileDetails } from "../../../service/jobSeekerService";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies easily

export default function CompanyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id: userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(Cookies.get("user"));
        const id = userId || storedUser?.id;

        if (!id) {
          setError("User ID not found. Please log in.");
          return;
        }

        const data = await getEmployerProfileDetails(id);
        setProfile(data);
      } catch (err) {
        setError(err.message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-5">Loading profile...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;
  if (!profile)
    return <div className="text-center text-gray-500">No profile found.</div>;

  const { basicInformation, companyDetails } = profile;

  return (
    <div className=" p-10">
      <div className="max-w-4xl mx-auto  p-10 bg-white shadow-lg rounded-lg border border-gray-200">
        {/* Company Basic Info */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">{basicInformation.name}</h1>
          <p className="text-gray-600">{companyDetails.industryType}</p>
          {companyDetails.imageUrl ? (
            <img
              src={`http://localhost:5000${companyDetails.imageUrl}`}
              alt={name}
              className="w-40 h-40 object-cover rounded-full border border-gray-300"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
              No Image
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold flex items-center mb-2">
            <FaEnvelope className="mr-2 text-blue-500" /> Contact Information
          </h2>
          <p className="flex items-center">
            <FaPhone className="mr-2" /> {basicInformation.phoneNumber}
          </p>
          <p className="flex items-center">
            <FaEnvelope className="mr-2" /> {basicInformation.email}
          </p>
          <p className="flex items-center">
            <FaMapMarkerAlt className="mr-2" /> {companyDetails.address}
          </p>
        </div>

        {/* Company Details */}
        <div>
          <h2 className="text-xl font-semibold flex items-center mb-2">
            <FaBuilding className="mr-2 text-blue-500" /> Company Details
          </h2>
          <p className="flex items-center">
            <FaBriefcase className="mr-2" /> Size: {companyDetails.companySize}
          </p>
          <p className="flex items-center">
            <FaUserTie className="mr-2" /> Contact Person:{" "}
            {companyDetails.contactName}
          </p>
          <p className="flex items-center">
            <FaPhone className="mr-2" /> {companyDetails.phone}
          </p>
          <p className="mt-4 flex items-start">
            <FaInfoCircle className="mr-2" /> {companyDetails.aboutCompany}
          </p>
        </div>
        {/* Edit Profile Button */}
        <div className="mt-6 text-center">
          <NavLink to={`/employer/edit-profile/${basicInformation.id}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 flex items-center">
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
