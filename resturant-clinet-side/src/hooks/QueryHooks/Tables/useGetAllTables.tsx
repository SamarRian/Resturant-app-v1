import { getAllTables } from "@/services/tableServices/tableServices.js";
import { useQuery } from "@tanstack/react-query";

export function useGetAllTables() {
  const { isLoading, data } = useQuery({
    queryFn: getAllTables,
    queryKey: ["tables"],
  });
  return { isLoading, data };
}
