import { createTable } from "@/services/tableServices/tableServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTable() {
  const queryClient = useQueryClient();

  const {
    mutate: createTableFN,
    isPending,
    data,
  } = useMutation({
    mutationFn: (tableName) => createTable(tableName),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },

    onError: (error) => {
      console.error("Error:", error.message);
    },
  });
  return { createTableFN, isPending, data };
}
