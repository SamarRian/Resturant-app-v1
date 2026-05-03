import { useQuery } from "@tanstack/react-query";
import { getSingleStaff } from "@/services/staffServices/staffServices.js";

export function useGetSingleStaff(id) {
  const {
    data: singleStaff,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff", id],
    queryFn: () => getSingleStaff(id),
    enabled: !!id,
  });

  return {
    singleStaff,
    isLoading,
    isError,
  };
}
