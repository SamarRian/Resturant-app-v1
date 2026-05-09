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
import { usePosContext } from "@/hooks/usePosContext";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useState } from "react";

function PosProductDialog({ onProductClicks }) {
  const {
    PosProductDialog,
    setPosProductDialog,
    currentDealProduct,
    togglePosProductDialog,
  } = usePosContext();

  const [selectedProductVariaton, setSelectedProductVariaton] = useState({});

  //   CLEANING PRODUCT DATA
  const { variations, price, quantity, cost, ...cleanProduct } =
    currentDealProduct ?? {};

  const submitionData = {
    ...cleanProduct,
    variant: true,
    selectedProductVariaton,
  };

  function handleSubmit() {
    if (!submitionData) return;
    console.log("SUBMITIN DATA ", submitionData);

    onProductClicks(submitionData);
    togglePosProductDialog();
  }
  return (
    <Dialog open={PosProductDialog} onOpenChange={setPosProductDialog}>
      <form>
        <DialogContent className="sm:max-w-lg">
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
          <div>
            <span className="font-semibold">Included Variations</span>

            <div className="mt-2 flex flex-wrap gap-2">
              {currentDealProduct?.variations &&
              currentDealProduct.variations.length > 0 ? (
                currentDealProduct.variations.map((el, i) => (
                  <div
                    onClick={() => setSelectedProductVariaton(el)}
                    key={i}
                    className={cn(
                      "flex grow-0 basis-[30%] cursor-pointer items-center justify-between rounded-lg border-2 bg-card p-2 shadow-sm transition-all",
                      selectedProductVariaton?._id === el._id &&
                        "border-2 border-green-500"
                    )}
                  >
                    {/* Left Side */}
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-semibold">{el.name}</h3>

                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-muted-foreground">
                          Variant:
                        </span>
                        <Badge
                          variant="secondary"
                          className="px-1 py-0 text-[13px]"
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
                        <Badge className="bg-green-500 px-1 py-0 text-[13px] text-white hover:bg-green-600">
                          Rs {el.price}
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
          <div>
            <Field>
              <FieldLabel
                htmlFor="instructions"
                className="flex items-center gap-1"
              >
                <Pencil className="h-3 w-3" />
                Special Instructions
              </FieldLabel>
              <Input
                id="instructions"
                className="w-full p-1"
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
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default PosProductDialog;
