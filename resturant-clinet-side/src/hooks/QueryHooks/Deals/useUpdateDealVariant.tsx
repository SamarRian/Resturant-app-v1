import { updateDealVariation } from "@/services/dealsServices/dealServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateDealVariant() {
  const queryClient = useQueryClient();

  const {
    data,
    isPending,
    mutate: UpdateDealFN,
  } = useMutation({
    mutationFn: ({ id, variant }) => updateDealVariation(id, variant),
    onSuccess: () => {
      toast.success("Deal Updated Succeffully");
      queryClient.invalidateQueries({ queryKey: ["Deals"] });
      queryClient.invalidateQueries({ queryKey: ["Single Deal"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { data, isPending, UpdateDealFN };
}
