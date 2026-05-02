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
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TypographyH3 } from "../Typography/Typography";
import { Cross, PlusIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import UpdateDealsTable from "./UpdateDealsTable";
import { useFormContext } from "@/hooks/useFormContext";
import { useGetAllProducts } from "@/hooks/QueryHooks/Product/useGetAllProducts";
import { FullPageSpinner } from "../ui/spinner";
import { useGetSingleProduct } from "@/hooks/QueryHooks/Product/useSingleProduct";
import { useState } from "react";
import { useUpdateDealVariant } from "@/hooks/QueryHooks/Deals/useUpdateDealVariant";
import { toast } from "sonner";

export default function UpdateDeal() {
  const [id, setId] = useState("");
  // Selected product
  const [selectedProduct, setSelectedProduct] = useState({});
  // Selected variations of product
  const [selectedVariation, setSelectedVariation] = useState({});
  // Product quantity
  const [resetKey, setResetKey] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { isDialogeOpen, setOpenDialoge, handleUpdateDeal, dealId } =
    useFormContext();
  const { isProductsLoading, productsData } = useGetAllProducts();
  const { singleProduct, isLoading } = useGetSingleProduct(id);

  const { UpdateDealFN } = useUpdateDealVariant();

  const handleProductSelect = (productId, product) => {
    setId(productId);
    setSelectedProduct(product);
  };

  const handleVarient = (varient) => {
    setSelectedVariation(varient);
  };

  function handleAddItem(e) {
    e.preventDefault();

    if (!quantity || Number(quantity) <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    const { quantity: vQty, ...cleanVariant } = selectedVariation;

    const {
      quantity: pQty,
      variations: pVar,
      productType: pTyp,
      description: pDes,
      productCode: pCde,
      image: pImg,
      category: pCtg,
      enableVariation: pEnb,
      ...cleanProduct
    } = selectedProduct;
    const combinedItem = {
      ...cleanProduct,
      variant: { ...cleanVariant },
    };

    UpdateDealFN(
      {
        id: dealId,
        variant: cleanVariant?.variantName
          ? {
              ...cleanVariant,
              dealQuantity: Number(quantity),
              name: cleanProduct.name,
            }
          : { ...cleanProduct, dealQuantity: Number(quantity) },
      },
      {
        onSuccess: () => {
          setSelectedProduct({});
          setSelectedVariation({});
          setQuantity(0);
          setResetKey((prev) => prev + 1);
        },
      }
    );
  }
  if (isProductsLoading) return <FullPageSpinner />;

  return (
    <Dialog open={isDialogeOpen} onOpenChange={setOpenDialoge}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Deal</DialogTitle>
          <DialogDescription>
            Update deal details below. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddItem}>
          <FieldGroup>
            <FieldSet>
              <div className="grid grid-cols-1 gap-4 rounded-md border px-2 py-4 md:grid-cols-3">
                <Field>
                  <FieldLabel htmlFor="product">Select Product</FieldLabel>
                  <Select
                    required
                    key={`product-${resetKey}`} // ✅
                    onValueChange={(value) => {
                      const selected = productsData?.find(
                        (product) => product.name.toLowerCase() === value
                      );
                      if (selected) handleProductSelect(selected._id, selected);
                    }}
                  >
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Select Your Product" />
                    </SelectTrigger>
                    <SelectContent className="max-h-50" position="popper">
                      <SelectGroup>
                        <SelectLabel>Product List</SelectLabel>
                        {productsData?.map((product) => (
                          <SelectItem
                            key={product._id}
                            value={product.name.toLowerCase()}
                          >
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                    Select Variation
                  </FieldLabel>
                  {isLoading ? (
                    <div>Loading variations...</div>
                  ) : singleProduct?.hasVariations ? (
                    <Select
                      required
                      key={`variation-${resetKey}`} // ✅
                      onValueChange={(value) => {
                        const selectedVariant = singleProduct?.variations?.find(
                          (v) => v.variantName.toLowerCase() === value
                        );
                        handleVarient(selectedVariant ?? {});
                      }}
                    >
                      <SelectTrigger id="checkout-7j9-exp-year-f59">
                        <SelectValue placeholder="Select your variation" />
                      </SelectTrigger>
                      <SelectContent className="max-h-50!" position="popper">
                        <SelectGroup>
                          <SelectLabel>Variations List</SelectLabel>
                          {singleProduct?.variations?.map(
                            (variation, index) => (
                              <SelectItem
                                key={index}
                                value={variation.variantName.toLowerCase()}
                              >
                                {variation.variantName}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    "No variations available"
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    required
                  />
                </Field>
              </div>
            </FieldSet>
          </FieldGroup>
          <div className="mt-1 flex justify-end sm:mt-2 md:mt-4">
            <Button type="submit">
              <PlusIcon /> Add Item
            </Button>
          </div>
        </form>
        <div className="mt-1 rounded-2xl border px-1 py-2 sm:mt-2 md:mt-4 md:px-2 md:py-4">
          <TypographyH3 className={"m-0 py-0 text-lg font-light"}>
            Current Deals Data
          </TypographyH3>
          <Separator />
          <UpdateDealsTable dealId={dealId} />
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">X Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
