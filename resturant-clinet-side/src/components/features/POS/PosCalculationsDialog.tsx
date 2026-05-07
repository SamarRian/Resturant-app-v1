import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePosContext } from "@/hooks/usePosContext";
import { PosTaxTabs } from "./PosTaxTabs";
import { cn } from "@/lib/utils";

export function PosCalculationsDialog() {
  const { isPosCalculationsDialog, setPosCalculationDialog, calculationType } =
    usePosContext();
  return (
    <Dialog
      open={isPosCalculationsDialog}
      onOpenChange={setPosCalculationDialog}
    >
      <DialogContent className="overflow-hidden p-0 sm:max-w-sm">
        <DialogHeader
          className={cn(
            "flex flex-row items-center justify-between bg-linear-to-r from-cyan-500 to-cyan-600 px-6 py-3 text-white",

            calculationType === "Tax" &&
              "bg-linear-to-r from-yellow-500 to-yellow-600"
          )}
        >
          <DialogTitle className="text-lg font-semibold text-white">
            Apply {calculationType}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-4">
          <FieldGroup>
            {calculationType === "Tax" && (
              <Field>
                <Label>Tax Type</Label>
                <PosTaxTabs />
              </Field>
            )}

            <Field>
              <Label htmlFor="discountType-1">
                {calculationType} Calculation Method
              </Label>

              <Select name="calculationType">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`${calculationType} method...`} />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {calculationType} Calculation Method
                    </SelectLabel>

                    <SelectItem value="percentage">Percentage</SelectItem>

                    <SelectItem value="fixed">Fixed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label htmlFor="discountValue-1">{calculationType} Value</Label>

              <InputGroup>
                <InputGroupInput
                  id="discountValue-1"
                  name="calculationValue"
                  placeholder={`Enter ${calculationType} Value...`}
                  className="px-2"
                  type="number"
                />

                <InputGroupAddon className="border-r-2 pr-2">
                  PKR
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </div>

        <DialogFooter className="mb-1.5 px-8">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            type="submit"
            className={cn(
              calculationType === "Tax" &&
                "bg-yellow-500 hover:bg-yellow-500/80"
            )}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
