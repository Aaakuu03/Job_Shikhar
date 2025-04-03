import { Asterisk, MapPin, User, Phone } from "lucide-react";
import { FaIndustry } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get userId from URL
import Cookies from "js-cookie"; // Import js-cookie to handle cookies easily
import { getEmployerProfileDetails } from "../../service/jobSeekerService";

export default function EditEmpProfile() {
  const navigate = useNavigate();
  const { userId: userIdFromParams } = useParams(); // Get userId from URL params
  // Get user ID from cookie
  const storedUser = JSON.parse(Cookies.get("user"));
  const id = storedUser?.id || userIdFromParams; // Fallback to URL param if available
  if (!id) {
    toast.error("User ID not found. Please log in.");
    return;
  }
  const [formData, setFormData] = useState({
    industryType: "",
    address: "",
    companySize: "",
    contactName: "",
    phone: "",
    aboutCompany: "",
  });

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

  // Fetch employer data to prefill form
  // Fetch employer data to prefill form
  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        // Fetch employer profile using the id
        const response = await getEmployerProfileDetails(id);
        console.log("Fetched Profile Data:", response);
        if (response && response.companyDetails) {
          setFormData({
            industryType: response.companyDetails.industryType || "",
            address: response.companyDetails.address || "",
            companySize: response.companyDetails.companySize || "",
            contactName: response.companyDetails.contactName || "",
            phone: response.companyDetails.phone || "",
            aboutCompany: response.companyDetails.aboutCompany || "",
          });
        } else {
          toast.error("No employer data found.");
        }
      } catch (error) {
        console.error("Error fetching employer profile:", error);
        toast.error("Failed to fetch employer profile.");
      }
    };
    fetchEmployerData();
  }, [userIdFromParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/employers/profile/${id}`,
        formData,
        {
          withCredentials: true, // ✅ Ensures cookies are sent
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        navigate("/employer/profile");
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
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
              <option value="" disabled>
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

        {/* Contact Name */}
        <div className="relative mb-6">
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
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Phone No <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="relative text-gray-500 focus-within:text-gray-900">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Phone />
            </div>
            <input
              type="tel"
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

        {/* About Company */}
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            About Company <Asterisk className="text-red-500 w-4 h-4" />
          </label>
          <div className="relative text-gray-500 focus-within:text-gray-900">
            <textarea
              id="aboutCompany"
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleChange}
              required
              className="block w-full h-32 pr-5 pl-3 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none"
              placeholder="Tell us about your company"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#00B8D4] hover:bg-[#02A7C5] text-white font-medium py-2.5 px-12 rounded-full"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
