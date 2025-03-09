import { NavLink } from "react-router-dom";

import { HiOfficeBuilding } from "react-icons/hi";
import { FaSignInAlt, FaUserTie } from "react-icons/fa";

export default function Register() {
  return (
    <>
      <div className="flex max-w-4xl  mx-auto h-3/4 p-10 flex-col items-center justify-center gap-4  border-2 border-black my-8 ">
        {/* Job Seeker Section */}
        <div className="flex w-full">
          <div className="card bg-base-300 rounded-box grid h-80 w-full max-w-sm  place-items-center ">
            <NavLink to="/jobseeker/register">
              <div
                role="button"
                className="m-1 flex  flex-col items-center justify-center gap-2 text-sm"
              >
                <FaUserTie size={80} />
                <span>Job Seeker</span>
                <p>Create free job seeker account</p>
                <div
                  role="button"
                  className="m-1 flex   items-center   text-xl font-black text-customGray capitalize hover:uppercase"
                >
                  Register
                </div>
              </div>
            </NavLink>
          </div>

          {/* Divider */}
          <div className="divider lg:divider-horizontal">OR</div>

          {/* Employer Section */}
          <div className="card bg-base-300 rounded-box grid h-80 w-full max-w-sm  place-items-center ">
            <NavLink to="/employer/register">
              <div
                role="button"
                className="m-1 flex  flex-col items-center justify-center gap-2  font-black"
              >
                <HiOfficeBuilding size={80} />
                <span>Employer</span>
                <p>Create free employer account</p>
                <div
                  role="button"
                  className="m-1 flex   items-center   text-xl font-black text-customGray capitalize hover:uppercase"
                >
                  Register
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="flex-col">
          <p>
            Already Have an Account? {""}
            <NavLink to="/jobseeker/login">
              <a className="link link-accent">Login</a>
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
