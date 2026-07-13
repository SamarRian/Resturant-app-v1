import {
  Clock,
  Wallet,
  TrendingUp,
  ShoppingBag,
  Power,
  Dot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { usePosContext } from "@/hooks/usePosContext";
import { useGetSingleSession } from "@/hooks/QueryHooks/PosSession/useGetSingleSession";

export function PosHeader() {
  // POS CONTEXT
  const { togglePosEndSessionDialog, sessinId } = usePosContext();
  // DATA FETCHING
  const { data } = useGetSingleSession(sessinId);
  const activeSessionData = data?.data;
  const balance =
    activeSessionData?.cashInHand + activeSessionData?.startingBalance;

  const [dateTime, setDateTime] = useState({ dateStr: "", timeStr: "" });

  useEffect(function () {
    function updateTimeAndDate() {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      setDateTime({ dateStr, timeStr });
    }
    updateTimeAndDate();

    const interval = setInterval(updateTimeAndDate, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <header className="shrink-0 border-b border-border bg-card shadow-sm">
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-accent" />

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5">
        {/* Session info */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15">
            <Clock className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
              Active Session
            </p>
            <p className="text-xs font-bold text-foreground">
              {dateTime.dateStr} · {dateTime.timeStr}
            </p>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-accent/40 bg-accent/10 text-accent"
          >
            Live
            <Dot className="h-3 w-3 fill-accent" />
          </Badge>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4">
          {[
            {
              icon: Wallet,
              label: "Balance",
              value: balance.toFixed(2),
              prefix: "$",
            },
            {
              icon: TrendingUp,
              label: "Sales",
              value: activeSessionData?.totalSales.toFixed(2),
              prefix: "$",
            },
            {
              icon: ShoppingBag,
              label: "Orders completed",
              value: activeSessionData?.totalOrders,
              prefix: "",
            },
          ].map(({ icon: Icon, label, value, prefix }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                  {label}
                </p>
                <p className="text-xs font-bold text-foreground tabular-nums">
                  {prefix}
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* End Session */}
        <Button
          variant="destructive"
          size="sm"
          className="gap-1.5"
          onClick={() => {
            togglePosEndSessionDialog();
          }}
        >
          <Power className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">End Session</span>
        </Button>
      </div>
    </header>
  );
}
