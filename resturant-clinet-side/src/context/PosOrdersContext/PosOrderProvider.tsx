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

  return (
    <PosOrderContext
      value={{
        emptyOrderID,
        handleEmptyOrderID,
      }}
    >
      {children}
    </PosOrderContext>
  );
}

export default PosOrderProvider;
