import { Asterisk, MapPin, User, Phone } from "lucide-react";
import { FaIndustry } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie"; // Import js-cookie to handle cookies easily
export default function EmpProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    industryType: "",
    address: "",
    companySize: "",
    contactName: "",
    phone: "",
    aboutCompany: "",
  });

  // Define the Industry Types enum (this should match your Prisma enum)
  const industryTypes = [
    "IT_SOFTWARE",
    "FINANCE_BANKING",
    "HEALTHCARE",
    "EDUCATION",
    "MANUFACTURING",
    "RETAIL_ECOMMERCE",
    "HOSPITALITY_TOURISM",
    "FOOD_BEVERAGE",
    "CONSTRUCTION_ENGINEERING",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/employers/profile/create",
        formData,
        {
          withCredentials: true, // ✅ Ensures cookies are sent
        }
      );

      // ✅ Check if the request was successful
      if (response.status === 201) {
        toast.success("Profile submitted successfully!");

        // // ✅ Update user data in localStorage (isFormFilled: true)
        // const storedUser = Cookies.get("user"); // Get user data as a string
        // storedUser.isFormFilled = true;
        // storedUser ? JSON.parse(storedUser).id : null; // Parse JSON if it exists
        // ✅ Redirect to dashboard
        navigate("/employer/dashboard");
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error submitting profile:", error);

      // ✅ Handle different error cases
      const errorMessage =
        error.response?.data?.error ||
        "Failed to submit profile. Please try again.";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="max-w-3xl bg-[#F2F0EF] mx-auto my-8 p-10 border-2 border-gray-400 rounded-3xl shadow-lg">
      <h1 className="mb-6 text-xl text-[#2B2B2B] font-medium text-center">
        Please Fill your further information
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Industry Type */}
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Industry Type <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="relative text-gray-500 focus-within:text-gray-900">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaIndustry />
            </div>
            <select
              id="industryType"
              name="industryType"
              value={formData.industryType}
              onChange={handleChange}
              required
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            >
              <option value="">Select Industry</option>
              {industryTypes.map((type) => (
                <option key={type} value={type}>
                  {type.replace(/_/g, " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address */}
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Address <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="relative text-gray-500 focus-within:text-gray-900">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin />
            </div>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              placeholder="Enter company address"
            />
          </div>
        </div>

        {/* Company Size */}
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Company Size <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="relative text-gray-500 focus-within:text-gray-900">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiOutlineOfficeBuilding />
            </div>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              required
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            >
              <option value="" disabled selected>
                Select Company Size
              </option>
              <option value="1-10">1-10 Employees</option>
              <option value="11-50">11-50 Employees</option>
              <option value="51-200">51-200 Employees</option>
              <option value="201-500">201-500 Employees</option>
              <option value="500+">500+ Employees</option>
            </select>
          </div>
        </div>
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-lg font-medium">
            Provide Recruitment focal-person's contact detail
          </label>
        </div>
        {/* Contact Info */}
        <div className="relative flex justify-center items-center gap-3 mb-6">
          {/* Contact Name */}
          <div className="w-1/2">
            <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
              Contact Name <Asterisk className="text-red-500 w-4 h-4" />
            </label>
            <div className="relative text-gray-500 focus-within:text-gray-900">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User />
              </div>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter contact name"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="w-1/2">
            <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
              Phone No <Asterisk className="text-red-500 w-4 h-4" />
            </label>
            <div className="relative text-gray-500 focus-within:text-gray-900">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone />
              </div>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        {/* About Company */}
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            About Company
          </label>
          <textarea
            id="aboutCompany"
            name="aboutCompany"
            value={formData.aboutCompany}
            onChange={handleChange}
            rows="4"
            className="block w-full h-24 pr-5 pl-3 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none"
            placeholder="Tell us about your company"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 h-11 px-5 text-base font-normal shadow-sm text-gray-900 bg-transparent border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
