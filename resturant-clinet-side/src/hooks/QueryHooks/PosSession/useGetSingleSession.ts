import { getSingleSession } from "@/services/PosSessionServices/posSessionServices";
import { useQuery } from "@tanstack/react-query";

export function useGetSingleSession(id) {
  console.log("QUERY GET SINGLE SESSIN HOOK ID", id);

  const { data, isLoading } = useQuery({
    queryFn: () => getSingleSession(id),
    queryKey: ["single-session", id],
    enabled: !!id,
  });

  return { data, isLoading };
}
