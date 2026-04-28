import { createDeal } from "@/services/dealsServices/dealServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateDeal() {
  const {
    isPending,
    error,
    mutate: mutateDealFunction,
  } = useMutation({
    mutationFn: (deal) => createDeal(deal),

    onSuccess: () => {
      toast.success("Deal Createtd Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, error, mutateDealFunction };
}
