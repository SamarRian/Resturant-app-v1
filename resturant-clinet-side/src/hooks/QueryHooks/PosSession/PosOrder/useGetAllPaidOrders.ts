import { getAllPaidOrders } from "@/services/PosSessionServices/PosOrderServices/PosOrderServices";
import { useQuery } from "@tanstack/react-query";

export function useGetAllPaidOrders(id) {
  const { data: paidOrders, isLoading } = useQuery({
    queryKey: ["All-Paid-Orders"],
    queryFn: () => getAllPaidOrders(id),
  });
  return { paidOrders, isLoading };
}
