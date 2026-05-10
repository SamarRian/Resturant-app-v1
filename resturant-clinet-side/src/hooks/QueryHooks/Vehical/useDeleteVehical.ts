import { deleteVehical } from "@/services/vehicalServices/vehicalServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteVehical() {
  const queryClient = useQueryClient();
  const { mutate: deleteVehicalFN, isPending } = useMutation({
    mutationFn: (id) => deleteVehical(id),
    onSuccess: () => {
      toast.success("Vehical Deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["Vehicals"] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { deleteVehicalFN, isPending };
}
