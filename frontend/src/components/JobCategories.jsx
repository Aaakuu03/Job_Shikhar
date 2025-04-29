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
} from "react-icons/fa";

import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";

// Sample job categories
const jobCategories = [
  { id: 1, name: "IT_SOFTWARE", icon: FaLaptop },
  { id: 2, name: "FINANCE_BANKING", icon: FaDollarSign },
  { id: 3, name: "HEALTHCARE", icon: FaHeartbeat },
  { id: 4, name: "EDUCATION", icon: FaGraduationCap },
  { id: 5, name: "MANUFACTURING", icon: FaIndustry },
  { id: 6, name: "RETAIL_ECOMMERCE", icon: FaStore },
  { id: 7, name: "HOSPITALITY_TOURISM", icon: FaHotel },
  { id: 8, name: "FOOD_BEVERAGE", icon: FaAppleAlt },
  { id: 9, name: "CONSTRUCTION_ENGINEERING", icon: FaTools },
];

export default function JobCategories() {
  // Duplicate items for looping effect
  const items = [...jobCategories, ...jobCategories];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Job Vacancy(s) By Industry Type
      </h1>

      {/* Wrapper to hide overflow */}
      <div className="overflow-hidden relative w-full">
        {/* Animated container with pause-on-hover logic */}
        <div className="group w-max animate-scrollMarquee hover:[animation-play-state:paused] flex gap-4 p-5">
          {items.map((category, index) => (
            <div
              key={index}
              className="w-60 shrink-0"
              onMouseEnter={(e) => {
                e.currentTarget.parentElement.style.animationPlayState =
                  "paused";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.parentElement.style.animationPlayState =
                  "running";
              }}
            >
              <Link to={`/jobs/industry/${category.name.toUpperCase()}`}>
                <CategoryCard name={category.name} icon={category.icon} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
