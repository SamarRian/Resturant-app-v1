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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function PosCustomDialoge({
  open,
  onOpenChange,
  setItems,
  items,
  onProductClicks,
}) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [_id, setId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const dataObject = {
      name: productName,
      price: Number(price),
      cost: Number(cost),
      isCustom: true,
      description: "Custom Product",
      _id: `custom_${Date.now()}`,
    };

    onProductClicks(dataObject);

    setProductName("");
    setPrice(0);
    setCost(0);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          {" "}
          {/* ✅ sirf yahan */}
          <DialogHeader>
            <DialogTitle>Enter Product Details</DialogTitle>
            <DialogDescription>
              Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field className="mt-2">
              <Label htmlFor="name-1">Product Name</Label>
              <Input
                id="name-1"
                placeholder="Gold Leaf"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="cost-1">Cost</Label>
              <Input
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                type="number"
                id="cost-1"
                placeholder="1"
              />
            </Field>
            <Field>
              <Label htmlFor="price-1">Price</Label>
              <Input
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                id="price-1"
                placeholder="RS 20"
                className="mb-2"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button> {/* ✅ onClick hataya */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
