import { updateOrder } from "@/services/PosSessionServices/PosOrderServices/PosOrderServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateOrder() {
  const {
    data,
    isPending,
    mutate: updateOrderFN,
  } = useMutation({
    mutationFn: ({ orderId, orderData }) => updateOrder(orderId, orderData),
    onSuccess: () => {
      toast.success("Order updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { data, isPending, updateOrderFN };
}
