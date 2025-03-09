import { useNavigate } from "react-router-dom";

export function checkUser() {
  const navigate = useNavigate();

  const user = localStorage.getItem("toekn");
  if (!user) {
    navigate("/");
  }
}
