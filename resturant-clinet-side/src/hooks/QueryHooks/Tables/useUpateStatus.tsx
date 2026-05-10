import { updateTableStatusById } from "@/services/tableServices/tableServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateStatus() {
  const queryClient = useQueryClient();
  const {
    data,
    isPending,
    mutate: updateStatusFN,
  } = useMutation({
    mutationFn: ({ id, status }) => updateTableStatusById(id, status),
    onSuccess: () => {
      toast.success("Status Updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { data, isPending, updateStatusFN };
}
