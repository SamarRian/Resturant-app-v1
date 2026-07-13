import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllActiveSessionOrders } from "@/hooks/QueryHooks/PosSession/PosOrder/useGetAllActiveSessionOrders";
import { usePosOrderContext } from "@/hooks/usePosOrderContext";
import { Eye, MoreHorizontal, Trash } from "lucide-react";

export default function PosRunningOrdersTable({ tab }) {
  const { handleViewedOrderId } = usePosOrderContext();

  const { allOrdersData, isAllOrdersDataLoading } =
    useGetAllActiveSessionOrders();
  if (isAllOrdersDataLoading)
    return (
      <div className="flex justify-center">
        <Spinner className="h-6 w-6" />
      </div>
    );
  const filteredData = allOrdersData.filter((order) => order.orderType === tab);

  return (
    <div className="max-h-60 overflow-y-auto rounded-md border">
      <Table>
        <TableCaption>A list of your running orders.</TableCaption>

        <TableHeader className="sticky top-0 z-10 bg-background">
          <TableRow>
            <TableHead className="w-25">Order #</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Order Status</TableHead>
            <TableHead className="text-right">Payment Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredData?.map((order, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                #TA-{order.orderNumber}
              </TableCell>

              <TableCell>
                <Badge className="bg-accent">{order?.items.length} item</Badge>
              </TableCell>

              <TableCell>{order.totalAmount}</TableCell>
              <TableCell className="text-right">{order.orderStatus}</TableCell>

              <TableCell className="text-right">
                {order.paymentStatus}
              </TableCell>
              <TableCell className="text-right">
                {" "}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => handleViewedOrderId(order._id)}
                    >
                      <Eye /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
