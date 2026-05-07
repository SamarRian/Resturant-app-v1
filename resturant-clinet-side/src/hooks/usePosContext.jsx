import { PosContext } from "@/context/PosContext/PosContext";
import { useContext } from "react";

export function usePosContext() {
  const context = useContext(PosContext);
  if (!context) {
    toast.error("useFormContext must be used within a FormSwitcherProvider");
  }
  return context;
}
