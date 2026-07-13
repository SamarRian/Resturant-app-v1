import { getSingleOrderById } from "@/services/PosSessionServices/PosOrderServices/PosOrderServices";
import { useQuery } from "@tanstack/react-query";

export function useGetSingleOrder(orderId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["singleOrder", orderId],
    queryFn: () => getSingleOrderById(orderId),
    enabled: !!orderId,
  });
  return { data, isLoading };
}
