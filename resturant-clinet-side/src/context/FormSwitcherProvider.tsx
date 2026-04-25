import React, { useReducer, useState } from "react";
import { FormSwitcherContext } from "./FormSwitcherContext";

// Reducer initial state

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

export function FormSwitcherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [enableVariations, setEnableDynamicFields] = useState(false);
  const toggleDynamicFields = () => {
    setEnableDynamicFields((prev) => !prev);
  };

  return (
    <FormSwitcherContext.Provider
      value={{ enableVariations, toggleDynamicFields, formState, dispatch }}
    >
      {children}
    </FormSwitcherContext.Provider>
  );
}
