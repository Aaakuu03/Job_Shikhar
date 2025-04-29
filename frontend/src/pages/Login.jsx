import { NavLink } from "react-router-dom";
import { Building, UserRound } from "lucide-react";

export default function Login() {
  return (
    // <div className="bg-white font-sans p-4">
    <div className="min-h-screen bg-jobshikhar-light flex items-center justify-center px-4 py-10">
      <div className="flex max-w-4xl w-full flex-col items-center justify-center gap-6 shadow-xl rounded-lg bg-white p-10">
        <div className="flex flex-col lg:flex-row w-full gap-6 justify-between">
          {/* Job Seeker Section */}
          <div className="bg-jobshikhar-lightgray rounded-lg w-full max-w-sm h-80 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-300">
            <NavLink
              to="/jobseeker/login"
              className="flex flex-col items-center gap-2 text-jobshikhar-dark"
            >
              <UserRound size={70} className="text-jobshikhar-dark" />
              <span className="text-lg font-semibold text-jobshikhar-dark">
                Job Seeker
              </span>
              <p className="text-sm text-jobshikhar-dark">
                Login to your job seeker account
              </p>
              <div className="mt-2 text-xl font-bold text-jobshikhar-dark hover:underline">
                Login
              </div>
            </NavLink>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center text-jobshikhar-dark font-bold">
            OR
          </div>

          {/* Employer Section */}
          <div className="bg-jobshikhar-lightgray rounded-lg w-full max-w-sm h-80 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-300">
            <NavLink
              to="/employer/login"
              className="flex flex-col items-center gap-2 text-jobshikhar-dark"
            >
              <Building size={70} className="text-jobshikhar-dark" />
              <span className="text-lg font-semibold text-jobshikhar-dark">
                Employer
              </span>
              <p className="text-sm text-jobshikhar-dark">
                Login to your employer account
              </p>
              <div className="mt-2 text-xl font-bold text-jobshikhar-dark hover:underline">
                Login
              </div>
            </NavLink>
          </div>
        </div>

        {/* Bottom Register Link */}
        <div className="mt-4 text-sm text-jobshikhar-dark">
          Don't have an account?{" "}
          <NavLink
            to="/account/register"
            className="text-jobshikhar-accent hover:underline font-medium"
          >
            Register
          </NavLink>
        </div>
      </div>
    </div>
    // </div>
  );
}
