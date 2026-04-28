import { createDeal } from "@/services/dealsServices/dealServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateDeal() {
  const queryClient = useQueryClient();

  const {
    isPending,
    error,
    mutate: mutateDealFunction,
  } = useMutation({
    mutationFn: (deal) => createDeal(deal),

    onSuccess: (data) => {
      console.log(data);
      toast.success(`${data.deal.dealName} Deal Created Successfully`);
      queryClient.invalidateQueries({ queryKey: ["Deals"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, error, mutateDealFunction };
}
