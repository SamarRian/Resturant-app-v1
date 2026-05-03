import { DataTable } from "@/components/features/ProductTable/DataTable";
import { TableColumns } from "@/components/features/TablesTable/TableColumns";
import { TypographyH2 } from "@/components/Typography/Typography";
import { Button } from "@/components/ui/button";
import SingleInputDialoge from "@/components/ui/SingleInputDialoge";
import { FullPageSpinner } from "@/components/ui/spinner";
import { useGetAllTables } from "@/hooks/QueryHooks/Tables/useGetAllTables";
import { useFormContext } from "@/hooks/useFormContext";

function Table() {
  const { toggleSingleDialog, handleTableID } = useFormContext();
  const { isLoading, data } = useGetAllTables();

  const tablesData = data?.tablesData;

  const columns = TableColumns();
  if (isLoading) return <FullPageSpinner />;
  return (
    <div className="container mx-auto px-4 sm:py-2 md:py-6 lg:py-10">
      <div className="flex items-center justify-between">
        <TypographyH2>Table Management</TypographyH2>
        <Button
          onClick={() => {
            handleTableID("");
            toggleSingleDialog();
          }}
        >
          Add New Table
        </Button>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <DataTable
          columns={columns}
          data={tablesData ? tablesData : []}
          key={"table-table"}
          searchColumn="tableName"
          searchPlaceholder="Search by Table Name"
        />
        <SingleInputDialoge
          key={"single-input-table"}
          title={"Table"}
          submitionKey={"table-single-dialog"}
        />
      </div>
    </div>
  );
}

export default Table;
