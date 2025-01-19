import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

export default function JobseekerLogin() {
  const Validation = (userInput) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    let errors = {};
    if (!userInput.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(userInput.email)) {
      errors.email = "Email is invalid";
    }
    if (!userInput.password) {
      errors.password = "Password is required";
    } else if (userInput.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    return errors;
  };

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    userType: "JOBSEEKER",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const errors = Validation(userInput);
    console.log(errors); // Add this line
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Error in form!");
    } else {
      toast.success("Successfully Logged In!");
      navigate("/jobseeker/dashboard");
    }

    return errors; // Add this line
  }

  const login = async (e) => {
    e.preventDefault();
    const errors = handleSubmit(e);
    if (Object.keys(errors).length > 0) return;
    try {
      const respond = await axios.post(
        "http://localhost:3000/user/jobseeker/login",
        userInput
      );
      toast.success("Logged in successfully");
      localStorage.setItem("token", respond.data.token);
      navigate("/jobseeker/dashboard");
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className=" max-w-4xl flex items-center mx-auto h-3/4 p-3">
      <div className="bg-white grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden ">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Login to Your</h4>
            <h1 className="text-white text-lg font-bold">Job Seeker Account</h1>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Access your account and explore new opportunities tailored just
              for you.
            </p>
          </div>
        </div>

        <form
          onSubmit={login}
          className="md:col-span-2 w-full py-6 px-6 sm:px-16"
        >
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">
              Login to your{" "}
              <span className="text-customGray group-hover:text-customSil">
                Job
              </span>
              <span className="text-customSil group-hover:text-customGray">
                Shikhar
              </span>{" "}
              account
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block ">
                Email Id
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  value={userInput.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  value={userInput.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && <p className="error">{errors.password}</p>}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="flex items-center mt-5">
            <label for="remember-me" class=" block text-sm text-gray-600">
              Forget Password ?{" "}
              <NavLink to="/forget">
                <a
                  href="javascript:void(0);"
                  class="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Click Here
                </a>
              </NavLink>
            </label>
          </div>

          <div className="!mt-5">
            <button
              type="submit"
              className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
            >
              Login
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">
            Don't have an account?{" "}
            <NavLink to="/jobseeker/register">
              <a
                href="javascript:void(0);"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Register here
              </a>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
