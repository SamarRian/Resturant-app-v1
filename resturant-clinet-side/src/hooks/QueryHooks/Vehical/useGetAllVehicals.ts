import { getAllVehicals } from "@/services/vehicalServices/vehicalServices";
import { useQuery } from "@tanstack/react-query";

export function useGetAllVehicals() {
  const { data, isLoading: isVehicalLoading } = useQuery({
    queryKey: ["Vehicals"],
    queryFn: getAllVehicals,
  });
  return { data, isVehicalLoading };
}
