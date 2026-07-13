import type React from "react";
import { PosOrderContext } from "./PosOrderContext";
import { useState } from "react";

function PosOrderProvider({ children }: { children: React.ReactNode }) {
  const [emptyOrderID, setEmptyOrderID] = useState(() => {
    return localStorage.getItem("emptyOrderID") || "";
  });
  function handleEmptyOrderID(id: string) {
    localStorage.removeItem("emptyOrderID");
    localStorage.setItem("emptyOrderID", id);
    setEmptyOrderID(id);
  }

  const [orderData, setOrderData] = useState({});

  function submitOrderData(key, value) {
    if (!orderData) return;

    setOrderData((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      };

      if (
        (key === "orderType" && value === "delivery") ||
        value === "takeaway"
      ) {
        updated.tableId = null;
      } else if (key === "orderType" && value !== "delivery") {
        updated.deliveryDetails = null;
      }

      return updated;
    });
  }
  function getPlainOrderData() {
    const {
      deliveryDetails,
      taxDetails: { amount: taxValue, taxtype: taxType, type: taxMethod } = {},
      discountDetails: { type: discountType, amount: discountValue } = {},

      serviceDetails: {
        type: serviceChargeType,
        amount: serviceChargeValue,
      } = {},
      ...rest
    } = orderData;
    return {
      ...rest,
      ...(deliveryDetails ?? {}),
      taxValue,
      taxMethod,
      taxType,
      discountType,
      discountValue,
      serviceChargeType,
      serviceChargeValue,
    };
  }

  const [viewedOrderId, setViewedOrderId] = useState(() => {
    return localStorage.getItem("viewdOrderID") || "";
  });

  function handleViewedOrderId(id) {
    localStorage.removeItem("viewdOrderID");
    localStorage.setItem("viewdOrderID", id);
    setViewedOrderId(id);
  }

  return (
    <PosOrderContext
      value={{
        emptyOrderID,
        handleEmptyOrderID,
        orderData,
        submitOrderData,
        getPlainOrderData,
        viewedOrderId,
        handleViewedOrderId,
      }}
    >
      {children}
    </PosOrderContext>
  );
}

export default PosOrderProvider;
