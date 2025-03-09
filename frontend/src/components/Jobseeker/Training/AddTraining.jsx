export default function AddTraining() {
  return (
    <>
      <h2 className="text-3xl mb-3 font-bold">Fill the Training Details</h2>

      <form className="space-y-6 font-[sans-serif]">
        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="trainingName">
            Name of Training
          </label>
          <input
            type="text"
            name="trainingName"
            placeholder="Enter training name"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="instituteName">
            Institute Name
          </label>
          <input
            type="text"
            name="instituteName"
            placeholder="Enter institute name"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="text-gray-400 w-36 text-sm" htmlFor="duration">
            Duration (in months)
          </label>
          <input
            type="number"
            name="duration"
            placeholder="Enter duration"
            min="1"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>

        <div className="flex items-center">
          <label
            className="text-gray-400 w-36 text-sm"
            htmlFor="completionYear"
          >
            Completion Year
          </label>
          <input
            type="number"
            name="completionYear"
            placeholder="Enter completion year"
            min="1900"
            max="2099"
            className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            required
          />
        </div>
      </form>

      <button
        type="button"
        className="mt-8 px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block rounded-lg shadow-2xl"
      >
        Add Another Training
      </button>

      <button
        type="submit"
        className="mt-8 px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block rounded-lg shadow-2xl"
      >
        Submit
      </button>
    </>
  );
}
