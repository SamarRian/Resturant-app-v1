import { DynamicFields } from "@/components/features/Products/DynamicFields";
import FileUploaderComp from "@/components/features/Products/FileUpload";
import { ProductForm } from "@/components/features/Products/ProductForm";
import Settings from "../components/features/Products/Settings";
import { TypographyH2 } from "@/components/Typography/Typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useCreateProduct } from "@/hooks/QueryHooks/Product/useCreateProduct";
import { useFormContext } from "@/hooks/useFormContext";
import { List, Power } from "lucide-react";
import clsx from "clsx";

function AddProduct() {
  const { formState, enableVariations, dispatch } = useFormContext();

  const { ProductCreate, isPending } = useCreateProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", formState.name);
    formData.append("productType", formState.productType);
    formData.append("category", formState.category);
    formData.append("productCode", formState.productCode);
    formData.append("enableVariation", enableVariations);

    // ✅ enableVariations true ho to 0 — false ho to actual value
    formData.append("cost", enableVariations ? "0" : formState.cost);
    formData.append("price", enableVariations ? "0" : formState.price);
    formData.append("quantity", enableVariations ? "0" : formState.quantity);

    formData.append("description", formState.description);

    if (formState.image) {
      formData.append("image", formState.image);
    }

    formData.append("variations", JSON.stringify(formState.variations));

    ProductCreate(formData, {
      onSuccess: () => {
        dispatch({ type: "RESET" });
      },
    });
  };
  return (
    <div className="px-4">
      <SidebarHeader className="flex justify-end">
        <Power />
      </SidebarHeader>
      <Separator />
      <TypographyH2>Add Product</TypographyH2>

      <form
        onSubmit={handleSubmit}
        className="container mx-auto rounded-lg border-2 px-4 py-10"
      >
        <div className="border-b py-3">
          <Button>{<List />} Product List</Button>
        </div>
        <TypographyH2>Basic Information</TypographyH2>
        <ProductForm />

        <FileUploaderComp dispatch={dispatch} />

        <DynamicFields />
        <div
          className={clsx(
            "flex justify-end",
            enableVariations ? "mt-3" : "mt-0"
          )}
        >
          <Button type="submit" size={"lg"}>
            {isPending ? <Spinner /> : "Submit"}
          </Button>
        </div>
        {/* <Settings /> */}
      </form>
    </div>
  );
}

export default AddProduct;
