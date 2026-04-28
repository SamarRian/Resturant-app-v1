import { DataTable } from "@/components/features/ProductTable/DataTable";
import { Button } from "@/components/ui/button";
import { useDealsColumns } from "@/components/features/DealsTable/DealsColumns";
import { TypographyH2 } from "@/components/Typography/Typography";
import { useState } from "react";
import AddDeal from "@/components/features/DealModel";
import UpdateDeal from "@/components/features/UpdateDeal";
import { useGetDeals } from "@/hooks/QueryHooks/Deals/useGetDeals";
import { FullPageSpinner } from "@/components/ui/spinner";

function AllDeals() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const columns = useDealsColumns();
  const { dealsData, isDealLoading } = useGetDeals();

  if (isDealLoading) return <FullPageSpinner />;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <TypographyH2>Deals Management</TypographyH2>
        <Button onClick={() => setIsDialogOpen((prev) => !prev)}>
          Create New Deal
        </Button>
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
      <AddDeal open={isDialogOpen} onOpenchange={setIsDialogOpen} />
      <UpdateDeal />
    </div>
  );
}

export default AllDeals;
