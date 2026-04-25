import { columns } from "@/components/features/ProductTable/Columns";
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
    <div className="container mx-auto py-10 pr-7">
      <div className="flex items-center justify-between">
        <TypographyH2>All Products</TypographyH2>
        <Button onClick={() => navigate("/products/add")}>Add Products</Button>
      </div>
      <DataTable columns={columns} data={productsData} />
    </div>
  );
}

export default AllProduct;
