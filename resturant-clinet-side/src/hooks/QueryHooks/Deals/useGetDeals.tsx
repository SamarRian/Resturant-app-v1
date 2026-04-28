import { getAllDeals } from "@/services/dealsServices/dealServices";
import { useQuery } from "@tanstack/react-query";

export function useGetDeals() {
  const {
    data,
    isLoading: isDealLoading,
    error: dealError,
  } = useQuery({
    queryKey: ["Deals"],
    queryFn: getAllDeals,
  });
  return { dealsData: data?.deals, isDealLoading, dealError };
}
