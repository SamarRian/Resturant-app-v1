import { deleteDeal } from "@/services/dealsServices/dealServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteDeal() {
  const queryClient = useQueryClient();

  const { isPending, mutate: deleteDealFN } = useMutation({
    mutationFn: (id) => deleteDeal(id),
    onSuccess: () => {
      toast.success("Deal Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["Deals"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, deleteDealFN };
}
