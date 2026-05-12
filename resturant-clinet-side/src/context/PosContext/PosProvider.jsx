import { useState } from "react";
import { PosContext } from "./PosContext";

function PosProvider({ children }) {
  // POS RNNING ORDERS DIALOG

  const [isPosRunningDialog, setIsPosRunningDialog] = useState(false);

  function togglePosRunningDialog() {
    setIsPosRunningDialog((prev) => !prev);
  }

  // POS END SESSION DIALOG

  const [isPosEndSessionDialog, setPosEndSessionDialog] = useState(false);

  function togglePosEndSessionDialog() {
    setPosEndSessionDialog((prev) => !prev);
  }

  // POS FOOTER CALCULATIONS
  const [calculateValue, setCalculateValue] = useState({});

  const [calculatePosDiscount, setCalculatePosDiscount] = useState({
    type: "",
    amount: "",
  });
  const [calculatePosService, setCalculatePosService] = useState({
    type: "",
    amount: "",
  });
  const [calculatePosTax, setCalculatePosTax] = useState({
    type: "",
    amount: "",
    taxtype: "",
  });

  // POS CUSTOMER DETAULS DIALOG
  const [PosCustomerDetailDialog, setPosCustomerDetailDialog] = useState(false);
  function togglePosCustomerDetailDialog() {
    setPosCustomerDetailDialog((prev) => !prev);
  }
  // POS DEVLIERY DIALOG
  const [PosDeliveryDialog, setPosDeliveryDialog] = useState(false);

  function togglePosDeliveryDialog() {
    setPosDeliveryDialog((prev) => !prev);
  }

  // POS PRODUCT DIALOG
  const [PosProductDialog, setPosProductDialog] = useState(false);

  function togglePosProductDialog() {
    setPosProductDialog((prev) => !prev);
  }

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
        PosProductDialog,
        setPosProductDialog,
        togglePosProductDialog,
        PosDeliveryDialog,
        setPosDeliveryDialog,
        togglePosDeliveryDialog,
        PosCustomerDetailDialog,
        setPosCustomerDetailDialog,
        togglePosCustomerDetailDialog,
        calculateValue,
        setCalculateValue,
        calculatePosDiscount,
        setCalculatePosDiscount,
        calculatePosService,
        setCalculatePosService,
        calculatePosTax,
        setCalculatePosTax,
        isPosEndSessionDialog,
        setPosEndSessionDialog,
        togglePosEndSessionDialog,
        isPosRunningDialog,
        setIsPosRunningDialog,
        togglePosRunningDialog,
      }}
    >
      {children}
    </PosContext>
  );
}

export default PosProvider;
