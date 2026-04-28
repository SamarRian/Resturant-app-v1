import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { WandSparkles } from "lucide-react";
import FileUploaderComp from "./FileUpload";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFormContext } from "../../hooks/useFormContext";
import { useCreateDeal } from "@/hooks/QueryHooks/Deals/useCreateDeal";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

export default function AddDeal({ open, onOpenchange }) {
  const { dealFormState, dispatchDeal } = useFormContext();

  const { mutateDealFunction, isPending } = useCreateDeal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchDeal({
      type: "UPDATE_FIELD",
      field: e.target.name as keyof typeof dealFormState,
      value: e.target.value,
    });
  };

  const handleSelectChange =
    (field: keyof typeof dealFormState) => (value: string) => {
      dispatchDeal({
        type: "UPDATE_FIELD",
        field,
        value,
      });
    };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dealForm = new FormData();
    if (!dealFormState.dealName || !dealFormState.dealTitle) {
      toast.error("Required fields missing");
      return;
    }
    dealForm.append("dealName", dealFormState.dealName);
    dealForm.append("dealTitle", dealFormState.dealTitle);
    dealForm.append("dealCost", dealFormState.dealCost);
    dealForm.append("dealPrice", dealFormState.dealPrice);
    dealForm.append("displayPOS", dealFormState.displayPOS);
    dealForm.append("status", dealFormState.status);

    if (dealFormState.image) {
      dealForm.append("image", dealFormState.image);
    }
    mutateDealFunction(dealForm);
  };

  const regularPrice = dealFormState.dealCost - dealFormState.dealPrice;

  return (
    <Dialog open={open} onOpenChange={onOpenchange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create your Deal</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new deal. Click submit when you're
            done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup className="grid lg:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="deal-name">Deal Name</FieldLabel>
              <Input
                id="deal-name"
                name="dealName"
                type="text"
                value={dealFormState.dealName}
                onChange={handleInputChange}
                placeholder="Customer Deal"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="deal-title">Deal Title</FieldLabel>
              <Input
                id="deal-title"
                name="dealTitle"
                type="text"
                value={dealFormState.dealTitle}
                onChange={handleInputChange}
                placeholder="Special"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="deal-cost">Deal Cost (PKR)</FieldLabel>
              <Input
                id="deal-cost"
                name="dealCost"
                type="number"
                value={dealFormState.dealCost}
                onChange={handleInputChange}
                placeholder="Enter Deal Cost"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="deal-price">Deal Price (PKR)</FieldLabel>
              <Input
                id="deal-price"
                name="dealPrice"
                type="number"
                value={dealFormState.dealPrice}
                onChange={handleInputChange}
                placeholder="Enter Deal Price"
                required
              />
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="regular-price">
                  Regular Price (PKR)
                </FieldLabel>
                <span className="flex items-center gap-1">
                  <WandSparkles className="size-4" /> Auto Calculated
                </span>
              </div>
              <Input
                disabled
                id="regular-price"
                name="regularPrice"
                value={regularPrice}
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="flex items-center gap-2">
            <Field>
              <FieldLabel>Deal Image</FieldLabel>
              <FileUploaderComp fileHeading={false} dispatch={dispatchDeal} />
            </Field>
          </FieldGroup>

          <FieldGroup className="flex-row">
            <Field>
              <FieldLabel>Display in POS</FieldLabel>
              <Select
                required
                value={dealFormState.displayPOS}
                onValueChange={handleSelectChange("displayPOS")}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Yes or No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Display in POS</SelectLabel>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select
                required
                value={dealFormState.status}
                onValueChange={handleSelectChange("status")}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">InActive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Deal"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
