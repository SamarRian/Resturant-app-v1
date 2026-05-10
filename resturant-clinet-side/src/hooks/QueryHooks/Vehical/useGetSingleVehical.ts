import { getSingleVehical } from "@/services/vehicalServices/vehicalServices";
import { useQuery } from "@tanstack/react-query";

export function useGetSingleVehical(id) {
  const { data: vehicalData, isLoading: isVehicalLoading } = useQuery({
    queryKey: ["Vehical", id],
    queryFn: () => getSingleVehical(id),
    enabled: !!id,
  });

  return { vehicalData, isVehicalLoading };
}
