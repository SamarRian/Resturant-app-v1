import { columns } from "@/components/features/ProductTable/ProductColumns";
import { DataTable } from "@/components/features/ProductTable/DataTable";
import { TypographyH2 } from "@/components/Typography/Typography";
import { Button } from "@/components/ui/button";
import { FullPageSpinner } from "@/components/ui/spinner";

import { useGetAllProducts } from "@/hooks/QueryHooks/Product/useGetAllProducts";
import { useNavigate } from "react-router-dom";

function AllProduct() {
  const navigate = useNavigate();
  const { isProductsLoading, productsData } = useGetAllProducts();

  if (isProductsLoading) return <FullPageSpinner />;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <TypographyH2>All Products</TypographyH2>
        <Button onClick={() => navigate("/products/add")}>
          Create New Product
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={productsData}
        key={"product-table"}
        searchColumn="name"
        searchPlaceholder="Search by Name"
      />
    </div>
  );
}

export default AllProduct;
