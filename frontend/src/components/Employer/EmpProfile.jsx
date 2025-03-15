import { Asterisk, MapPin, User, Phone } from "lucide-react";
import { FaIndustry } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EmpProfile() {
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
              <option value="" disabled selected>
                Select Industry Type
              </option>
              <option value="Tech">Tech</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Retail">Retail</option>
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
