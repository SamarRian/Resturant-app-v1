import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
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
import { useGetAllStaff } from "@/hooks/QueryHooks/Staff/useGetallStaff";
import { useGetAllVehicals } from "@/hooks/QueryHooks/Vehical/useGetAllVehicals";
import { usePosContext } from "@/hooks/usePosContext";
import { usePosOrderContext } from "@/hooks/usePosOrderContext";
import { useState } from "react";

export default function PosDeliveryDialog() {
  // CONTEXT
  const { PosDeliveryDialog, setPosDeliveryDialog } = usePosContext();
  const { submitOrderData } = usePosOrderContext();

  const [riderName, setRiderName] = useState("");
  const [deliveryAddress, setdeliveryAddress] = useState("");
  const [deliveryPhone, setdeliveryPhone] = useState(0);
  const [vehical, setVehical] = useState("");
  const [startDistance, setStartDistance] = useState(0);
  const [endDistance, setEndDistance] = useState(0);

  // STATE RESETER FUNCTION
  function resetAllStates() {
    setRiderName("");
    setdeliveryAddress("");
    setdeliveryPhone(0);
    setVehical("");
    setStartDistance(0);
    setEndDistance(0);
  }

  // DATA FETCHING
  const { staffData } = useGetAllStaff();
  const { data } = useGetAllVehicals();
  // AVAILABLE STAFF FILTERED
  const availableStaff = staffData?.staffData.filter(
    (staff, i) => staff.status === "Available"
  );
  // AVAILABLE VEHICALS FILTERED
  const availableVehicals = data?.filter(
    (vehical, i) => vehical.status === "Available"
  );
  const submitionData = {
    riderName,
    deliveryAddress,
    deliveryPhone: Number(deliveryPhone),
    vehical,
    startDistance: Number(startDistance),
    endDistance: Number(endDistance),
  };
  function handleSubmit(e) {
    e.preventDefault();
    submitOrderData("deliveryDetails", submitionData);
    resetAllStates();
    setPosDeliveryDialog(false);
  }
  return (
    <Dialog open={PosDeliveryDialog} onOpenChange={setPosDeliveryDialog}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="bg-linear-to-r from-purple-500 to-purple-600 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-white">
              Configure Delivery
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 py-4">
            <FieldGroup>
              <Field>
                <Label htmlFor="vehical">Rider's Name</Label>
                <Select
                  value={riderName}
                  onValueChange={(value) => setRiderName(value)}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select A Rider" />
                  </SelectTrigger>
                  <SelectContent className="max-h-40" position="popper">
                    <SelectGroup>
                      <SelectLabel>Rider's Name</SelectLabel>
                      {availableStaff?.map((staff) => (
                        <SelectItem key={staff._id} value={staff.personName}>
                          {staff.personName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                {/* DYNAMIC ADDRESS */}

                <FieldLabel htmlFor="new-address">
                  Enter Customer Address
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setdeliveryAddress(e.target.value)}
                    id="new-address"
                    name="newAddress"
                    placeholder="Block, Street"
                  />
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="new-address">
                  Enter Phone Number
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type="number"
                    required
                    value={deliveryPhone}
                    onChange={(e) => setdeliveryPhone(e.target.value)}
                    id="new-address"
                    name="newAddress"
                    placeholder="+92 321"
                  />
                </InputGroup>
              </Field>

              <Field>
                <Label htmlFor="vehical">Vehicle Number</Label>
                <Select
                  value={vehical}
                  required
                  onValueChange={(value) => setVehical(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select A Vehicle Number.." />
                  </SelectTrigger>
                  <SelectContent className="max-h-40" position="popper">
                    <SelectGroup>
                      <SelectLabel>Vehicle Number</SelectLabel>
                      {availableVehicals?.map((vehical) => (
                        <SelectItem
                          key={vehical._id}
                          value={vehical.vehicalNumber}
                        >
                          {vehical.vehicalNumber}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Label htmlFor="username-1">Distance</Label>
                <div className="flex items-center justify-between gap-1">
                  <Input
                    required
                    value={startDistance}
                    onChange={(e) => setStartDistance(e.target.value)}
                    id="username-1"
                    name="startDistance"
                    placeholder="Start KM"
                    type="number"
                  />
                  <Input
                    value={endDistance}
                    required
                    onChange={(e) => setEndDistance(e.target.value)}
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
