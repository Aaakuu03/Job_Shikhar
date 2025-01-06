import { Outlet } from "react-router-dom";

export default function EmployerLayout() {
  return (
    <div data-theme="garden">
      <Outlet />
    </div>
  );
}
