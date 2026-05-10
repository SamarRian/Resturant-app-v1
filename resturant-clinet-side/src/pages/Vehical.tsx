import { DataTable } from "@/components/features/ProductTable/DataTable";
import { VehicalColumns } from "@/components/features/VehicalTable/VehicalColumns";
import { TypographyH2 } from "@/components/Typography/Typography";
import { Button } from "@/components/ui/button";
import SingleInputDialoge from "@/components/ui/SingleInputDialoge";
import { FullPageSpinner } from "@/components/ui/spinner";
import { useGetAllVehicals } from "@/hooks/QueryHooks/Vehical/useGetAllVehicals";
import { useFormContext } from "@/hooks/useFormContext";

function Vehical() {
  const { toggleSingleDialog, handleVehicalId } = useFormContext();

  const { data, isVehicalLoading } = useGetAllVehicals();

  const columns = VehicalColumns();

  if (isVehicalLoading) return <FullPageSpinner />;

  return (
    <div className="container mx-auto px-4 sm:py-2 md:py-6 lg:py-10">
      <div className="flex items-center justify-between">
        <TypographyH2>Vehical Management</TypographyH2>
        <Button
          onClick={() => {
            toggleSingleDialog();
            handleVehicalId("");
          }}
        >
          Add New Vehical
        </Button>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <DataTable
          columns={columns}
          data={data ? data : []}
          key={"vehical-table"}
          searchColumn="vehicalNumber"
          searchPlaceholder="Search by Vehical Number"
        />
        <SingleInputDialoge
          key={"single-input-vehical"}
          title={"Vehical"}
          submitionKey={"vehical-single-dialog"}
        />
      </div>
    </div>
  );
}

export default Vehical;
