import { toast } from "sonner";
import { loginUser } from "../../../services/authServices/auth.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      toast.success("Login successful!");
      localStorage.setItem("token", data.token);
      navigate("/");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return { login, isLoginPending };
}
