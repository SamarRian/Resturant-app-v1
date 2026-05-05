import { getAllSettings } from "@/services/settingsServices/settingsServices";
import { useQuery } from "@tanstack/react-query";

export function useGetAllSettings() {
  const { data, isLoading: isSettingsLoading } = useQuery({
    queryFn: getAllSettings,
    queryKey: ["settings"],
  });

  return { data, isSettingsLoading };
}
