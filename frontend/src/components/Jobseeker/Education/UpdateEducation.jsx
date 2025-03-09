export default function UpdateEducation() {
  return (
    <>
      <h2 className="text-3xl mb-3 font-bold">Fill the Education Details</h2>

      <form className="space-y-6 font-[sans-serif]">
        {/* Degree Dropdown */}
        <div className="flex items-center">
          <label htmlFor="degree" className="text-gray-400 w-36 text-sm">
            Degree
          </label>
          <select
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            name="edegree"
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="slc">
              SEE (Secondary Education Examination)/SLC
            </option>
            <option value="plus2">+2 (Higher Secondary - Grade 11 & 12)</option>
            <option value="diploma">Diploma</option>
            <option value="bachelor">Bachelor’s Degree</option>
            <option value="master">Master’s Degree</option>
            <option value="mphil">MPhil</option>
            <option value="phd">PhD</option>
          </select>
        </div>

        {/* Course/Program Input */}
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Course/Program</label>
          <input
            type="text"
            name="courseProgram"
            placeholder="Enter the program"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>

        {/* Board/University Input */}
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">
            Education Board/University
          </label>
          <input
            type="text"
            name="board"
            required
            placeholder="Enter your Board Level/University"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>

        {/* Start Date Input */}
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm">End Date</label>
          <input
            type="date"
            name="endDate"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>

        {/* Checkbox for Currently Studying */}
        <div className="flex items-center">
          <label className="text-gray-400 text-sm">Currently Studying</label>
          <input type="checkbox" />
        </div>
      </form>

      {/* Add new education form */}
      <button
        type="button"
        className="mt-8 px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block rounded-lg shadow-2xl"
      >
        Add Another Education
      </button>

      {/* Submit button */}
      <button
        type="submit"
        className="mt-8 px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block rounded-lg shadow-2xl"
      >
        Submit
      </button>
    </>
  );
}
