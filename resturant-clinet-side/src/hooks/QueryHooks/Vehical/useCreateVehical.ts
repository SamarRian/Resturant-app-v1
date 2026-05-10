import { createVehical } from "@/services/vehicalServices/vehicalServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateVehical() {
  const queryClient = useQueryClient();

  const { mutate: createVehicalFN, isPending } = useMutation({
    mutationFn: (vehicalNumber: string) => createVehical(vehicalNumber),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Vehicals"] });
      toast.success("Vehicle created successfully");
    },

    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { createVehicalFN, isPending };
}
