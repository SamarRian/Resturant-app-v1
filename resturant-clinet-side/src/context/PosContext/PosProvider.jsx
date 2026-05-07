import { useState } from "react";
import { PosContext } from "./PosContext";
function PosProvider({ children }) {
  const [IsPosDealDialogOpen, setPosDealDialog] = useState(false);

  const [currentDealProduct, seCurrentDealProduct] = useState(null);

  // handle current deal product

  function handleCurrentDealProduct(currentProduct) {
    seCurrentDealProduct(currentProduct);
  }

  // toggle pos deal dialoge
  function togglePosDealDialog() {
    setPosDealDialog((prev) => !prev);
  }

  return (
    <PosContext
      value={{
        IsPosDealDialogOpen,
        setPosDealDialog,
        togglePosDealDialog,
        currentDealProduct,
        handleCurrentDealProduct,
      }}
    >
      {children}
    </PosContext>
  );
}

export default PosProvider;
