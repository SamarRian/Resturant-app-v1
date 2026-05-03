import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStaffById } from "@/services/staffServices/staffServices.js";
import { toast } from "sonner";

export function useDeleteStaff() {
  const queryClient = useQueryClient();

  const { mutate: deleteStaffFN, isPending } = useMutation({
    mutationFn: (id) => deleteStaffById(id),

    onSuccess: () => {
      toast.success("Deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteStaffFN, isPending };
}
