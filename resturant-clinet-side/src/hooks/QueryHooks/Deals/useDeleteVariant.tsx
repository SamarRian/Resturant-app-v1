import { deleteDealVariant } from "@/services/dealsServices/dealServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function UseDeleteVariant() {
  const queryClient = useQueryClient();

  const { isPending, mutate: DeleteVarinat } = useMutation({
    mutationFn: ({ dealId, variantId }) => deleteDealVariant(dealId, variantId),
    onSuccess: () => {
      toast.success("Varinat Deleted Successfully!");

      queryClient.invalidateQueries({ queryKey: ["Single Deal"] });
      queryClient.invalidateQueries({ queryKey: ["Deals"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, DeleteVarinat };
}
