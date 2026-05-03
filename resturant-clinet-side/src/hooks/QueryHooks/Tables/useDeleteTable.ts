import { deleteTable } from "@/services/tableServices/tableServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteTable() {
  const queryClient = useQueryClient();

  const { mutate: deleteTableFN, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteTable(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table Deleted Successfully!");
    },

    onError: (error) => {
      console.error("Delete Error:", error.message);
    },
  });

  return { deleteTableFN, isDeleting };
}
