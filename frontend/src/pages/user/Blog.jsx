import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import blogs from "@/data/cvData.json";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/blogs.json")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <div className="bg-white font-sans p-4">
      <div className="max-w-5xl max-lg:max-w-3xl max-md:max-w-sm mx-auto">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block">
            LATEST BLOGS
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex max-lg:flex-col bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-[1.03] transition-all duration-300"
            >
              <div className="h-64 lg:w-full">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {blog.title}
                </h3>
                <span className="text-sm block text-gray-400 mt-2">
                  {blog.date} | BY {blog.author}
                </span>
                <p className="text-sm text-gray-500 mt-4">{blog.excerpt}</p>
                <Link
                  to={`/blogs/${blog.id}`}
                  className="mt-4 inline-block text-blue-600 font-semibold text-sm hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
