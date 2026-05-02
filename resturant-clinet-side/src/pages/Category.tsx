import { CategoryColumns } from "@/components/features/CategoryTable/CategoryTable";
import { DataTable } from "@/components/features/ProductTable/DataTable";
import { TypographyH2 } from "@/components/Typography/Typography";
import { Button } from "@/components/ui/button";
import SingleInputDialoge from "@/components/ui/SingleInputDialoge";
import { useState } from "react";

export const tableStaticData = [
  { categoryName: "Electronics Deals" },
  { categoryName: "Winter Collection" },
  { categoryName: "Summer Sale" },
  { categoryName: "Mobile Accessories" },
  { categoryName: "Fashion Discounts" },
  { categoryName: "Laptop Offers" },
  { categoryName: "Gaming Zone" },
  { categoryName: "Home Appliances" },
  { categoryName: "Kitchen Essentials" },
  { categoryName: "Fitness Gear" },
  { categoryName: "Beauty Products" },
  { categoryName: "Kids Collection" },
  { categoryName: "Office Supplies" },
  { categoryName: "Shoes Sale" },
  { categoryName: "Travel Accessories" },
];

function Category() {
  const [isCategoryDialog, setCategoryDialog] = useState(false);
  function toggleCategoryDialog() {
    setCategoryDialog((prev) => !prev);
  }
  const columns = CategoryColumns();
  return (
    <div className="container mx-auto px-4 sm:py-2 md:py-6 lg:py-10">
      <div className="flex items-center justify-between">
        <TypographyH2>Category Management</TypographyH2>
        <Button onClick={toggleCategoryDialog}>Add New Category</Button>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <DataTable
          columns={columns}
          data={tableStaticData}
          key={"category-table"}
          searchColumn="categoryName"
          searchPlaceholder="Search by Category Name"
        />
        <SingleInputDialoge
          title="Category"
          open={isCategoryDialog}
          onOpenChange={setCategoryDialog}
        />
      </div>
    </div>
  );
}

export default Category;
