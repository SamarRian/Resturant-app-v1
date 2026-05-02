import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../../ui/textarea";
import { useFormContext } from "@/hooks/useFormContext";

export function ProductForm() {
  const { enableVariations, formState, dispatch } = useFormContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name as keyof typeof formState,
      value: e.target.value,
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name as keyof typeof formState,
      value: e.target.value,
    });
  };

  const handleSelectChange =
    (field: keyof typeof formState) => (value: string) => {
      dispatch({
        type: "UPDATE_FIELD",
        field,
        value,
      });
    };

  return (
    <div className="mt-5 w-full">
      <FieldGroup>
        <Field data-disabled={enableVariations}>
          <FieldLabel className="font-bold" htmlFor="form-name">
            Name
          </FieldLabel>
          <Input
            required
            name="name"
            id="form-name"
            type="text"
            placeholder="Enter Your Product Name"
            value={formState.name}
            onChange={handleInputChange}
            disabled={enableVariations}
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-disabled={enableVariations}>
            <FieldLabel className="font-bold">Product Type</FieldLabel>
            <Select
              required
              value={formState.productType}
              onValueChange={handleSelectChange("productType")}
              disabled={enableVariations}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cafe">Cafe</SelectItem>
                <SelectItem value="showcase">Show Case</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field data-disabled={enableVariations}>
            <FieldLabel className="font-bold">Category</FieldLabel>
            <Select
              required
              value={formState.category}
              onValueChange={handleSelectChange("category")}
              disabled={enableVariations}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pizza">Pizza</SelectItem>
                <SelectItem value="burger">Burger</SelectItem>
                <SelectItem value="pasta">Pasta</SelectItem>
                <SelectItem value="cake">Cake</SelectItem>
                <SelectItem value="salad">Salad</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field data-disabled={enableVariations}>
          <FieldLabel className="font-bold">Product Code</FieldLabel>
          <Input
            required
            name="productCode"
            type="text"
            placeholder="Enter Product Code"
            value={formState.productCode}
            onChange={handleInputChange}
            disabled={enableVariations}
          />
        </Field>

        <Field data-disabled={enableVariations}>
          <FieldLabel className="font-bold">Cost</FieldLabel>
          <Input
            required
            name="cost"
            type="text"
            placeholder="Enter Product Cost"
            value={formState.cost}
            onChange={handleInputChange}
            disabled={enableVariations}
          />
        </Field>

        <Field data-disabled={enableVariations}>
          <FieldLabel className="font-bold">Price</FieldLabel>
          <Input
            required
            name="price"
            type="text"
            placeholder="Enter Product Price"
            value={formState.price}
            onChange={handleInputChange}
            disabled={enableVariations}
          />
        </Field>

        <Field data-disabled={enableVariations}>
          <FieldLabel className="font-bold">Quantity</FieldLabel>
          <Input
            required
            name="quantity"
            type="text"
            placeholder="Enter Product Quantity"
            value={formState.quantity}
            onChange={handleInputChange}
            disabled={enableVariations}
          />
        </Field>

        {/* ✅ Textarea — handleTextareaChange */}
        <Field data-disabled={enableVariations}>
          <FieldLabel className="font-bold">Description</FieldLabel>
          <Textarea
            required
            name="description"
            placeholder="Enter Description"
            value={formState.description}
            onChange={handleTextareaChange}
            disabled={enableVariations}
          />
        </Field>
      </FieldGroup>
    </div>
  );
}
