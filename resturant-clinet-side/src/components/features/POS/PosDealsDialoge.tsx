import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { usePosContext } from "@/hooks/usePosContext";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useState } from "react";

export function PosDealsDialog({ open, onOpenChange, onProductClicks }) {
  const { currentDealProduct, togglePosDealDialog } = usePosContext();
  const [specialInstructions, setSpecialInstructions] = useState("");
  const saving = currentDealProduct?.regularPrice - currentDealProduct?.price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="p-4 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {" "}
              Check{" "}
              <span className="font-semibold uppercase italic">
                {currentDealProduct?.name}
              </span>{" "}
              Details.
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-between">
            <span className="flex flex-col items-center">
              Deal Price
              <Badge className="bg-green-500 text-white hover:bg-green-600">
                {currentDealProduct?.price}
              </Badge>
            </span>

            <span className="flex flex-col items-center">
              Regular Price
              <Badge variant="secondary">
                {currentDealProduct?.regularPrice}
              </Badge>
            </span>

            <span className="flex flex-col items-center">
              Save
              <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                {saving}
              </Badge>
            </span>

            <span className="flex flex-col items-center">
              Status
              <Badge
                className={cn(
                  "",
                  currentDealProduct?.status === "active"
                    ? "bg-green-500 text-white"
                    : currentDealProduct?.status === "expired"
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-black"
                )}
              >
                {currentDealProduct?.status}
              </Badge>
            </span>
          </div>

          <div>
            <span className="font-semibold">Included Variations</span>

            <div className="mt-2 flex flex-wrap gap-2">
              {currentDealProduct?.dealVariations &&
              currentDealProduct.dealVariations.length > 0 ? (
                currentDealProduct.dealVariations.map((el, i) => (
                  <div
                    key={i}
                    className="flex grow-0 basis-[30%] items-center justify-between rounded-lg border bg-card p-2 shadow-sm"
                  >
                    {/* Left Side */}
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-semibold">{el.name}</h3>

                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-muted-foreground">
                          Variant:
                        </span>
                        <Badge
                          variant="secondary"
                          className="px-1 py-0 text-[10px]"
                        >
                          {el.variantName}
                        </Badge>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="ml-1 flex items-center gap-1">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-muted-foreground">
                          Price
                        </span>
                        <Badge className="bg-green-500 px-1 py-0 text-[10px] text-white hover:bg-green-600">
                          Rs {el.price}
                        </Badge>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-muted-foreground">
                          Qty
                        </span>
                        <Badge className="bg-orange-500 px-1 py-0 text-[10px] text-white hover:bg-orange-600">
                          {el.dealQuantity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <span>No Variations</span>
                </div>
              )}
            </div>
          </div>
          <Separator className="m-0! p-0!" />
          <div>
            <Field>
              <FieldLabel htmlFor="instructions">
                <Pencil className="h-3 w-3" />
                Special Instructions
              </FieldLabel>
              <Input
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                id="instructions"
                className="w-2 p-1"
                autoComplete="off"
                placeholder="Add any special request or notes for this deal..."
              />
              <FieldDescription>
                This appears on invoices and emails.
              </FieldDescription>
            </Field>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => {
                onProductClicks(currentDealProduct);
                togglePosDealDialog();
              }}
            >
              Add To Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
