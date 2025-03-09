import JobSet from "../../../components/Jobseeker/JobSet";

export default function DeactivateAccount() {
  return (
    <div className="m-10">
      <div className="p-4 border-2 border-lime-200 bg-white">
        <h3 className="text-lg font-semibold">Account Settings</h3>
      </div>
      <div className=" flex border border-black bg-white ">
        <div className="flex  border border-[#B3B3B3] bg-white shadow-xl  font-sans overflow">
          <JobSet />
        </div>
        <div className="flex-1 border-2 border-blue-700">
          <div className="border-2 border-purple-700 p-4 font-bold">
            Change Password
          </div>
          <section className=" p-1 bg-white ">
            <div class="flex flex-col justify-center font-[sans-serif]  p-4">
              <div>
                <form>
                  <div class="space-y-6">
                    <div>
                      <label class="text-gray-800 text-sm mb-2 block">
                        Current Password
                      </label>
                      <input
                        name="email"
                        type="text"
                        class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                        placeholder="Enter email"
                      />
                    </div>
                    <div>
                      <label class="text-gray-800 text-sm mb-2 block">
                        New Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                        placeholder="Enter password"
                      />
                    </div>
                    <div>
                      <label class="text-gray-800 text-sm mb-2 block">
                        Confirm New Password
                      </label>
                      <input
                        name="cpassword"
                        type="password"
                        class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                        placeholder="Enter confirm password"
                      />
                    </div>
                  </div>

                  <div class="!mt-8">
                    <button
                      type="button"
                      class="w-50 align-middle py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
