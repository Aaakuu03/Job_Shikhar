export default function AdminDashboard() {
  return (
    <div>
      <div className="flex w-full gap-5 mt-10">
        <div className="card bg-[#B3B3B3] rounded-3xl grid h-36 flex-grow place-items-center">
          <div className="stat-title  text-black ">Downloads</div>
          <div className="stat-value  text-black">31K</div>
          <div className="stat-desc  text-black">Jan 1st - Feb 1st</div>
        </div>

        <div className="card bg-[#D4D4D4] rounded-3xl grid h-36 flex-grow place-items-center">
          content
        </div>
        <div className="card bg-[#BAA898] rounded-3xl grid h-36 flex-grow place-items-center">
          content 3
        </div>
      </div>
    </div>
  );
}
