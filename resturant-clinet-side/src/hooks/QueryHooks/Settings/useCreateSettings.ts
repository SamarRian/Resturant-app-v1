import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSettings } from "@/services/settingsServices/settingsServices.js";
import { toast } from "sonner";

export function useCreateSettings() {
  const queryClient = useQueryClient();

  const { mutate: createSettingsFN, isPending } = useMutation({
    mutationFn: (settingsData) => createSettings(settingsData),

    onSuccess: () => {
      toast.success("Settings Updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createSettingsFN, isPending };
}
