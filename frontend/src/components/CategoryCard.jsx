export default function CategoryCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-40 ">
      <div className="flex items-center justify-center mb-4">
        <svg
          className="w-12 h-12 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold mb-2">Account</h2>
      <p className="text-gray-700">10</p>
    </div>
  );
}
