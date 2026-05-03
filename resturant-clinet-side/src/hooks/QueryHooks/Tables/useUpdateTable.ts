import { updateTableById } from "@/services/tableServices/tableServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateTable() {
  const queryClient = useQueryClient();

  const { mutate: updateTableFN, isPending } = useMutation({
    mutationFn: ({ id, tableName }) => updateTableById(id, tableName),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table Updated Successfully!");
    },

    onError: (error) => {
      console.error("Update Error:", error.message);
    },
  });

  return { updateTableFN, isPending };
}
