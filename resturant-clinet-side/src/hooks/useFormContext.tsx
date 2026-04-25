import { FormSwitcherContext } from "@/context/FormSwitcherContext";
import { useContext } from "react";
import { toast } from "sonner";

export function useFormContext() {
  const context = useContext(FormSwitcherContext);
  if (!context) {
    toast.error("useFormContext must be used within a FormSwitcherProvider");
  }
  return context;
}
