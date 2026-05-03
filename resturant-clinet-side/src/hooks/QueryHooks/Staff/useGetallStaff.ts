import { useQuery } from "@tanstack/react-query";
import { getAllStaff } from "@/services/staffServices/staffServices.js";

export function useGetAllStaff() {
  const {
    data: staffData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff"],
    queryFn: getAllStaff,
  });

  return {
    staffData,
    isLoading,
    isError,
  };
}
