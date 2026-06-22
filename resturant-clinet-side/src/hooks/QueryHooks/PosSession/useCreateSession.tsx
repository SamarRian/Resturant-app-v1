import { createSession } from "@/services/PosSessionServices/posSessionServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateSession() {
  const {
    data,
    mutate: createSessionFN,
    isPending,
  } = useMutation({
    mutationFn: ({ startingBalance, notes }) =>
      createSession(startingBalance, notes),

    onSuccess: () => {
      toast.success("Session Created Successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { data, isPending, createSessionFN };
}
