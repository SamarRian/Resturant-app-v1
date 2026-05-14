import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { CreditCard, Smartphone, ReceiptText } from "lucide-react";
import { usePosContext } from "@/hooks/usePosContext";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { PosPaymentPrint } from "@/lib/helper";

// BILL PRINT STATIC DATA
const dummyData: PrintData = {
  restaurantName: "Swad Nagar",
  address: "Japan Town, Mureedwala Road, Mamu Kanjan",
  phone: "03357111507",

  customer: "Walk-in Customer",
  customerPhone: "03325016549",
  date: "May 13, 2026 11:53",
  type: "Delivery",

  items: [
    {
      name: "Steak Wrap",
      variant: "Regular",
      qty: 1,
      price: 450,
      total: 450,
    },
    {
      name: "Soft Drink",
      variant: "H-Liter",
      qty: 1,
      price: 140,
      total: 140,
    },
  ],

  subtotal: 590,
  total: 590,
  paid: 590,
  paymentMethod: "Cash",
  paymentStatus: "Paid",
};

export default function PosPaymentDialog({
  subtotal,
  discount,
  service,
  tax,
  total,
}) {
  const { isPosPaymentDialog, setPosPaymentDialog, paymentTab, setPaymentTab } =
    usePosContext();

  const [amountPaid, setAmountPaid] = useState();

  const change = amountPaid ? amountPaid - subtotal : 0;
  console.log(subtotal, discount, tax, total, amountPaid);

  const balanceDue = amountPaid ? subtotal - amountPaid : 0;

  return (
    <Dialog open={isPosPaymentDialog} onOpenChange={setPosPaymentDialog}>
      <DialogContent
        id="payment-print"
        className="max-w-4xl gap-0 overflow-hidden border-0 p-0"
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between bg-linear-to-r from-green-500 to-green-600 px-6 py-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white">
            <CreditCard className="h-5 w-5" />
            Complete Payment
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="grid gap-4 bg-muted/20 p-4 lg:grid-cols-[1fr_320px]">
          {/* LEFT SIDE */}
          <Card className="shadow-sm">
            <CardHeader className="border-b px-5 py-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <CreditCard className="h-4 w-4" />
                Payment Method
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5 p-2">
              {/* Tabs */}
              <Tabs
                defaultValue="cash"
                className="w-full"
                value={paymentTab}
                onValueChange={setPaymentTab}
              >
                <TabsList className="w-full">
                  <TabsTrigger
                    value="cash"
                    className="p-4 font-semibold data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                  >
                    <span>PKR</span>
                    Cash
                  </TabsTrigger>

                  <TabsTrigger
                    value="online"
                    className="p-4 font-semibold data-[state=active]:bg-sky-500 data-[state=active]:text-white"
                  >
                    <Smartphone className="h-4 w-4" />
                    Online
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Amount */}
              <FieldGroup>
                {paymentTab === "online" ? (
                  <>
                    <FieldLabel className="font-semibold">
                      Pyayment Refference
                    </FieldLabel>

                    <InputGroup className="flex overflow-hidden rounded-md border bg-background">
                      <InputGroupInput
                        type="text"
                        placeholder="JazzCash or EasyPaisa"
                        className="border-0 shadow-none focus-visible:ring-0"
                      />

                      <InputGroupAddon className="flex items-center border-r bg-muted px-4 text-green-600">
                        <ReceiptText className="h-4 w-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </>
                ) : (
                  <>
                    <FieldLabel className="font-semibold">
                      Amount Received
                    </FieldLabel>

                    <InputGroup className="flex overflow-hidden rounded-md border bg-background">
                      <InputGroupInput
                        type="number"
                        defaultValue={subtotal}
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(Number(e.target.value))}
                        placeholder="2431.55"
                        className="border-0 shadow-none focus-visible:ring-0"
                      />

                      <InputGroupAddon className="flex items-center border-r bg-muted px-4 text-green-600">
                        <span>PKR</span>
                      </InputGroupAddon>
                    </InputGroup>
                  </>
                )}
              </FieldGroup>

              {/* Notes */}
              <div className="space-y-2">
                <Label className="font-semibold">Payment Note</Label>

                <Textarea
                  placeholder="Optional notes..."
                  className="min-h-27.5 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* RIGHT SIDE */}
          <Card className="shadow-sm">
            <CardHeader className="border-b px-5 py-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <ReceiptText className="h-4 w-4" />
                Order Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5 p-5">
              {/* Summary */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>

                  <span className="font-semibold">{subtotal}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Discount:</span>

                  <span className="font-semibold text-red-500">{discount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Service Charge:</span>

                  <span className="font-semibold">{service}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax:</span>

                  <span className="font-semibold">{tax}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold">Total Payable:</span>

                    <span className="text-xl font-bold text-green-600">
                      {total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Summary Box */}
              <div className="space-y-3 rounded-lg bg-muted/50 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Amount Paid:</span>

                  <span className="font-bold">
                    {amountPaid ? amountPaid : 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Balance Due:</span>

                  <span className="font-bold text-red-500">{balanceDue}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Change:</span>

                  <span className="font-bold text-green-600">{change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="mb-2 px-8">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            className="bg-cyan-500 hover:bg-cyan-600"
            onClick={() => {
              PosPaymentPrint(dummyData);
            }}
          >
            <CreditCard className="h-4 w-4" />
            Complete Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
