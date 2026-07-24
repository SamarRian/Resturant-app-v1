import { getWeeklySessions } from "@/services/PosSessionServices/posSessionServices";
import { useQuery } from "@tanstack/react-query";

export function useGetWeeklySessions() {
  const { data, isLoading } = useQuery({
    queryKey: ["weekly-sessions"],
    queryFn: getWeeklySessions,
  });
  return { data, isLoading };
}
