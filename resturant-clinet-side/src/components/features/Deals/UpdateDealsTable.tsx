import { MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useGetSingleDeal } from "@/hooks/QueryHooks/Deals/useGetSingleDeal";
import { FullPageSpinner } from "../../ui/spinner";
import { UseDeleteVariant } from "@/hooks/QueryHooks/Deals/useDeleteVariant";

export default function UpdateDealsTable({ dealId }) {
  const { data, isLoading } = useGetSingleDeal(dealId);

  const { DeleteVarinat } = UseDeleteVariant();

  const singleDeal = data?.singleDeal?.variantsIncluded;

  const total = singleDeal?.reduce((sum, curEl) => {
    return sum + curEl.price * curEl.dealQuantity;
  }, 0);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="h-36 overflow-y-auto rounded-lg border">
      <Table>
        <TableCaption>A list of your recent deal products.</TableCaption>
        <TableHeader className="sticky top-0 bg-accent/50 shadow-sm">
          <TableRow>
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold">Variation</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Quantity</TableHead>
            <TableHead className="font-semibold">Total</TableHead>
            <TableHead className="font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {singleDeal.length > 0 ? (
            singleDeal?.map((deal, index) => (
              <TableRow key={deal._id || index}>
                <TableCell>{deal.name}</TableCell>
                <TableCell>
                  {deal.variantName ? deal.variantName : "No Variants"}
                </TableCell>
                <TableCell>{deal.price}</TableCell>
                <TableCell>{deal.dealQuantity}</TableCell>
                <TableCell>{deal.price * deal.dealQuantity}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          DeleteVarinat({ dealId, variantId: deal._id })
                        }
                        className="text-red-600"
                      >
                        Delete Variant
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No Results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="bg-accent/50">
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell>{total}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
