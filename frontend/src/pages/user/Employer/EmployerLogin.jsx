import axios from "axios";
import { Mail, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function EmployerLogin() {
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
    userType: "EMPLOYER",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = Validation(userInput);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Error in form!");
      return errors;
    }

    return {}; // No errors
  };

  const login = async (e) => {
    e.preventDefault();
    const errors = handleSubmit(e);
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/employer/login",
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
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl flex items-center mx-auto h-3/4 p-3 my-5">
      <div className="bg-white border-2 grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Login to Your</h4>
            <h1 className="text-white text-lg font-bold">Employer Account</h1>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Access your dashboard and manage your job postings easily.
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
              employer panel
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
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
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
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
                  type={showPassword ? "text" : "password"}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  value={userInput.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
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
                )}{" "}
              </div>
            </div>
          </div>

          <div className="flex items-center mt-5">
            <label className="block text-sm text-gray-600">
              Forget Password?{" "}
              <NavLink to="/forget">
                <span className="text-blue-600 font-semibold hover:underline ml-1">
                  Click Here
                </span>
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
            <NavLink to="/employer/register">
              <span className="text-blue-600 font-semibold hover:underline ml-1">
                Register here
              </span>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
