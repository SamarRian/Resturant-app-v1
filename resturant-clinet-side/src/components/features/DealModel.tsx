import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { WandSparkles } from "lucide-react";
import { TypographyH2 } from "../Typography/Typography";
import FileUploaderComp from "./FileUpload";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AddDeal({ open, onOpenchange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenchange}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle asChild>
              <TypographyH2 className={"m-0 p-0"}>
                Create your Deal
              </TypographyH2>
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="grid lg:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="deal-name">Deal Name</FieldLabel>
              <Input
                id="deal-name"
                name="dealName"
                placeholder="Customer Deal"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="deal-title">Deal Title</FieldLabel>
              <Input id="deal-title" name="title" placeholder="Special" />
            </Field>
            <Field>
              <FieldLabel htmlFor="deal-cost">Deal Cost (PKR)</FieldLabel>
              <Input
                id="deal-cost"
                name="dealCost"
                type="number"
                placeholder="Enter Deal Cost "
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="deal-price">Deal Price (PKR)</FieldLabel>
              <Input
                id="deal-price"
                name="dealPrice"
                type="number"
                placeholder="Enter Deal Price"
              />
            </Field>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="regular-price">
                  Regular Price (PKR)
                </FieldLabel>
                <span className="flex items-center gap-1">
                  <WandSparkles className="size-4" /> Auto Calculated
                </span>
              </div>
              <Input disabled id="regular-price" name="regularPrice" />
            </Field>
          </FieldGroup>
          <FieldGroup className="flex items-center gap-2">
            <Field>
              <FieldLabel>Deal Image</FieldLabel>
              <FileUploaderComp fileHeading={false} />
            </Field>
          </FieldGroup>
          <FieldGroup className="flex-row">
            <Field>
              <FieldLabel>Display in POS</FieldLabel>
              <Select defaultValue="yes">
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Yes or No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Display in POS</SelectLabel>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pause">Pause</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit Deal</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
