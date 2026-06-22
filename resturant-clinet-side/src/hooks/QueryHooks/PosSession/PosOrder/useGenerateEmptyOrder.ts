import { generateOrder } from "@/services/PosSessionServices/PosOrderServices/PosOrderServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGenerateEmptyOrder() {
  const {
    data,
    isPending,
    mutate: generateEmptyOrderFN,
  } = useMutation({
    mutationFn: () => generateOrder(),
    onSuccess: () => {
      toast.success("Empty Order Created Successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { data, isPending, generateEmptyOrderFN };
}
