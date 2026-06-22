import { PosOrderContext } from "@/context/PosOrdersContext/PosOrderContext";
import { useContext } from "react";
import { toast } from "sonner";

export function usePosOrderContext() {
  const context = useContext(PosOrderContext);
  if (!context)
    toast.error(
      "usePosOrderContext must be used within a FormSwitcherProvider"
    );

  return context;
}
