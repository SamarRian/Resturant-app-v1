import { getAllActiveSessionOrders } from "@/services/PosSessionServices/PosOrderServices/PosOrderServices";
import { useQuery } from "@tanstack/react-query";

export function useGetAllActiveSessionOrders() {
  const { data: allOrdersData, isLoading: isAllOrdersDataLoading } = useQuery({
    queryKey: ["activeSessionOrders"],
    queryFn: getAllActiveSessionOrders,
  });
  return { allOrdersData, isAllOrdersDataLoading };
}
