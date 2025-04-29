import axios from "axios";
import { Mail, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function JobseekerLogin() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    userType: "JOBSEEKER",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validateInput = (input) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const validationErrors = {};

    if (!input.email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(input.email)) {
      validationErrors.email = "Email must be a valid Gmail address";
    }

    if (!input.password) {
      validationErrors.password = "Password is required";
    } else if (input.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    return validationErrors;
  };

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInput(userInput);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors in the form.");
      return validationErrors;
    }

    return {};
  };

  const login = async (e) => {
    const validationErrors = handleSubmit(e);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/jobseeker/login",
        userInput,
        {
          withCredentials: true,
        }
      );

      const { token, user, message, redirectUrl } = response.data;
      Cookies.set("jwt", token, { expires: 7, path: "/" });
      Cookies.set("user", JSON.stringify(user), { expires: 7, path: "/" });

      toast.success(message || "Logged in successfully");

      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        toast.error("Redirect URL not found.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="max-w-4xl flex items-center mx-auto h-3/4 p-3 my-5">
      <div className="bg-white border-2 grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        {/* Left Panel */}
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

        {/* Right Form */}
        <form
          onSubmit={login}
          className="md:col-span-2 w-full py-6 px-6 sm:px-16"
        >
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">
              Login to your <span className="text-customGray">Job</span>
              <span className="text-customSil">Shikhar</span> account
            </h3>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
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
                <Mail className="w-4 h-4 absolute right-4" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={userInput.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  required
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                {showPassword ? (
                  <Unlock
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Lock
                    className="w-4 h-4 absolute right-4 cursor-pointer "
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex items-center mt-5">
            <span className="block text-sm text-gray-600">
              Forgot Password?{" "}
              <NavLink
                to="/forget"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Click Here
              </NavLink>
            </span>
          </div>

          {/* Login Button */}
          <div className="mt-5">
            <button
              type="submit"
              className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
            >
              Login
            </button>
          </div>

          {/* Register Link */}
          <p className="text-gray-800 text-sm mt-6 text-center">
            Don't have an account?{" "}
            <NavLink
              to="/account/register"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Register here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
