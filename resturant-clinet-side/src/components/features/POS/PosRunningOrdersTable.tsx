import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV008",
    paymentStatus: "Paid",
    totalAmount: "$500.00",
    paymentMethod: "Cash",
  },
  {
    invoice: "INV009",
    paymentStatus: "Pending",
    totalAmount: "$700.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV010",
    paymentStatus: "Paid",
    totalAmount: "$900.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV008",
    paymentStatus: "Paid",
    totalAmount: "$500.00",
    paymentMethod: "Cash",
  },
  {
    invoice: "INV009",
    paymentStatus: "Pending",
    totalAmount: "$700.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV010",
    paymentStatus: "Paid",
    totalAmount: "$900.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV008",
    paymentStatus: "Paid",
    totalAmount: "$500.00",
    paymentMethod: "Cash",
  },
  {
    invoice: "INV009",
    paymentStatus: "Pending",
    totalAmount: "$700.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV010",
    paymentStatus: "Paid",
    totalAmount: "$900.00",
    paymentMethod: "PayPal",
  },
];

export default function PosRunningOrdersTable() {
  return (
    <div className="max-h-60 overflow-y-auto rounded-md border">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>

        <TableHeader className="sticky top-0 z-10 bg-background">
          <TableRow>
            <TableHead className="w-25">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.map((invoice, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>

              <TableCell>{invoice.paymentStatus}</TableCell>

              <TableCell>{invoice.paymentMethod}</TableCell>

              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
