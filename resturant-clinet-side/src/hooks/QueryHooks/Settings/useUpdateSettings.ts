import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettingsById } from "@/services/settingsServices/settingsServices.js";
import { toast } from "sonner";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettingsFN, isPending } = useMutation({
    mutationFn: ({ id, formData }) => updateSettingsById(id, formData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings updated successfully!");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSettingsFN, isPending };
}
