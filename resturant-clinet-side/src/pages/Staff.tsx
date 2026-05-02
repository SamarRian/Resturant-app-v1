import { DataTable } from "@/components/features/ProductTable/DataTable";
import { StaffColumns } from "@/components/features/StaffTable/StaffColumns";
import { TypographyH2 } from "@/components/Typography/Typography";
import { Button } from "@/components/ui/button";
import SingleInputDialoge from "@/components/ui/SingleInputDialoge";
import { useState } from "react";

export const tableStaticData = [
  { personName: "Electronics Deals" },
  { personName: "Winter Collection" },
  { personName: "Summer Sale" },
  { personName: "Mobile Accessories" },
  { personName: "Fashion Discounts" },
  { personName: "Laptop Offers" },
  { personName: "Gaming Zone" },
  { personName: "Home Appliances" },
  { personName: "Kitchen Essentials" },
  { personName: "Fitness Gear" },
  { personName: "Beauty Products" },
  { personName: "Kids Collection" },
  { personName: "Office Supplies" },
  { personName: "Shoes Sale" },
  { personName: "samar rian" },
];

function Staff() {
  const [isStaffDialog, setStaffDialog] = useState(false);

  function toggleStaffDialog() {
    setStaffDialog((prev) => !prev);
  }

  const columns = StaffColumns();

  return (
    <div className="container mx-auto px-4 sm:py-2 md:py-6 lg:py-10">
      <div className="flex items-center justify-between">
        <TypographyH2>Staff Management</TypographyH2>
        <Button onClick={toggleStaffDialog}>Add New Staff</Button>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <DataTable
          columns={columns}
          data={tableStaticData}
          key={"staff-table"}
          searchColumn="personName"
          searchPlaceholder="Search by Staff Name"
        />
        <SingleInputDialoge
          title="Staff"
          open={isStaffDialog}
          onOpenChange={setStaffDialog}
        />
      </div>
    </div>
  );
}

export default Staff;
