import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TypographyH3 } from "../Typography/Typography";
import { PlusIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import UpdateDealsTable from "./UpdateDealsTable";
import { useFormContext } from "@/hooks/useFormContext";

export default function UpdateDeal() {
  const { isDialogeOpen, setOpenDialoge } = useFormContext();
  return (
    <Dialog open={isDialogeOpen} onOpenChange={setOpenDialoge}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Deal</DialogTitle>
          <DialogDescription>
            Update deal details below. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <form>
          <FieldGroup>
            <FieldSet>
              <div className="grid grid-cols-1 gap-4 rounded-md border px-2 py-4 md:grid-cols-3">
                <Field>
                  <FieldLabel htmlFor="product">Select Product</FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Select Your Product" />
                    </SelectTrigger>
                    <SelectContent className="max-h-50!" position="popper">
                      <SelectGroup>
                        <SelectLabel>Product List</SelectLabel>
                        {[...Array(20)].map((_, i) => (
                          <SelectItem
                            key={i}
                            value={String(i + 1).padStart(2, "0")}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                    Select Variation
                  </FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-7j9-exp-year-f59">
                      <SelectValue placeholder="Select your variation" />
                    </SelectTrigger>
                    <SelectContent className="max-h-50!" position="popper">
                      <SelectGroup>
                        {[2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                          <SelectItem key={year} value={String(year)}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    required
                  />
                </Field>
                <div>
                  <Button>
                    <PlusIcon /> Add Item
                  </Button>
                </div>
              </div>
            </FieldSet>
          </FieldGroup>
          <div className="mt-1 rounded-2xl border px-1 py-2 sm:mt-2 md:mt-4 md:px-2 md:py-4">
            <TypographyH3 className={"m-0 py-0 text-lg font-light"}>
              Current Deals Data
            </TypographyH3>
            <Separator />
          </div>
          <div>
            <UpdateDealsTable />
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
