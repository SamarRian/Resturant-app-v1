import { toast } from "sonner";
import { signUpUser } from "../../../services/authServices/auth.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signUp, isPending: isSignUpPending } = useMutation({
    mutationFn: (data) => signUpUser(data),
    onSuccess: (data) => {
      toast.success("Sign up successful!");
      localStorage.setItem("token", data.token);
      navigate("/");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return { signUp, isSignUpPending };
}
