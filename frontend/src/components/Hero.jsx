import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/jobs/search?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div>
      <div
        className="hero h-50 w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://www.oregon.gov/employ/SiteCollectionImages/LookingForWork.jpg)",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-60 "></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md space-y-6">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="text-lg">
              "Your Personalized Job Search Companion – Helping You Land the
              Right Job, at the Right Time, with the Right Employer."
            </p>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-md">
              <input
                type="text"
                className="grow text-gray-700 outline-none"
                placeholder="Search by title, category, or company"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-600 cursor-pointer hover:svg-black"
                onClick={handleSearch}
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />{" "}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
