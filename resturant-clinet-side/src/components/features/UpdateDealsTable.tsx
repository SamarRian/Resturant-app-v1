import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const dealsData = [
  {
    product: "Wireless Headphones",
    variation: "Black / Bluetooth 5.0",
    price: 99.99,
    quantity: 2,
    total: 199.98,
  },
  {
    product: "Smart Watch",
    variation: "Silver / 44mm",
    price: 249.99,
    quantity: 1,
    total: 249.99,
  },
  {
    product: "Gaming Keyboard",
    variation: "RGB / Mechanical",
    price: 149.99,
    quantity: 3,
    total: 449.97,
  },
  {
    product: "Wireless Mouse",
    variation: "White / Silent Click",
    price: 39.99,
    quantity: 4,
    total: 159.96,
  },
  {
    product: "USB-C Hub",
    variation: "7-in-1 / 4K",
    price: 79.99,
    quantity: 2,
    total: 159.98,
  },
  {
    product: "Laptop Stand",
    variation: "Aluminum / Adjustable",
    price: 49.99,
    quantity: 1,
    total: 49.99,
  },
  {
    product: "Noise Cancellation Earbuds",
    variation: "White / ANC",
    price: 129.99,
    quantity: 2,
    total: 259.98,
  },
  {
    product: "Phone Charger",
    variation: "20W / USB-C",
    price: 19.99,
    quantity: 5,
    total: 99.95,
  },
  {
    product: "Monitor 24 Inch",
    variation: "1080p / 75Hz",
    price: 179.99,
    quantity: 1,
    total: 179.99,
  },
  {
    product: "Desk Lamp",
    variation: "LED / Touch Control",
    price: 34.99,
    quantity: 2,
    total: 69.98,
  },
  {
    product: "External SSD",
    variation: "1TB / USB 3.2",
    price: 119.99,
    quantity: 1,
    total: 119.99,
  },
];

export default function UpdateDealsTable() {
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
          {dealsData.map((deal, index) => (
            <TableRow key={index}>
              <TableCell>{deal.product}</TableCell>
              <TableCell>{deal.variation}</TableCell>
              <TableCell>{deal.price}</TableCell>
              <TableCell>{deal.quantity}</TableCell>
              <TableCell>{deal.total}</TableCell>
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
                    <DropdownMenuItem>Copy Deal ID</DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-red-600">
                      Delete Deal
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-accent/50">
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-left">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
