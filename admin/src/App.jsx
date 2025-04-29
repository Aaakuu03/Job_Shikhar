import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserList from "./pages/AdminUserList";
import AdminJobLogList from "./pages/AdminJobLogList";
import AdminPricingPackages from "./pages/AdminPricingPackages";
import AdminCategoryPage from "./pages/AdminCategoryPage";
import PaymentTable from "./components/PaymentTable";
import ActivePackages from "./components/ActivePackages";
import JobDetail from "./pages/JobDetail";

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUserList />} />
          <Route path="/admin/jobs" element={<AdminJobLogList />} />
          <Route path="/admin/category" element={<AdminCategoryPage />} />
          <Route path="/admin/active-packages" element={<ActivePackages />} />
          <Route path="/admin/details/:jobId" element={<JobDetail />} />
          <Route path="/admin/packages" element={<AdminPricingPackages />} />
          <Route path="/admin/payments" element={<PaymentTable />} />
        </Route>
      </Routes>
    </>
  );
}
