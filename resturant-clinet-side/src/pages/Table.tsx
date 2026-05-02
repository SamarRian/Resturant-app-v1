import { DataTable } from "@/components/features/ProductTable/DataTable";
import { TableColumns } from "@/components/features/TablesTable/TableColumns";
import { TypographyH2 } from "@/components/Typography/Typography";
import { Button } from "@/components/ui/button";
import SingleInputDialoge from "@/components/ui/SingleInputDialoge";
import { useState } from "react";

export const tableStaticData = [
  { tableName: "Electronics Deals" },
  { tableName: "Winter Collection" },
  { tableName: "Summer Sale" },
  { tableName: "Mobile Accessories" },
  { tableName: "Fashion Discounts" },
  { tableName: "Laptop Offers" },
  { tableName: "Gaming Zone" },
  { tableName: "Home Appliances" },
  { tableName: "Kitchen Essentials" },
  { tableName: "Fitness Gear" },
  { tableName: "Beauty Products" },
  { tableName: "Kids Collection" },
  { tableName: "Office Supplies" },
  { tableName: "Shoes Sale" },
  { tableName: "Travel Accessories" },
];

function Table() {
  const [isTableDialog, setTableDialog] = useState(false);

  function toggleTableDialog() {
    setTableDialog((prev) => !prev);
  }

  const columns = TableColumns();

  return (
    <div className="container mx-auto px-4 sm:py-2 md:py-6 lg:py-10">
      <div className="flex items-center justify-between">
        <TypographyH2>Table Management</TypographyH2>
        <Button onClick={toggleTableDialog}>Add New Table</Button>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <DataTable
          columns={columns}
          data={tableStaticData}
          key={"table-table"}
          searchColumn="tableName"
          searchPlaceholder="Search by Table Name"
        />
        <SingleInputDialoge
          title={"Table"}
          open={isTableDialog}
          onOpenChange={setTableDialog}
        />
      </div>
    </div>
  );
}

export default Table;
