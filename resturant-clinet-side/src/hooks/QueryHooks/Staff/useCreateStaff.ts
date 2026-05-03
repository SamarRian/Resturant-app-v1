import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStaff } from "@/services/staffServices/staffServices.js";
import { toast } from "sonner";

export function useCreateStaff() {
  const queryClient = useQueryClient();

  const { mutate: createStaffFN, isPending } = useMutation({
    mutationFn: (personName) => createStaff(personName),

    onSuccess: () => {
      toast.success("Staff Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createStaffFN, isPending };
}
