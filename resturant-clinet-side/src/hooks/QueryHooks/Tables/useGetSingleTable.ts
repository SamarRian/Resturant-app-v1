import { getSingleTable } from "@/services/tableServices/tableServices";
import { useQuery } from "@tanstack/react-query";

export function useGetSingleTable(id) {
  const { data: SingleTableData, isLoading: isSingleTableLoading } = useQuery({
    queryFn: () => getSingleTable(id),
    queryKey: ["tables", id],
    enabled: !!id,
  });

  return { SingleTableData, isSingleTableLoading };
}
