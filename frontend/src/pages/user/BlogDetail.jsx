import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch("/blogs.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedBlog = data.find((b) => b.id === parseInt(id));
        setBlog(selectedBlog);
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  if (!blog) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold">{blog.title}</h2>
      <p className="text-gray-500">
        By {blog.author} | {blog.date}
      </p>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded my-4"
      />
      <p className="mt-4 whitespace-pre-line">{blog.content}</p>
      <Link
        to="/blogs"
        className="text-blue-600 hover:underline mt-4 inline-block"
      >
        ← Back to Blogs
      </Link>
    </div>
  );
};

export default BlogDetail;
