import { getSingleDeal } from "@/services/dealsServices/dealServices";
import { useQuery } from "@tanstack/react-query";

export function useGetSingleDeal(id) {
  const { isLoading, data } = useQuery({
    queryFn: () => getSingleDeal(id),
    queryKey: ["Single Deal", id],
    enabled: !!id,
  });

  return { isLoading, data };
}
