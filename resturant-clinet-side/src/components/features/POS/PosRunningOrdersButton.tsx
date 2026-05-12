import { Button } from "@/components/ui/button";
import { usePosContext } from "@/hooks/usePosContext";
import { ListIcon } from "lucide-react";
import { createPortal } from "react-dom";
function PosRunningOrdersButton() {
  const { togglePosRunningDialog } = usePosContext();

  return createPortal(
    <div className="fixed top-[80%] right-4 z-50">
      <Button
        onClick={() => {
          togglePosRunningDialog();
        }}
        className="text-md cursor-pointer py-5 font-bold"
      >
        <ListIcon />
        Running Orders
      </Button>
    </div>,
    document.body
  );
}

export default PosRunningOrdersButton;
