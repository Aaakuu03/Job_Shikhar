import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

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
      return errors;
    }

    return {}; // No errors
  }

  const login = async (e) => {
    e.preventDefault();
    const errors = handleSubmit(e);
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/user/login",
        userInput,
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );

      const { token, redirectUrl, user, message } = response.data;

      // ✅ Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      toast.success(message || "Logged in successfully");

      // ✅ Redirect user if URL is provided
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        toast.error("Redirect URL not found.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
      console.error(error);
    }
  };

  return (
    <div className=" max-w-4xl flex items-center mx-auto h-3/4 p-3 my-5 ">
      <div className="bg-white border-2 grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden ">
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
                <Mail className="w-4 h-4 absolute right-4" />
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
                <Lock className="w-4 h-4 absolute right-4 cursor-pointer text-gray-800" />
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
            <NavLink to="/account/register">
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
