import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { User, Lock, Mail, Phone, Unlock } from "lucide-react";
export default function JobseekerRegisterForm() {
  const Validation = (userInput) => {
    let errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const numberRegex = /^(\d{3})[-. ]?(\d{3})[-. ]?(\d{4})$/;

    if (!userInput.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(userInput.email)) {
      errors.email = "Email is invalid";
    }

    if (!userInput.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!numberRegex.test(userInput.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format";
    }

    if (!userInput.password) {
      errors.password = "Password is required";
    } else if (userInput.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }

    if (!userInput.name) {
      errors.name = "First Name is required";
    } else if (userInput.name.length < 3) {
      errors.tName = " Name must be more than 3 characters";
    }

    return errors;
  };
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userInput, setUserInput] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
  });

  const handleBlur = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const [errors, setErrors] = useState({});

  const handleSignup = async (e) => {
    e.preventDefault();

    const validationErrors = Validation(userInput);
    setErrors(validationErrors);

    // If there are validation errors, do not proceed
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    setLoading(true); // <-- ADD THIS LINE

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/jobseeker/register",
        userInput
      );
      console.log("Response:", response);
      toast.success("Registration successful");
    } catch (error) {
      console.error("Error response:", error.response); // Log error response

      if (
        error.response &&
        error.response.data.message === "Email is already in use."
      ) {
        setErrors({ email: "Email is already in use." });
        toast.error("Email is already in use.");
      } else if (
        error.response &&
        error.response.data.message === "Phone number is already in use."
      ) {
        setErrors({ email: "Phone number is already in use." });
        toast.error("Phone number is already in use.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  return (
    <div className=" max-w-4xl flex items-center mx-auto  py-10">
      <div className="bg-white grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden ">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Create Your</h4>
            <h1 className="text-white text-2xl font-semibold">
              Job Seeker Account
            </h1>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Welcome to our registration page! Get started by creating your
              account.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">
              Simple & Secure Registration
            </h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Our registration process is designed to be straightforward and
              secure. We prioritize your privacy and data security.
            </p>
          </div>
        </div>

        <form
          className="md:col-span-2 w-full py-6 px-6 sm:px-16"
          onSubmit={handleSignup}
        >
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">
              Create your free{" "}
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
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter name"
                  onChange={(e) =>
                    setUserInput({ ...userInput, name: e.target.value })
                  }
                  onBlur={handleBlur}
                />

                <User className="w-4 h-4 absolute right-4 cursor-pointer text-customSil" />
              </div>
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  onChange={(e) =>
                    setUserInput({ ...userInput, email: e.target.value })
                  }
                  onBlur={handleBlur}
                />

                <Mail className="w-4 h-4 absolute right-4 cursor-pointer text-customSil" />
              </div>
              {errors.email && (
                <span className="text-red-600 text-sm mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <input
                  name="phone"
                  type="phone"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter phone number"
                  onChange={(e) =>
                    setUserInput({ ...userInput, phoneNumber: e.target.value })
                  }
                  onBlur={handleBlur}
                />

                <Phone className="w-4 h-4 absolute right-4 cursor-pointer text-customSil" />
              </div>
              {errors.phoneNumber && (
                <span className="text-red-600 text-sm mt-1 block">
                  {errors.phoneNumber}
                </span>
              )}
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
                  onChange={(e) =>
                    setUserInput({ ...userInput, password: e.target.value })
                  }
                  onBlur={handleBlur}
                />

                {showPassword ? (
                  <Unlock
                    className="w-4 h-4 absolute right-4 cursor-pointer text-customSil"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Lock
                    className="w-4 h-4 absolute right-4 cursor-pointer text-customSil"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {errors.password && (
                <span className="text-red-600 text-sm mt-1 block">
                  {errors.password}
                </span>
              )}
            </div>
          </div>

          <div className="!mt-10">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 tracking-wider text-sm rounded-md text-white ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-800"
              } focus:outline-none`}
            >
              {loading ? "Creating..." : "Create an account"}
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">
            Already have an account?{" "}
            <NavLink to="/jobseeker/login">
              <a
                href="javascript:void(0);"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Login here
              </a>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
