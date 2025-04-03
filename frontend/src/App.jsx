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
import JobseekerBasicDeatils from "./pages/user/JobSeeker/JobseekerBasicDeatils";
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

import TrainingList from "./components/Jobseeker/Training/TrainingList";

import WorkExperienceList from "./components/Jobseeker/WorkExperience/WorkExperienceList";
import AddEducation from "./pages/user/JobSeeker/AddEducation";
import AddTraining from "./pages/user/JobSeeker/AddTraining";
import EmpProfile from "./components/Employer/EmpProfile";
import AddWorkExperience from "./pages/user/JobSeeker/AddWorkExperience";
import CompanyProfile from "./pages/user/Employer/CompanyProfile";
import JobPostForm from "./components/Employer/JobPostForm";
import JobDetail from "./components/JobDetail";
import EmployerJobs from "./pages/user/Employer/EmployerJobs";
import EmployerJobsList from "./components/Employer/EmployerJobsList";
import ViewApplicants from "./pages/user/Employer/ViewApplicants";
import JobApplications from "./pages/user/Employer/ApplicantList";
import ApplicantList from "./pages/user/Employer/ApplicantList";
import Notifications from "./components/Jobseeker/Notification";
import JobDetails from "./components/Jobseeker/JobDetails";
import JobSearchResults from "./pages/JobSearchResults";
import JobByCategory from "./components/JobByCategory";
import BlogDetail from "./pages/user/BlogDetail";
import EditEmpProfile from "./components/Employer/EditEmpProfile";

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
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/jobseeker/login" element={<JobseekerLogin />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route
            path="/jobs/category/:category" // Dynamic category route
            element={<JobByCategory />} // Renders the JobByCategory component
          />
          <Route
            path="/jobseeker/register"
            element={<JobseekerRegisterForm />}
          />
          <Route path="/jobs/details/:jobId" element={<JobDetails />} />
          <Route path="/jobs/search" element={<JobSearchResults />} />

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
          <Route path="/jobseeker/home" element={<Home />} />
          <Route path="/jobseeker/dashboard" element={<JobSeekerHome />} />
          <Route path="/jobseeker/blogs" element={<Blogs />} />
          <Route path="/jobseeker/faqs" element={<Faq />} />
          <Route path="/jobseeker/about" element={<AboutUs />} />
          <Route path="/jobseeker/notification" element={<Notifications />} />

          <Route path="/jobseeker/fill-form" element={<PreferredJob />} />

          <Route path="/jobseeker/setting" element={<JobSetting />} />
          <Route path="/jobseeker/profile" element={<Profile />} />
          <Route path="/jobseeker/edit/:id" element={<EditProfile />} />
          <Route
            path="/jobseeker/basic-details/edit/:id"
            element={<BasicInformationForm />}
          />
          <Route
            path="/jobseeker/basic-details"
            element={<JobseekerBasicDeatils />}
          />
          {/* <Route
            path="/jobseeker/preferred-job"
            element={<PreferredJobDeatils />}
          /> */}
          <Route
            path="/jobseeker/education/edit/:id"
            element={<EditEducation />}
          />
          <Route path="/jobseeker/education/add" element={<AddEducation />} />

          <Route path="/jobseeker/education/info" element={<EducationList />} />
          <Route path="/jobseeker/training/add" element={<AddTraining />} />
          <Route
            path="/jobseeker/training/edit/:id"
            element={<EditTraining />}
          />
          <Route path="/jobseeker/training/info" element={<TrainingList />} />
          <Route
            path="/jobseeker/workexperience/add"
            element={<AddWorkExperience />}
          />
          <Route
            path="/jobseeker/workexperience/info"
            element={<WorkExperienceList />}
          />
          <Route
            path="/jobseeker/workexperience/edit/:id"
            element={<EditWork />}
          />
        </Route>
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<Home />} />
          <Route path="/employer/dashboard" element={<EmployerHome />} />
          <Route path="/employer/jobs" element={<EmployerJobs />} />
          <Route
            path="/employer/edit-job/:jobId"
            element={<EmployerJobsList />}
          />
          <Route
            path="/employer/edit-profile/:userId"
            element={<EditEmpProfile />}
          />
          <Route
            path="/employer/job/:jobId/application/:applicationId"
            element={<ViewApplicants />}
          />

          <Route
            path="/employer/applicantlist/:jobId"
            element={<ApplicantList />}
          />

          <Route path="/employer/form" element={<EmpProfile />} />
          <Route path="/employer/profile" element={<CompanyProfile />} />
          <Route path="/employer/jobpost" element={<JobPostForm />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}
