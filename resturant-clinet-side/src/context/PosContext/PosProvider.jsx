import { useState } from "react";
import { PosContext } from "./PosContext";
function PosProvider({ children }) {
  // POS PAYMENT TABS VALUES

  const [paymentTab, setPaymentTab] = useState("");

  function handlePaymentTabs(value) {
    setPaymentTab(value);
  }

  // POS PAYMENT DIALOG

  const [isPosPaymentDialog, setPosPaymentDialog] = useState(false);

  function togglePosPaymentDialog() {
    setPosPaymentDialog((prev) => !prev);
  }

  // POS CALCULATION DIALOG

  const [isPosCalculationsDialog, setPosCalculationDialog] = useState(false);

  const [calculationType, setCalculationType] = useState("");

  function togglePosCalculationDialog() {
    setPosCalculationDialog((prev) => !prev);
  }
  function handleCalculationType(type) {
    setCalculationType(type);
  }

  // handle current deal product
  const [currentDealProduct, seCurrentDealProduct] = useState(null);

  function handleCurrentDealProduct(currentProduct) {
    seCurrentDealProduct(currentProduct);
  }

  // toggle pos deal dialoge

  const [IsPosDealDialogOpen, setPosDealDialog] = useState(false);

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
        isPosCalculationsDialog,
        setPosCalculationDialog,
        togglePosCalculationDialog,
        calculationType,
        handleCalculationType,
        isPosPaymentDialog,
        setPosPaymentDialog,
        togglePosPaymentDialog,
        paymentTab,
        setPaymentTab,
        handlePaymentTabs,
      }}
    >
      {children}
    </PosContext>
  );
}

export default PosProvider;
