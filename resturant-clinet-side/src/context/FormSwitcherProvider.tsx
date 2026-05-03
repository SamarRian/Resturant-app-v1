import React, { useReducer, useState } from "react";
import { FormSwitcherContext } from "./FormSwitcherContext";

// Reducer initial state (PRODUCTS FORM)

const initialFormState = {
  name: "",
  productType: "",
  category: "",
  productCode: "",
  cost: "",
  price: "",
  quantity: "",
  description: "",
  enableVariation: false,
  image: null as File | null,
  variations: [] as {
    name: string;
    cost: string;
    price: string;
    quantity: string;
    sku: string;
  }[],
};

type FormState = typeof initialFormState;

type FormAction =
  | {
      type: "UPDATE_FIELD";
      field: keyof FormState;
      value: string | File | null;
    }
  | { type: "UPDATE_VARIATIONS"; value: typeof initialFormState.variations }
  | { type: "RESET" };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "UPDATE_VARIATIONS":
      return { ...state, variations: action.value };
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
}

// CREATE DEAL FORM INITIAL STATE
const createDealInitialState = {
  dealName: "",
  dealTitle: "",
  dealCost: 0,
  dealPrice: 0,
  image: null as File | null | string, // ✅ String bhi allow karo (DB se aayega)
  displayPOS: "",
  status: "",
};

type CreateDealState = typeof createDealInitialState;

type CreateDealAction =
  | {
      type: "UPDATE_FIELD";
      field: keyof CreateDealState;
      value: string | number | boolean | File | null;
    }
  | { type: "RESET" }
  | { type: "SET_ALL"; payload: Partial<CreateDealState> }; // ✅ Ek hi type

// Reducer
function createDealReducer(
  state: CreateDealState,
  action: CreateDealAction
): CreateDealState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_ALL":
      return { ...state, ...action.payload };

    case "RESET":
      return createDealInitialState;

    default:
      return state;
  }
}

export function FormSwitcherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  // Create Deal Reducer
  const [dealFormState, dispatchDeal] = useReducer(
    createDealReducer,
    createDealInitialState
  );

  // SINGLE INPUT DIALOGE

  const [isSingleDialog, setIsSingleDialog] = useState(false);

  const [enableVariations, setEnableDynamicFields] = useState(false);
  // ALL DEALS DIALOGUE

  const [isDialogeOpen, setOpenDialoge] = useState(false);

  // UPDATE DEALS DIALOG

  const [isUpdateDealOpen, setUpdateDealOpen] = useState(false);

  // UPDATE DEAL STATE

  const [updateDealData, seUpdateDealData] = useState({});

  // deal id
  const [dealId, setDealID] = useState("");
  // TABLE ID
  const [tableId, setTableId] = useState("");

  // STaff id
  const [staffID, setStaffID] = useState("");
  const [categoryID, setCategoryID] = useState("");

  function handleCategoryId(id) {
    setCategoryID(id);
  }

  function handleStaffID(id) {
    setStaffID(id);
  }

  function handleTableID(id) {
    setTableId(id);
  }

  function handleDealID(id) {
    setDealID(id);
  }

  // UPDATE DEALS DIALOGE TOGGLE

  function toggleUpdateDialoge() {
    setUpdateDealOpen((prev) => !prev);
  }

  // update deal handler

  function handleUpdateDeal(combinedData) {
    seUpdateDealData(combinedData);
  }

  const toggleDialogue = () => {
    setOpenDialoge((prev) => !prev);
  };

  const toggleDynamicFields = () => {
    setEnableDynamicFields((prev) => !prev);
  };

  // Single Input Dialog
  function toggleSingleDialog() {
    setIsSingleDialog((prev) => !prev);
  }
  return (
    <FormSwitcherContext.Provider
      value={{
        enableVariations,
        toggleDynamicFields,
        formState,
        dispatch,
        toggleDialogue,
        setOpenDialoge,
        isDialogeOpen,
        dealFormState,
        dispatchDeal,
        updateDealData,
        handleUpdateDeal,
        handleDealID,
        dealId,
        toggleUpdateDialoge,
        isUpdateDealOpen,
        setUpdateDealOpen,
        isSingleDialog,
        setIsSingleDialog,
        toggleSingleDialog,
        tableId,
        setTableId,
        handleTableID,
        handleStaffID,
        staffID,
        categoryID,
        handleCategoryId,
      }}
    >
      {children}
    </FormSwitcherContext.Provider>
  );
}
