import { getMe } from "@/services/authServices/auth";
import { useQuery } from "@tanstack/react-query";

export function useGetMe() {
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });
  return { userData, isUserLoading };
}
