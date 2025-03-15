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
import AboutUs from "./pages/user/AboutUs";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import JobSetting from "./pages/user/JobSeeker/JobSetting";
import UpdateProfile from "./pages/user/JobSeeker/UpdateProfile";
import Price from "./pages/user/JobSeeker/Price";
import EmployerHome from "./pages/user/Employer/EmployerHome";
import EditProfile from "./pages/user/JobSeeker/EditProfile";
import BasicInformationForm from "./components/Jobseeker/BasicInformationForm";
import EditEducation from "./pages/user/JobSeeker/EditEducation";

import EditTraining from "./pages/user/JobSeeker/EditTraining";

import EditWork from "./pages/user/JobSeeker/EditWork";
import Profile from "./pages/user/JobSeeker/Profile";
import Faq from "./pages/user/Faq";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Register from "./components/register";
import PreferredJob from "./components/Jobseeker/PreferredJob";
import EducationList from "./components/Jobseeker/Education/EducationList";
import AddEducation from "./components/Jobseeker/Education/AddEducation";
import TrainingList from "./components/Jobseeker/Training/TrainingList";
import AddTraining from "./components/Jobseeker/Training/AddTraining";
import AddWorkExperience from "./components/Jobseeker/WorkExperience/AddWorkExperience";
import WorkExperienceList from "./components/Jobseeker/WorkExperience/WorkExperienceList";
import EmpProfile from "./components/Employer/EmpProfile";

export default function App() {
  return (
    <>
      {/* Wrap all adjacent elements in a React Fragment */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/jobseeker/login" element={<JobseekerLogin />} />
          <Route
            path="/jobseeker/register"
            element={<JobseekerRegisterForm />}
          />
          <Route path="/price" element={<Price />} />
          <Route path="/employer/register" element={<EmployerRegisterForm />} />
          <Route path="/verify-email/:token" element={<EmailVerifyPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/forget" element={<ForgotPasswordPage />} />
        </Route>

        <Route path="/jobseeker" element={<JobSeekerLayout />}>
          <Route index element={<Home />} />
          <Route path="/jobseeker/dashboard" element={<JobSeekerHome />} />
          <Route path="/jobseeker/fill-form" element={<PreferredJob />} />
          <Route path="/jobseeker/setting" element={<JobSetting />} />
          <Route path="/jobseeker/profile" element={<Profile />} />
          <Route path="/jobseeker/edit" element={<EditProfile />} />
          <Route path="/jobseeker/info" element={<BasicInformationForm />} />
          <Route path="/jobseeker/update" element={<UpdateProfile />} />
          <Route path="/jobseeker/education/edit" element={<EditEducation />} />
          <Route path="/jobseeker/education/add" element={<AddEducation />} />

          <Route path="/jobseeker/education/info" element={<EducationList />} />
          <Route path="/jobseeker/training/add" element={<AddTraining />} />
          <Route path="/jobseeker/training/edit" element={<EditTraining />} />
          <Route path="/jobseeker/training/info" element={<TrainingList />} />
          <Route path="/jobseeker/work/add" element={<AddWorkExperience />} />
          <Route path="/jobseeker/work/edit" element={<EditWork />} />
          <Route path="/jobseeker/work/info" element={<WorkExperienceList />} />
        </Route>
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<Home />} />
          <Route path="/employer/dashboard" element={<EmployerHome />} />
          <Route path="/employer/fill-form" element={<EmpProfile />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}
