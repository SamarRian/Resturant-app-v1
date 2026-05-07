import { CategoryColumns } from "@/components/features/CategoryTable/CategoryTable";
import { DataTable } from "@/components/features/ProductTable/DataTable";
import { TypographyH2 } from "@/components/Typography/Typography";
import { Button } from "@/components/ui/button";
import SingleInputDialoge from "@/components/ui/SingleInputDialoge";
import { FullPageSpinner } from "@/components/ui/spinner";
import { useGetAllCategory } from "@/hooks/QueryHooks/Category/useGetAllCategory";
import { useFormContext } from "@/hooks/useFormContext";

function Category() {
  const { toggleSingleDialog, handleCategoryId } = useFormContext();
  const { Category, isCategoryLoading } = useGetAllCategory();
  console.log("CATEGORY TABLE LOGS", Category);

  const categoryData = Category?.categoryData;

  const columns = CategoryColumns();

  if (isCategoryLoading) return <FullPageSpinner />;
  return (
    <div className="container mx-auto px-4 sm:py-2 md:py-6 lg:py-10">
      <div className="flex items-center justify-between">
        <TypographyH2>Category Management</TypographyH2>
        <Button
          onClick={() => {
            handleCategoryId("");
            toggleSingleDialog();
          }}
        >
          Add New Category
        </Button>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <DataTable
          columns={columns}
          data={categoryData}
          key={"category-table"}
          searchColumn="categoryName"
          searchPlaceholder="Search by Category Name"
        />
        <SingleInputDialoge
          submitionKey={"category-single-dialog"}
          key={"single-input-categiry"}
          title="Category"
        />
      </div>
    </div>
  );
}

export default Category;
