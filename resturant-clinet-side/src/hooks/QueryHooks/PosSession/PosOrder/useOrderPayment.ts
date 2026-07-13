import { processOrderPayment } from "@/services/PosSessionServices/PosOrderServices/PosOrderServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useOrderPayment() {
  const queryClient = useQueryClient();
  const {
    data: paidOrderData,
    isPending: isOrderPaymentPending,
    mutate: processOrderPaymentFN,
  } = useMutation({
    mutationFn: ({ orderId, paymentData }) =>
      processOrderPayment(orderId, paymentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleOrder"] });
      queryClient.invalidateQueries({ queryKey: ["activeSessionOrders"] });
      queryClient.invalidateQueries({ queryKey: ["single-session"] });

      toast.success("Payment processed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { paidOrderData, isOrderPaymentPending, processOrderPaymentFN };
}
