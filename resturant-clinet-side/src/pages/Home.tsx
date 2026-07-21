/**
 * FoodEngine — Dashboard Overview
 * ---------------------------------------------------------------------------
 * This is the CONTENT for the "/dashboard" route only — it assumes your
 * existing sidebar/topbar layout already wraps it (like in your other admin
 * pages). Drop this in as the element for your Dashboard route.
 *
 * SETUP:
 *   npx shadcn@latest add card badge table separator
 *   npm install lucide-react recharts
 *
 * DATA:
 *   Every value below is a placeholder (`const stats = {...}`, `recentOrders`,
 *   `topProducts`, `weeklySales`, `staffOnShift`). Wire these to your existing
 *   endpoints — likely a mix of:
 *     - GET /api/orders/all              (recent orders + counts)
 *     - GET /api/session/:id             (active session balance/sales)
 *     - GET /api/product/all             (for low-stock / top products)
 *   via React Query, matching the pattern you already use elsewhere.
 * ---------------------------------------------------------------------------
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Wallet,
  Receipt,
  TrendingUp,
  PackageX,
  UtensilsCrossed,
  Bike,
  ShoppingBag,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

// ---------------------------------------------------------------------------
// Placeholder data — replace with your real queries
// ---------------------------------------------------------------------------
const stats = {
  todaySales: 42300,
  ordersToday: 38,
  sessionBalance: 8600,
  lowStockCount: 4,
};

const weeklySales = [
  { day: "Mon", sales: 28500 },
  { day: "Tue", sales: 31200 },
  { day: "Wed", sales: 26800 },
  { day: "Thu", sales: 35100 },
  { day: "Fri", sales: 48900 },
  { day: "Sat", sales: 52300 },
  { day: "Sun", sales: 42300 },
];

const topProducts = [
  { name: "Hot BBQ Wings", sold: 64, revenue: 51200 },
  { name: "Chicken Pizza Pasta", sold: 51, revenue: 30600 },
  { name: "Teacher Deal", sold: 39, revenue: 27300 },
  { name: "Coca Cola", sold: 88, revenue: 22000 },
];

const recentOrders = [
  {
    id: "#TA-4",
    type: "Dine-in",
    items: 3,
    status: "pending",
    payment: "pending",
    total: 2200,
  },
  {
    id: "#TA-3",
    type: "Take Away",
    items: 1,
    status: "pending",
    payment: "paid",
    total: 800,
  },
  {
    id: "#TA-2",
    type: "Delivery",
    items: 2,
    status: "completed",
    payment: "paid",
    total: 1500,
  },
  {
    id: "#TA-1",
    type: "Dine-in",
    items: 1,
    status: "completed",
    payment: "paid",
    total: 700,
  },
];

const staffOnShift = [
  { name: "Bilal", role: "Server", orders: 9 },
  { name: "Sana", role: "Server", orders: 7 },
  { name: "Usman", role: "Cashier", orders: 12 },
];

// ---------------------------------------------------------------------------

const orderTypeIcon = {
  "Dine-in": UtensilsCrossed,
  "Take Away": ShoppingBag,
  Delivery: Bike,
};

const statusBadge = (status: string) =>
  status === "completed"
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : status === "pending"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-slate-100 text-slate-700 border-slate-200";

const paymentBadge = (payment: string) =>
  payment === "paid"
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-rose-50 text-rose-700 border-rose-200";

export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}{" "}
            — today's snapshot
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Today's Sales"
          value={`Rs ${stats.todaySales.toLocaleString()}`}
          icon={TrendingUp}
          accent="text-emerald-600 bg-emerald-50"
        />
        <StatCard
          label="Orders Today"
          value={stats.ordersToday.toString()}
          icon={Receipt}
          accent="text-blue-600 bg-blue-50"
        />
        <StatCard
          label="Active Session Balance"
          value={`Rs ${stats.sessionBalance.toLocaleString()}`}
          icon={Wallet}
          accent="text-violet-600 bg-violet-50"
        />
        <StatCard
          label="Low Stock Items"
          value={stats.lowStockCount.toString()}
          icon={PackageX}
          accent="text-rose-600 bg-rose-50"
          warn={stats.lowStockCount > 0}
        />
      </div>

      {/* Sales trend + Top products */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-slate-200 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium text-slate-900">
              Sales this week
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySales}>
                <CartesianGrid vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  tickFormatter={(v) => `${v / 1000}k`}
                />
                <Tooltip
                  formatter={(v: number) => [
                    `Rs ${v.toLocaleString()}`,
                    "Sales",
                  ]}
                  cursor={{ fill: "#F8FAFC" }}
                  contentStyle={{ borderRadius: 6, borderColor: "#E2E8F0" }}
                />
                <Bar dataKey="sales" fill="#16A34A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-medium text-slate-900">
              Top products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {p.name}
                    </p>
                    <p className="text-xs text-slate-500">{p.sold} sold</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Rs {p.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent orders + Staff on shift */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-slate-200 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium text-slate-900">
              Recent orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((o) => {
                  const Icon =
                    orderTypeIcon[o.type as keyof typeof orderTypeIcon];
                  return (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium text-slate-900">
                        {o.id}
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <Icon className="h-3.5 w-3.5" />
                          {o.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {o.items} item{o.items > 1 ? "s" : ""}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusBadge(o.status)}
                        >
                          {o.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={paymentBadge(o.payment)}
                        >
                          {o.payment}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-900">
                        Rs {o.total.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-medium text-slate-900">
              Staff on shift
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {staffOnShift.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-xs font-medium text-emerald-700">
                    {s.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {s.name}
                    </p>
                    <p className="text-xs text-slate-500">{s.role}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500">
                  {s.orders} orders
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  warn,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  accent: string;
  warn?: boolean;
}) {
  return (
    <Card className="border-slate-200">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p
            className={`mt-1 text-xl font-semibold ${warn ? "text-rose-600" : "text-slate-900"}`}
          >
            {value}
          </p>
        </div>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent}`}
        >
          <Icon className="h-5 w-5" />
        </span>
      </CardContent>
    </Card>
  );
}
