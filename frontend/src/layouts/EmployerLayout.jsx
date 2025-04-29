import { Outlet } from "react-router-dom";
import NavbarEmp from "../components/Employer/NavbarEmp";
import Footer from "../components/Footer";

export default function EmployerLayout() {
  return (
    <div data-theme="garden">
      <div>
        <NavbarEmp />
      </div>

      <Outlet />
      <div>
        <Footer />
      </div>
    </div>
  );
}
