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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePosContext } from "@/hooks/usePosContext";

export default function PosCustomerDetailsDialog() {
  const { PosCustomerDetailDialog, setPosCustomerDetailDialog } =
    usePosContext();
  return (
    <Dialog
      open={PosCustomerDetailDialog}
      onOpenChange={setPosCustomerDetailDialog}
    >
      <form>
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-sm">
          <DialogHeader className="bg-linear-to-r from-slate-700 to-slate-800 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-white">
              Customer Details
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 py-4">
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="customerName"
                  placeholder="Enter customer name..."
                />
              </Field>
              <Field>
                <Label htmlFor="phone-number-1">Phone Number</Label>
                <Input
                  id="phone-number-1"
                  name="phoneNumber"
                  type="number"
                  placeholder="+92 333222666"
                />
              </Field>
              <Field>
                <Label htmlFor="customer-address-1">Address</Label>
                <Textarea
                  id="customer-address-1"
                  name="customerAddress"
                  placeholder="City, Street no ...."
                />
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter>
            <div className="mx-3 mb-3 space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
