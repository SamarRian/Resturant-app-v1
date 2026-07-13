import { TypographyH2, TypographyH3 } from "@/components/Typography/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePosContext } from "@/hooks/usePosContext";
import {
  Banknote,
  Calculator,
  Clock10,
  CreditCard,
  LayoutGrid,
  ListCheck,
  Notebook,
  Percent,
  PieChart,
  PlusCircle,
  Printer,
  Receipt,
  Scale,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect } from "react";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    percentage: 100,
  },
];
const cards = [
  {
    icon: <Banknote className="h-5 w-5 text-blue-500" />,
    amount: "PKR 23,372.05",
    label: "Total Sales",
    sub: "6 orders",
  },
  {
    icon: <Receipt className="h-5 w-5 text-green-500" />,
    amount: "PKR 23,372.05",
    label: "Cash Sales",
    sub: "6 orders",
  },
  {
    icon: <CreditCard className="h-5 w-5 text-muted-foreground" />,
    amount: "PKR 0.00",
    label: "Online Sales",
    sub: "0 orders",
  },
  {
    icon: <Scale className="h-5 w-5 text-green-500" />,
    amount: "+PKR 627.95",
    label: "Cash Difference",
    badge: "Overage",
    green: true,
  },
];
function PosSessionReportDialog() {
  const {
    PosReportSessionDialog,
    setPosReportSessionDialog,
    setStartPosSessionDialog,
  } = usePosContext();

  useEffect(() => {
    if (!PosReportSessionDialog) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    const handlePopState = (e) => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [PosReportSessionDialog]);

  const handlePosSessionReportPrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");

    printWindow?.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Report</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: sans-serif; padding: 24px; font-size: 14px; }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        ${document.getElementById("report-content")?.innerHTML}
      </body>
    </html>
  `);

    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
  };
  return (
    <Dialog
      open={PosReportSessionDialog}
      onOpenChange={(open) => {
        if (!open) {
          localStorage.removeItem("sessionId");
          setStartPosSessionDialog(true);
        }
        setPosReportSessionDialog(open);
      }}
    >
      <DialogContent
        id="report-content"
        className="max-h-[90vh] overflow-y-scroll p-0"
      >
        <DialogHeader className="bg-linear-to-r from-cyan-500 to-cyan-600 px-6 py-4 text-white">
          <DialogTitle className="flex items-center gap-1 text-lg">
            <ListCheck className="h-4 w-6" /> Session Summary Report
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-hidden px-6">
          <div className="bg-cyan-800 py-4 text-center text-white">
            <TypographyH2 className={"mb-1.5! p-0!"}>
              Session Report #8
            </TypographyH2>
            <TypographyH3 className={"mb-1.5! p-0! font-medium"}>
              Start date to end Date
            </TypographyH3>
            <TypographyH3 className={"m-0! p-0! font-medium"}>
              <div className="flex items-center justify-center gap-1">
                <Clock10 className="h-4 w-4" /> Duration "Total Hours an mins" |
                <User className="h-6 w-6" /> Cashier: Admin
              </div>
            </TypographyH3>
          </div>

          <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:py-10 lg:grid-cols-4">
            {cards.map((card, i) => (
              <Card
                key={i}
                className="border-2 border-transparent bg-accent/20 transition-all hover:border-accent"
              >
                <CardContent className="flex flex-col gap-2 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                    {card.icon}
                  </div>
                  <p
                    className={`text-xl font-semibold ${card.green ? "text-green-500" : "text-foreground"}`}
                  >
                    {card.amount}
                  </p>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  {card.sub && (
                    <span className="text-xs text-muted-foreground">
                      {card.sub}
                    </span>
                  )}
                  {card.badge && (
                    <Badge
                      variant="outline"
                      className="w-fit border-green-200 text-green-500"
                    >
                      {card.badge}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
            {/* ── Left Panel: Cash Reconciliation ── */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                      Cash Reconciliation
                    </CardTitle>
                  </div>
                  <Badge className="bg-blue-500 text-xs text-white">
                    Expected vs Actual
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Starting Balance */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold">Starting Balance</p>
                    <p className="text-xs text-muted-foreground">
                      Cash in drawer at session start
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-blue-500">
                    PKR 1000.00
                  </span>
                </div>

                <Separator />

                {/* Cash Sales */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <PlusCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Cash Sales</p>
                      <p className="text-xs text-muted-foreground">
                        6 cash orders
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-500">
                    +PKR 23372.05
                  </span>
                </div>

                {/* Online Sales */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <PlusCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Online Sales</p>
                      <p className="text-xs text-muted-foreground">
                        0 online orders
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-500">
                    +PKR 0.00
                  </span>
                </div>

                <Separator />

                {/* Expected Cash */}
                <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">Expected Cash</p>
                      <p className="text-xs text-muted-foreground">
                        Starting + Cash Sales - Refunds
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-blue-500">
                    PKR 24372.05
                  </span>
                </div>

                {/* Actual Cash Count */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex shrink-0 items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-semibold">Actual Cash Count</p>
                    </div>
                    <Input
                      defaultValue="25000.00"
                      className="h-8 w-32 text-right text-sm"
                    />
                  </div>
                  <p className="pl-6 text-xs text-muted-foreground">
                    Physical cash counted at session end
                  </p>
                </div>

                {/* Cash Difference */}
                <div className="flex items-start justify-between rounded-lg border border-green-200 bg-green-50 p-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-green-800">
                        Cash Difference
                      </p>
                      <p className="text-xs text-green-600">
                        Overage: Extra cash found in drawer
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-green-600">
                    +PKR 627.95
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* ── Right Panel: Payment Analysis ── */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                      Payment Analysis
                    </CardTitle>
                  </div>
                  <Badge className="bg-green-500 text-xs text-white hover:bg-green-500">
                    6 Orders
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Payment Method Distribution */}
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">
                    Payment Method Distribution
                  </p>
                  <div className="w-full rounded-md bg-green-500 py-2 text-center text-xs font-bold tracking-wide text-white">
                    CASH 100%
                  </div>
                </div>

                {/* Cash / Online breakdown */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 rounded-lg border p-3">
                    <p className="text-xs font-bold text-foreground">CASH</p>
                    <p className="text-sm font-semibold">PKR 23372.05</p>
                    <p className="text-xs text-muted-foreground">6 orders</p>
                  </div>
                  <div className="space-y-1 rounded-lg border p-3">
                    <p className="text-xs font-bold text-foreground">ONLINE</p>
                    <p className="text-sm font-semibold">PKR 0.00</p>
                    <p className="text-xs text-muted-foreground">0 orders</p>
                  </div>
                </div>

                <Separator />

                {/* Performance Metrics */}
                <p className="text-xs text-muted-foreground">
                  Performance Metrics
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 rounded-lg border p-3">
                    <p className="text-sm font-semibold">PKR 3895.34</p>
                    <p className="text-xs text-muted-foreground">
                      Average Sale
                    </p>
                  </div>

                  <div className="space-y-1 rounded-lg border p-3">
                    <p className="text-sm font-semibold">6</p>
                    <p className="text-xs text-muted-foreground">
                      Total Orders
                    </p>
                  </div>

                  <div className="space-y-1 rounded-lg border p-3">
                    <p className="text-sm font-semibold">PKR 23372.05</p>
                    <p className="text-xs text-muted-foreground">
                      Total Revenue
                    </p>
                  </div>

                  <div className="flex flex-col items-start space-y-1 rounded-lg border p-3">
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                    <p className="text-xs text-muted-foreground">
                      Cash Accuracy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="p-4">
            <Card>
              <CardHeader className="border-b pb-2">
                <div className="flex items-center gap-2">
                  <Notebook className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base font-semibold">
                    Session Notes
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <h4>Session clossing notes</h4>
              </CardContent>
            </Card>
          </div>
          <div className="p-4">
            <Card>
              <CardHeader className="border-b pb-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base font-semibold">
                    Orders By Cashier
                  </CardTitle>
                  <CardAction>
                    <Badge className="bg-blue-500">1 Cashier</Badge>
                  </CardAction>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-t-2">
                      <TableHead>Cashier</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Average Order</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">
                          {invoice.invoice}
                        </TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell>{invoice.totalAmount}</TableCell>
                        <TableCell>
                          <Badge>
                            {invoice.percentage.toFixed(1)} <Percent />
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  {/* <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                  </TableFooter> */}
                </Table>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center p-4">
              <Button
                className="p-5 text-lg"
                onClick={handlePosSessionReportPrint}
              >
                <Printer className="h-4 w-4" /> Print Thermal Recipt
              </Button>
            </div>
          </div>
          <DialogFooter className="pb-8">
            <DialogClose asChild>
              <Button
                size={"lg"}
                variant={"outline"}
                onClick={() => {
                  localStorage.removeItem("sessionId");
                  localStorage.removeItem("emptyOrderID");
                  localStorage.removeItem("viewdOrderID");

                  setStartPosSessionDialog(true);
                }}
              >
                <X /> Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PosSessionReportDialog;
