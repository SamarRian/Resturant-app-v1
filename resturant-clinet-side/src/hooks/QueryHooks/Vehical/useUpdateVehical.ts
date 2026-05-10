import { updateVehical } from "@/services/vehicalServices/vehicalServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateVehical() {
  const queryClient = useQueryClient();

  const { mutate: updateVehicalFN, isPending } = useMutation({
    mutationFn: ({
      id,
      ...updateData
    }: {
      id: string;
      vehicalNumber?: string;
      status?: string;
    }) => updateVehical(id, updateData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Vehicals"] });
      toast.success("Vehicle updated successfully");
    },

    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { updateVehicalFN, isPending };
}
