import type React from "react";
import { PosOrderContext } from "./PosOrderContext";
import { useState } from "react";

function PosOrderProvider({ children }: { children: React.ReactNode }) {
  const [emptyOrderID, setEmptyOrderID] = useState(() => {
    return localStorage.getItem("emptyOrderID") || "";
  });
  function handleEmptyOrderID(id: string) {
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
      // tableId: order.tableId,
      // orderType: order.orderType,
      // customerId: order.customerId,
      // orderSource: order.orderSource,
      // deliveryAddress: order.deliveryAddress,
      // deliveryPhone: order.deliveryPhone,
      // subTotal: order.subTotal,
      // discountType: order.discountType,
      // discountValue: order.discountValue,
      // discountAmount: order.discountAmount,
      // serviceChargeType: order.serviceChargeType,
      // serviceChargeValue: order.serviceChargeValue,
      // serviceChargeAmount: order.serviceChargeAmount,
      // taxType: order.taxType,
      // taxMethod: order.taxMethod,
      // taxValue: order.taxValue,
      // taxAmount: order.taxAmount,
      // totalAmount: order.totalAmount,
      // paymentMethod: order.paymentMethod,
      // paymentStatus: order.paymentStatus,
      // paymentNote: order.paymentNote,
      // customerNotes: order.customerNotes,
      // kitchenNotes: order.kitchenNotes || "",
      // riderWaiter: order.riderWaiter || "",
    });
  }
  function getPlainOrderData() {
    const {
      deliveryDetails,
      taxDetails: { amount: taxValue, taxtype: taxMethod, type: taxType } = {},
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
  return (
    <PosOrderContext
      value={{
        emptyOrderID,
        handleEmptyOrderID,
        orderData,
        submitOrderData,
        getPlainOrderData,
      }}
    >
      {children}
    </PosOrderContext>
  );
}

export default PosOrderProvider;
