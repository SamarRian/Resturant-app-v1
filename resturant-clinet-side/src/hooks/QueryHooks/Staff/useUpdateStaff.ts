import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStaffById } from "@/services/staffServices/staffServices.js";
import { toast } from "sonner";

export function useUpdateStaff() {
  const queryClient = useQueryClient();

  const { mutate: staffUpdateFN, isPending } = useMutation({
    mutationFn: ({ id, personName }) => updateStaffById(id, personName),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast.success("Staff Updated Successfully!");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { staffUpdateFN, isPending };
}
