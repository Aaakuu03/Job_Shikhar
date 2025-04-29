import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobFilter = () => {
  const [filters, setFilters] = useState({
    employmentType: "",
    industryType: "",
    jobLocation: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(filters);
    navigate(`/filtered-jobs?${params.toString()}`);
  };

  return (
    <div className="bg-[#F2F0EF] border border-[#D4D4D4] rounded-2xl px-6 py-8 max-w-7xl mx-auto mt-8 shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row md:items-center gap-4"
      >
        <select
          name="employmentType"
          value={filters.employmentType}
          onChange={handleChange}
          className="w-full md:w-1/4 border border-[#D4D4D4] bg-white px-4 py-2 rounded-xl text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#BAA898]"
        >
          <option value="">Employment Type</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="FREELANCE">Freelance</option>
        </select>

        <select
          name="industryType"
          value={filters.industryType}
          onChange={handleChange}
          className="w-full md:w-1/4 border border-[#D4D4D4] bg-white px-4 py-2 rounded-xl text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#BAA898]"
        >
          <option value="">Industry Type</option>
          <option value="IT_SOFTWARE">IT & Software</option>
          <option value="FINANCE_BANKING">Finance & Banking</option>
          <option value="HEALTHCARE">Healthcare</option>
          <option value="EDUCATION">Education</option>
          <option value="RETAIL_ECOMMERCE">Retail & E-commerce</option>
          <option value="FOOD_BEVERAGE">Food and Beverage</option>
        </select>

        <input
          type="text"
          name="jobLocation"
          value={filters.jobLocation}
          onChange={handleChange}
          placeholder="Location"
          className="w-full md:w-1/4 border border-[#D4D4D4] bg-white px-4 py-2 rounded-xl text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#BAA898]"
        />

        <button
          type="submit"
          className="w-full md:w-1/6 bg-gradient-to-r from-[#BAA898] to-[#7B9ACC] hover:from-[#a2886e] hover:to-[#6786bb] text-white px-6 py-2 rounded-xl transition-all duration-300"
        >
          Filter
        </button>
      </form>
    </div>
  );
};

export default JobFilter;
