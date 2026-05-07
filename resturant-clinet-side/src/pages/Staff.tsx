import { DataTable } from "@/components/features/ProductTable/DataTable";
import { StaffColumns } from "@/components/features/StaffTable/StaffColumns";
import { TypographyH2 } from "@/components/Typography/Typography";
import { Button } from "@/components/ui/button";
import SingleInputDialoge from "@/components/ui/SingleInputDialoge";
import { FullPageSpinner } from "@/components/ui/spinner";
import { useGetAllStaff } from "@/hooks/QueryHooks/Staff/useGetallStaff";
import { useFormContext } from "@/hooks/useFormContext";

function Staff() {
  const { toggleSingleDialog, handleStaffID } = useFormContext();

  const columns = StaffColumns();

  const { isLoading, staffData } = useGetAllStaff();

  const staff = staffData?.staffData;

  console.log("STAFF TABLE DATA", staffData);
  if (isLoading) return <FullPageSpinner />;
  return (
    <div className="container mx-auto px-4 sm:py-2 md:py-6 lg:py-10">
      <div className="flex items-center justify-between">
        <TypographyH2>Staff Management</TypographyH2>
        <Button
          onClick={() => {
            toggleSingleDialog();
            handleStaffID("");
          }}
        >
          Add New Staff
        </Button>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <DataTable
          columns={columns}
          data={staff}
          key={"staff-table"}
          searchColumn="personName"
          searchPlaceholder="Search by Staff Name"
        />
        <SingleInputDialoge
          key={"single-input-staff"}
          title="Staff"
          submitionKey={"staff-single-dialog"}
        />
      </div>
    </div>
  );
}

export default Staff;
