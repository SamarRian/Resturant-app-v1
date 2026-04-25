import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { TypographyH2, TypographyP } from "../Typography/Typography";
import { Switch } from "../ui/switch";
import { useFormContext } from "@/hooks/useFormContext";

const emptyRow = { name: "", cost: "", price: "", quantity: "", sku: "" };

export function DynamicFields() {
  const [rows, setRows] = useState([emptyRow]);

  const { enableVariations, toggleDynamicFields, dispatch, formState } =
    useFormContext();

  const addRow = () => {
    const updated = [...rows, emptyRow];
    setRows(updated);
    dispatch({ type: "UPDATE_VARIATIONS", value: updated });
  };

  const removeRow = (index: number) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
    dispatch({ type: "UPDATE_VARIATIONS", value: updated });
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updated);
    dispatch({ type: "UPDATE_VARIATIONS", value: updated });
  };

  return (
    <>
      <TypographyH2 className={"pb-0"}>Product Variations</TypographyH2>
      <div>
        <TypographyP className={"mb-4 text-muted-foreground"}>
          Add different sizes or options for this product
        </TypographyP>
        <Switch
          checked={enableVariations}
          onCheckedChange={toggleDynamicFields}
        />
      </div>

      <div className="mt-6 space-y-4">
        {enableVariations &&
          rows.map((row, index) => (
            <div key={index} className="flex flex-wrap items-end gap-3">
              {/* Title */}
              <div className="min-w-[200px] flex-1">
                <FieldGroup>
                  <Field>
                    <FieldLabel className="font-bold">
                      Title (e.g., Small, Medium, Large)
                    </FieldLabel>
                    <Input
                      type="text"
                      placeholder="Variant Name"
                      required
                      className="w-full"
                      value={row.name} // ✅
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      } // ✅
                    />
                  </Field>
                </FieldGroup>
              </div>

              {/* Cost */}
              <div className="min-w-[150px] flex-1">
                <FieldGroup>
                  <Field>
                    <FieldLabel className="font-bold">Cost</FieldLabel>
                    <Input
                      required
                      className="w-full"
                      type="text"
                      placeholder="Add Cost"
                      value={row.cost}
                      onChange={(e) =>
                        handleChange(index, "cost", e.target.value)
                      }
                    />
                  </Field>
                </FieldGroup>
              </div>

              {/* Price */}
              <div className="min-w-[150px] flex-1">
                <FieldGroup>
                  <Field>
                    <FieldLabel className="font-bold">Price</FieldLabel>
                    <Input
                      required
                      className="w-full"
                      type="text"
                      placeholder="Add Price"
                      value={row.price}
                      onChange={(e) =>
                        handleChange(index, "price", e.target.value)
                      }
                    />
                  </Field>
                </FieldGroup>
              </div>

              {/* Quantity */}
              <div className="min-w-[150px] flex-1">
                <FieldGroup>
                  <Field>
                    <FieldLabel className="font-bold">Quantity</FieldLabel>
                    <Input
                      required
                      className="w-full"
                      type="text"
                      placeholder="Add Quantity"
                      value={row.quantity}
                      onChange={(e) =>
                        handleChange(index, "quantity", e.target.value)
                      }
                    />
                  </Field>
                </FieldGroup>
              </div>

              {/* SKU */}
              <div className="min-w-[150px] flex-1">
                <FieldGroup>
                  <Field>
                    <FieldLabel className="font-bold">SKU Code</FieldLabel>
                    <Input
                      required
                      className="w-full"
                      type="text"
                      placeholder={`PROD ${index + 1}`}
                      value={row.sku}
                      onChange={(e) =>
                        handleChange(index, "sku", e.target.value)
                      }
                    />
                  </Field>
                </FieldGroup>
              </div>

              {/* Actions */}
              <div className="flex items-end gap-2">
                {index === 0 && (
                  <Button variant="outline" size="icon" onClick={addRow}>
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
