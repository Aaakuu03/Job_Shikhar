import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarJob from "../components/Jobseeker/NavbarJob";

export default function JobSeekerLayout() {
  return (
    <div data-theme="garden">
      <div>
        <NavbarJob />
      </div>
      <Outlet />
      <div>
        <Footer />
      </div>
    </div>
  );
}
