import React from "react";
import {
  FaLaptop,
  FaDollarSign,
  FaHeartbeat,
  FaGraduationCap,
  FaIndustry,
  FaStore,
  FaHotel,
  FaAppleAlt,
  FaTools,
} from "react-icons/fa"; // Importing relevant icons

import CategoryCard from "./CategoryCard"; // Assuming you have this component
// Sample job categories
// Sample job categories with new ones
const jobCategories = [
  { id: 1, name: "IT & Software", icon: <FaLaptop /> },
  { id: 2, name: "Finance & Banking", icon: <FaDollarSign /> },
  { id: 3, name: "Healthcare", icon: <FaHeartbeat /> },
  { id: 4, name: "Education", icon: <FaGraduationCap /> },
  { id: 5, name: "Manufacturing", icon: <FaIndustry /> },
  { id: 6, name: "Retail & Ecommerce", icon: <FaStore /> },
  { id: 7, name: "Hospitality & Tourism", icon: <FaHotel /> },
  { id: 8, name: "Food & Beverage", icon: <FaAppleAlt /> },
  { id: 9, name: "Construction & Engineering", icon: <FaTools /> },
];

export default function JobCategories() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Job Vacancy(s) By Category/s
      </h1>
      <div className="carousel max-w-full overflow-x-auto flex gap-x-4">
        {/* Using 'flex' to align the items horizontally and 'overflow-x-auto' for horizontal scrolling */}
        {jobCategories.map((category) => (
          <div className="carousel-item w-60" key={category.id}>
            {/* Adjust width of the carousel item to ensure they fit inside */}
            <CategoryCard name={category.name} icon={category.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}
