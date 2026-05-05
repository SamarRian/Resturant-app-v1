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

export function PosCustomDialoge({ open, onOpenChange, setItems }) {
  const [ProductName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState(0);
  function handleSubmit() {
    // const dataObject = {
    //   name: ProductName,
    //   price: price,
    //   qty: quantity,
    //   description,
    // };

    setItems((prev) => {
      return [
        ...prev,
        { name: ProductName, price: price, qty: quantity, description, id: 1 },
      ];
    });
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Enter Product Details</DialogTitle>
            <DialogDescription>
              Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Product Name</Label>
              <Input
                id="name-1"
                name="ProductName"
                placeholder="Gold Leaf"
                value={ProductName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="price-1">Price</Label>
              <Input
                value={price}
                type="number"
                onChange={(e) => setPrice(Number(e.target.value))}
                id="price-1"
                name="price"
                defaultValue="1"
                placeholder="RS 20"
              />
            </Field>

            <Field>
              <Label htmlFor="quantity-1">Quantity</Label>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                id="quantity-1"
                name="Quantity"
                placeholder="1"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
