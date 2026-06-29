import { addOrderItems } from "@/services/PosSessionServices/PosOrderServices/PosOrderServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddOrderItems() {
  const {
    data,
    isPending: isOrderItemsPending,
    mutate: addOrderItemsFN,
  } = useMutation({
    mutationFn: ({ orderID, orderItems }) => addOrderItems(orderID, orderItems),
    onSuccess: () => {
      toast.success("Order items added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { data, isOrderItemsPending, addOrderItemsFN };
}
