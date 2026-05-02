import { udpateDeal } from "@/services/dealsServices/dealServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateSinlgeDeal() {
  const queryClient = useQueryClient();

  const {
    data,
    isPending,
    mutate: updateDealFN,
  } = useMutation({
    mutationFn: ({ id, updatedDealData }) => udpateDeal(id, updatedDealData),

    onSuccess: () => {
      toast.success("Deal Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["Deals"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { data, isPending, updateDealFN };
}
