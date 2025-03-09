export default function Price() {
  return (
    <>
      <div class="font-[sans-serif] p-4 bg-[#D9D9D9]">
        <div class="max-w-5xl max-lg:max-w-2xl mx-auto ">
          <div class="text-center">
            <h2 class="text-gray-800 text-3xl font-bold mb-4">Pricing</h2>
            <p class="text-sm text-gray-500">
              Change your plant according your needs
            </p>
          </div>

          <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-10 max-sm:max-w-sm max-sm:mx-auto">
            <div class="border rounded-md p-6">
              <h3 class="text-gray-800 text-xl font-semibold mb-2">Starter</h3>
              <p class="text-sm text-gray-500">For Small Teams</p>

              <div class="mt-6">
                <h3 class="text-gray-800 text-2xl font-semibold">
                  Rs 6000{" "}
                  <sub class="text-gray-500 text-sm font-medium">per month</sub>
                </h3>
              </div>

              <div class="mt-6">
                <h4 class="text-gray-800 text-lg font-semibold mb-2">
                  Include
                </h4>
                <p class="text-sm text-gray-500">
                  Everything you get in this plan
                </p>

                <ul class="mt-6 space-y-4">
                  <li class="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      class="mr-3 fill-green-500"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                        data-original="#000000"
                      />
                    </svg>
                    3 posts a month
                  </li>
                  <li class="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      class="mr-3 fill-green-500"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                        data-original="#000000"
                      />
                    </svg>
                    Rs 6000 including VAT
                  </li>
                </ul>

                <button
                  type="button"
                  class="w-full mt-6 px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Buy now
                </button>
              </div>
            </div>

            <div class="border rounded-md p-6">
              <h3 class="text-gray-800 text-xl font-semibold mb-2 flex items-center">
                Professional{" "}
                <span class="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-md ml-3">
                  Best Deal
                </span>
              </h3>
              <p class="text-sm text-gray-500">For Largest Teams</p>

              <div class="mt-6">
                <h3 class="text-gray-800 text-2xl font-semibold">
                  Rs 12000{" "}
                  <sub class="text-gray-500 text-sm font-medium">per month</sub>
                </h3>
              </div>

              <div class="mt-6">
                <h4 class="text-gray-800 text-lg font-semibold mb-2">
                  Include
                </h4>
                <p class="text-sm text-gray-500">
                  Everything you get in this plan
                </p>

                <ul class="mt-6 space-y-4">
                  <li class="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      class="mr-3 fill-green-500"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                        data-original="#000000"
                      />
                    </svg>
                    6 posts a Month
                  </li>
                  <li class="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      class="mr-3 fill-green-500"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                        data-original="#000000"
                      />
                    </svg>
                    Total: Rs 12000
                  </li>
                </ul>

                <button
                  type="button"
                  class="w-full mt-6 px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="font-[sans-serif] bg-white p-4">
        <div class="md:max-w-5xl max-w-xl mx-auto">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 max-md:order-1">
              <h2 class="text-3xl font-extrabold text-gray-800">
                Make a payment
              </h2>
              <p class="text-gray-800 text-sm mt-4">
                Complete your transaction swiftly and securely with our
                easy-to-use payment process.
              </p>

              <form class="mt-8 max-w-lg">
                <div class="grid gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Cardholder's Name"
                      class="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    />
                  </div>

                  <div class="flex bg-gray-100 border rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 ml-3"
                      viewBox="0 0 32 20"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="10"
                        fill="#f93232"
                        data-original="#f93232"
                      />
                      <path
                        fill="#fed049"
                        d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                        class="hovered-path"
                        data-original="#fed049"
                      />
                    </svg>
                    <input
                      type="number"
                      placeholder="Card Number"
                      class="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent"
                    />
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        placeholder="EXP."
                        class="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="CVV"
                        class="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  class="mt-8 w-40 py-3.5 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 tracking-wide"
                >
                  Pay{" "}
                </button>
              </form>
            </div>

            <div class="bg-gray-100 p-6 rounded-md">
              <h2 class="text-3xl font-bold text-gray-800">$250.00</h2>

              <ul class="text-gray-800 mt-8 space-y-3">
                <li class="flex flex-wrap gap-4 text-sm">
                  Split Sneakers <span class="ml-auto font-bold">$150.00</span>
                </li>
                <li class="flex flex-wrap gap-4 text-sm">
                  Echo Elegance <span class="ml-auto font-bold">$90.00</span>
                </li>
                <li class="flex flex-wrap gap-4 text-sm">
                  Tax <span class="ml-auto font-bold">$10.00</span>
                </li>
                <li class="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                  Total <span class="ml-auto">$250.00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
