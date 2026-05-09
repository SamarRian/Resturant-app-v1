import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function PosDeliveryDialog() {
  const { PosDeliveryDialog, setPosDeliveryDialog, togglePosDeliveryDialog } =
    usePosContext();

  const [isAddressInputOpen, setIsAddressInputOpen] = useState(false);

  function toggleAddressInput() {
    setIsAddressInputOpen((prev) => !prev);
  }

  return (
    <Dialog open={PosDeliveryDialog} onOpenChange={setPosDeliveryDialog}>
      <form>
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-sm">
          <DialogHeader className="bg-linear-to-r from-purple-500 to-purple-600 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-white">
              Configure Delivery
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 py-4">
            <FieldGroup>
              <Field>
                <Label htmlFor="vehical">Rider Name</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select A Rider..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Rider Name</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                {/* DYNAMIC ADDRESS */}
                <Label htmlFor="customer-address">Customer Address</Label>
                <div className="flex items-center justify-between gap-1">
                  <ScrollArea className="h-16 w-full rounded-md border p-2">
                    <RadioGroup defaultValue="option-one">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Option One</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Option Two</Label>
                      </div>
                    </RadioGroup>
                  </ScrollArea>

                  <Button onClick={toggleAddressInput}>
                    {isAddressInputOpen !== true ? (
                      <Plus className="h-4 w-4" />
                    ) : (
                      <Minus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </Field>
              {isAddressInputOpen && (
                <Field>
                  <FieldLabel htmlFor="new-address">
                    Enter New Address
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="new-address"
                      name="newAddress"
                      placeholder="Search..."
                    />
                    <InputGroupAddon align="inline-end" className="p-0!">
                      <Button
                        size={"icon"}
                        type="button"
                        onClick={() => console.log("search clicked")}
                        className="rounded-l-none border-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Icon positioned at the start.
                  </FieldDescription>
                </Field>
              )}
              <Field>
                <Label htmlFor="vehical">Vehicle Number</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select A Vehicle Number.." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Vehicle Number</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Label htmlFor="username-1">Distance</Label>
                <div className="flex items-center justify-between gap-1">
                  <Input
                    id="username-1"
                    name="startDistance"
                    placeholder="Start KM"
                    type="number"
                  />
                  <Input
                    name="amount"
                    id="endDistance"
                    placeholder="End KM"
                    type="number"
                  />
                </div>
              </Field>
            </FieldGroup>
          </div>
          <div className="px-6 py-4">
            <DialogFooter className="">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
