import { DataTable } from "@/components/features/ProductTable/DataTable";
import { Button } from "@/components/ui/button";
import { useDealsColumns } from "@/components/features/DealsTable/DealsColumns";
import { TypographyH2 } from "@/components/Typography/Typography";
import AddDeal from "@/components/features/Deals/DealModel";
import UpdateDeal from "@/components/features/Deals/UpdateDeal";
import { useGetDeals } from "@/hooks/QueryHooks/Deals/useGetDeals";
import { FullPageSpinner } from "@/components/ui/spinner";
import { useFormContext } from "@/hooks/useFormContext";

function AllDeals() {
  const {
    isUpdateDealOpen,
    setUpdateDealOpen,
    toggleUpdateDialoge,
    handleDealID,
  } = useFormContext();

  function handleClick() {
    handleDealID("");
    toggleUpdateDialoge();
  }
  const columns = useDealsColumns();
  const { dealsData, isDealLoading } = useGetDeals();

  if (isDealLoading) return <FullPageSpinner />;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <TypographyH2>Deals Management</TypographyH2>
        <Button onClick={handleClick}>Create New Deal</Button>
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={dealsData}
          searchColumn="dealName"
          searchPlaceholder="Search by Deal Name"
          key={"deals-table"}
        />
      </div>
      <AddDeal open={isUpdateDealOpen} onOpenchange={setUpdateDealOpen} />
      <UpdateDeal />
    </div>
  );
}

export default AllDeals;
