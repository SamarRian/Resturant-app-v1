import { updateStaffStatus } from "@/services/staffServices/staffServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateStaffStatus() {
  const queryClient = useQueryClient();

  const { mutate: updateStaffStatusFN, isPending } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateStaffStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast.success("Staff status updated successfully");
    },

    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { updateStaffStatusFN, isPending };
}
