import { closeSession } from "@/services/PosSessionServices/posSessionServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCloseSession() {
  const queryClient = useQueryClient();

  const {
    data,
    isPending,
    mutate: closeSessionFN,
  } = useMutation({
    mutationFn: ({ id, endingBalance, notes }) =>
      closeSession(id, endingBalance, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["single-session"] });
      toast.success("Session Closed Successfully"!);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { data, isPending, closeSessionFN };
}
