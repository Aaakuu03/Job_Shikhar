export default function JobCard() {
  return (
    <div className="w-3/12 p-4 shadow-md rounded-md bg-white transition-all duration-300 hover:scale-110 cursor-pointer">
      <div className="flex items-center mb-2">
        <img
          src="https://merojob.com/media/cache/12/a6/12a65b6ce40e99d00c9259635e8fa6be.jpg"
          alt="Shoes"
          className="w-20 h-20  object-cover rounded-lg "
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold">It Officer</h3>
          <p className="text-gray-600">Google</p>
          <p className="text-gray-500">Kathmandu</p>
        </div>
      </div>
    </div>
  );
}
