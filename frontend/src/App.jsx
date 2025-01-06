import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/user/Home";
import SignupPage from "./pages/user/SignupPage";

import JobseekerLogin from "./pages/user/JobSeeker/JobseekerLogin";
import JobseekerRegisterForm from "./pages/user/JobSeeker/JobseekerRegisterForm";
import Blogs from "./pages/user/Blog";
import { Toaster } from "react-hot-toast";

import JobSeekerLayout from "./layouts/JobSeekerLayout";
import EmployerLayout from "./layouts/EmployerLayout";
import EmployerRegisterForm from "./pages/user/Employer/EmployerRegisterForm";
import JobSeekerHome from "./pages/user/JobSeeker/JobSeekeerHome";

export default function App() {
  return (
    <>
      {/* Wrap all adjacent elements in a React Fragment */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/jobseeker/login" element={<JobseekerLogin />} />
          <Route
            path="/jobseeker/register"
            element={<JobseekerRegisterForm />}
          />
        </Route>
        <Route path="/jobseeker" element={<JobSeekerLayout />}>
          <Route index element={<Home />} />
          <Route path="/jobseeker/dashboard" element={<JobSeekerHome />} />
        </Route>
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<Home />} />
          <Route path="/employer/register" element={<EmployerRegisterForm />} />
        </Route>
      </Routes>
    </>
  );
}
