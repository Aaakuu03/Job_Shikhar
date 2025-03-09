export default function AddWorkExperience() {
  return (
    <>
      <h2 className="text-3xl mb-3 font-bold">
        Fill the Work Experience Details
      </h2>

      <form className="space-y-6 font-[sans-serif]">
        <div className="flex items-center">
          <label
            className="text-gray-400 w-36 text-sm"
            htmlFor="organizationName"
          >
            Organization Name
          </label>
          <input
            type="text"
            name="organizationName"
            placeholder="Enter organization name"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="jobLocation">
            Job Location
          </label>
          <input
            type="text"
            name="jobLocation"
            placeholder="Enter job location"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="jobTitle">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Enter job title"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="startDate">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="endDate">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="description">
            Job Description
          </label>
          <textarea
            name="description"
            placeholder="Enter job description"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>
      </form>

      <button
        type="button"
        className="mt-8 px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block rounded-lg shadow-2xl"
      >
        Add
      </button>

      <button
        type="submit"
        className="mt-8 px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block rounded-lg shadow-2xl"
      >
        Cancel
      </button>
    </>
  );
}
