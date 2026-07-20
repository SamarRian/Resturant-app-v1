import { TypographyH2, TypographyH3 } from "@/components/Typography/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
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
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllPaidOrders } from "@/hooks/QueryHooks/PosSession/PosOrder/useGetAllPaidOrders";
import { useGetSingleSession } from "@/hooks/QueryHooks/PosSession/useGetSingleSession";
import { usePosContext } from "@/hooks/usePosContext";
import { SessionReportPrint } from "@/lib/helper";
import {
  Banknote,
  Calculator,
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
import { useEffect, useState } from "react";

function PosSessionReportDialog() {
  const {
    PosReportSessionDialog,
    setPosReportSessionDialog,
    setStartPosSessionDialog,
    sessinId,
  } = usePosContext();

  const [cashDifference, setCashDifference] = useState(0);

  const { data } = useGetSingleSession(sessinId);
  const posActiveSession = data?.data;
  const { paidOrders } = useGetAllPaidOrders(sessinId);

  const startingBalance = posActiveSession?.startingBalance || 0;
  const endingBalance = posActiveSession?.endingBalance ?? null;
  console.log("Report session data", posActiveSession);
  console.log("PAID ORDERS", paidOrders);

  const cashOrders = paidOrders?.filter(
    (order) => order.paymentMethod === "cash"
  );
  const onlineOrders = paidOrders?.filter(
    (order) => order.paymentMethod === "online"
  );

  const cashSales =
    cashOrders?.reduce((acc, order) => acc + (order.totalAmount || 0), 0) || 0;
  const onlineSales =
    onlineOrders?.reduce((acc, order) => acc + (order.totalAmount || 0), 0) ||
    0;

  // Expected cash = starting balance + cash sales (online payments never touch the drawer)
  const expectedCash = startingBalance + cashSales;

  const totalOrdersCount =
    (cashOrders?.length || 0) + (onlineOrders?.length || 0);
  const averageSale =
    totalOrdersCount > 0
      ? (posActiveSession?.totalSales || 0) / totalOrdersCount
      : 0;

  const cashPercentage =
    posActiveSession?.totalSales > 0
      ? (cashSales / posActiveSession.totalSales) * 100
      : 0;
  const onlinePercentage =
    posActiveSession?.totalSales > 0
      ? (onlineSales / posActiveSession.totalSales) * 100
      : 0;

  const cashAccuracy =
    expectedCash > 0
      ? Math.max(0, 100 - (Math.abs(cashDifference) / expectedCash) * 100)
      : 100;

  // CASH DIFFERENCE — endingBalance seedha session se aata hai
  console.log("EXPETEDD CASH", expectedCash);
  console.log("endingbalance", endingBalance);

  useEffect(() => {
    if (endingBalance === null || endingBalance === undefined) {
      setCashDifference(0);
      return;
    }
    setCashDifference(endingBalance - expectedCash);
  }, [endingBalance, expectedCash]);

  const cards = [
    {
      icon: <Banknote className="h-5 w-5 text-blue-500" />,
      amount: `PKR ${(posActiveSession?.totalSales || 0).toFixed(2)}`,
      label: "Total Sales",
      sub: `${posActiveSession?.totalOrders || 0} orders`,
    },
    {
      icon: <Receipt className="h-5 w-5 text-green-500" />,
      amount: `PKR ${cashSales.toFixed(2)}`,
      label: "Cash Sales",
      sub: `${cashOrders?.length || 0} orders`,
    },
    {
      icon: <CreditCard className="h-5 w-5 text-muted-foreground" />,
      amount: `PKR ${onlineSales.toFixed(2)}`,
      label: "Online Sales",
      sub: `${onlineOrders?.length || 0} orders`,
    },
    {
      icon: <Scale className="h-5 w-5 text-green-500" />,
      amount: `PKR ${cashDifference.toFixed(2)}`,
      label: "Cash Difference",
      badge:
        (cashDifference > 0 && "Overage") ||
        (cashDifference < 0 && "Shortage") ||
        "No Cash Difference",
      green: cashDifference >= 0,
    },
  ];

  const startDate = posActiveSession?.startedAt
    ? new Date(posActiveSession.startedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  const endDate = posActiveSession?.endedAt
    ? new Date(posActiveSession.endedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Ongoing";

  useEffect(() => {
    if (!PosReportSessionDialog) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    const handlePopState = () => {
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

  const cashierStats = paidOrders?.length
    ? [
        {
          name: posActiveSession?.userId?.name || "Unknown",
          orders: paidOrders.length,
          totalAmount: paidOrders.reduce(
            (acc, o) => acc + (o.totalAmount || 0),
            0
          ),
        },
      ]
    : [];

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
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        id="report-content"
        className="max-h-[90vh] overflow-y-scroll p-0 [&>button]:hidden"
      >
        <DialogHeader className="bg-linear-to-r from-cyan-500 to-cyan-600 px-6 py-4 text-white">
          <DialogTitle className="flex items-center gap-1 text-lg">
            <ListCheck className="h-4 w-6" /> Session Summary Report
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-hidden px-6">
          <div className="bg-cyan-800 py-4 text-center text-white">
            <TypographyH2 className={"mb-1.5! p-0!"}>
              Session Report
            </TypographyH2>
            <TypographyH3 className={"mb-1.5! p-0! font-medium"}>
              {startDate} to {endDate}
            </TypographyH3>
            <TypographyH3 className={"m-0! p-0! font-medium"}>
              <div className="flex items-center justify-center gap-1">
                <User className="h-6 w-6" /> Cashier:{" "}
                {posActiveSession?.userId?.name}
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
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold">Starting Balance</p>
                    <p className="text-xs text-muted-foreground">
                      Cash in drawer at session start
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-blue-500">
                    PKR {startingBalance.toFixed(2)}
                  </span>
                </div>

                <Separator />

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <PlusCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Cash Sales</p>
                      <p className="text-xs text-muted-foreground">
                        {cashOrders?.length || 0} cash orders
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-500">
                    +PKR {cashSales.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <PlusCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Online Sales</p>
                      <p className="text-xs text-muted-foreground">
                        {onlineOrders?.length || 0} online orders
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-500">
                    +PKR {onlineSales.toFixed(2)}
                  </span>
                </div>

                <Separator />

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
                    PKR {expectedCash.toFixed(2)}
                  </span>
                </div>

                {/* Actual Cash Count — seedha posActiveSession.endingBalance se */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex shrink-0 items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-semibold">Actual Cash Count</p>
                    </div>
                    <span className="text-sm font-semibold">
                      PKR{" "}
                      {endingBalance !== null
                        ? endingBalance.toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                  <p className="pl-6 text-xs text-muted-foreground">
                    Physical cash counted at session end
                  </p>
                </div>

                <div
                  className={`flex items-start justify-between rounded-lg border p-3 ${
                    cashDifference >= 0
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        cashDifference >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    />
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          cashDifference >= 0
                            ? "text-green-800"
                            : "text-red-800"
                        }`}
                      >
                        Cash Difference
                      </p>
                      <p
                        className={`text-xs ${
                          cashDifference >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {cashDifference >= 0
                          ? "Overage: Extra cash found in drawer"
                          : "Shortage: Cash missing from drawer"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      cashDifference >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {cashDifference >= 0 ? "+" : ""}
                    PKR {cashDifference.toFixed(2)}
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
                    {totalOrdersCount} Orders
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">
                    Payment Method Distribution
                  </p>
                  <div className="flex w-full overflow-hidden rounded-md text-xs font-bold tracking-wide text-white">
                    {cashPercentage > 0 && (
                      <div
                        className="bg-green-500 py-2 text-center"
                        style={{ width: `${cashPercentage}%` }}
                      >
                        CASH {cashPercentage.toFixed(0)}%
                      </div>
                    )}
                    {onlinePercentage > 0 && (
                      <div
                        className="bg-blue-500 py-2 text-center"
                        style={{ width: `${onlinePercentage}%` }}
                      >
                        ONLINE {onlinePercentage.toFixed(0)}%
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 rounded-lg border p-3">
                    <p className="text-xs font-bold text-foreground">CASH</p>
                    <p className="text-sm font-semibold">
                      PKR {cashSales.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cashOrders?.length || 0} orders
                    </p>
                  </div>
                  <div className="space-y-1 rounded-lg border p-3">
                    <p className="text-xs font-bold text-foreground">ONLINE</p>
                    <p className="text-sm font-semibold">
                      PKR {onlineSales.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {onlineOrders?.length || 0} orders
                    </p>
                  </div>
                </div>

                <Separator />

                <p className="text-xs text-muted-foreground">
                  Performance Metrics
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 rounded-lg border p-3">
                    <p className="text-sm font-semibold">
                      PKR {averageSale.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Average Sale
                    </p>
                  </div>

                  <div className="space-y-1 rounded-lg border p-3">
                    <p className="text-sm font-semibold">{totalOrdersCount}</p>
                    <p className="text-xs text-muted-foreground">
                      Total Orders
                    </p>
                  </div>

                  <div className="space-y-1 rounded-lg border p-3">
                    <p className="text-sm font-semibold">
                      PKR {(posActiveSession?.totalSales || 0).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Total Revenue
                    </p>
                  </div>

                  <div className="flex flex-col items-start space-y-1 rounded-lg border p-3">
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                    <p className="text-sm font-semibold">
                      {cashAccuracy.toFixed(1)}%
                    </p>
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
                <h4>
                  {posActiveSession?.notes || "No notes for this session."}
                </h4>
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
                    <Badge className="bg-blue-500">
                      {cashierStats.length} Cashier
                      {cashierStats.length !== 1 ? "s" : ""}
                    </Badge>
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
                    {cashierStats.map((cashier, i) => {
                      const avg =
                        cashier.orders > 0
                          ? cashier.totalAmount / cashier.orders
                          : 0;
                      const pct =
                        posActiveSession?.totalSales > 0
                          ? (cashier.totalAmount /
                              posActiveSession.totalSales) *
                            100
                          : 0;
                      return (
                        <TableRow key={i}>
                          <TableCell className="font-medium">
                            {cashier.name}
                          </TableCell>
                          <TableCell>{cashier.orders}</TableCell>
                          <TableCell>
                            PKR {cashier.totalAmount.toFixed(2)}
                          </TableCell>
                          <TableCell>PKR {avg.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge>
                              {pct.toFixed(1)} <Percent className="h-3 w-3" />
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center p-4">
              <Button
                className="p-5 text-lg"
                onClick={() =>
                  SessionReportPrint({
                    restaurantName: "Your Restaurant Name",
                    cashierName: posActiveSession?.userId?.name || "Unknown",
                    startedAt: posActiveSession?.startedAt,
                    endedAt: posActiveSession?.endedAt,
                    startingBalance,
                    endingBalance,
                    totalSales: posActiveSession?.totalSales || 0,
                    totalOrders: posActiveSession?.totalOrders || 0,
                    cashSales,
                    cashOrdersCount: cashOrders?.length || 0,
                    onlineSales,
                    onlineOrdersCount: onlineOrders?.length || 0,
                    expectedCash,
                    cashDifference,
                    notes: posActiveSession?.notes,
                  })
                }
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
