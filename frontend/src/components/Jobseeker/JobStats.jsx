export default function JobStats() {
  return (
    <div className="mr-10 ml-10">
      <div className="flex flex-col lg:flex-row gap-5 m-2 justify-center">
        <div className="flex-1 grid h-32 w-32 rounded-box place-items-center bg-[#B3B3B3]">
          <div className="place-items-center">
            <h2 className="text-5xl font-bold">0</h2>
            <h3 className="text-xl font-bold text-gray-800">Job Applied</h3>
          </div>
        </div>

        <div className="flex-1 grid h-32 w-32 rounded-box place-items-center bg-[#D4D4D4]">
          <div className="place-items-center">
            <h2>0</h2>
            <h3 className="text-xl font-bold text-gray-800">Heading</h3>
          </div>
        </div>

        <div className="flex-1 grid h-32 w-32 rounded-box place-items-center bg-[#F2F0EF]">
          <div className="place-items-center">
            <h2>0</h2>
            <h3 className="text-xl font-bold text-gray-800">Heading</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
