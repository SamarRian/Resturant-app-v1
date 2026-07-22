import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function logout() {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  }

  return { logout };
}

export default useLogout;
