import { Power, Clock, Wallet, ShoppingBag, TrendingUp } from "lucide-react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";

function PosHeader() {
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

  return (
    <header className="w-full rounded-xl border border-border bg-card shadow-sm">
      {/* Top accent bar */}
      <div className="h-1 w-full rounded-t-xl bg-red-500" />

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3">
        {/* Session Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 dark:bg-accent/20">
            <Clock className="h-4 w-4 text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
              Active Session
            </span>
            <span className="text-sm font-semibold text-foreground">
              {dateStr} · {timeStr}
            </span>
          </div>
          <Badge
            variant="outline"
            className="ml-1 border-accent/40 bg-accent/10 text-accent"
          >
            Live
          </Badge>
        </div>

        {/* Stats + End Session group — wraps together on small screens */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {/* Balance */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/8 dark:bg-primary/15">
                <Wallet className="h-4 w-4 text-primary dark:text-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                  Balance
                </span>
                <span className="text-sm font-bold text-foreground tabular-nums">
                  $0.00
                </span>
              </div>
            </div>

            <Separator orientation="vertical" className="h-8" />

            {/* Sales */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 dark:bg-accent/15">
                <TrendingUp className="h-4 w-4 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                  Sales
                </span>
                <span className="text-sm font-bold text-foreground tabular-nums">
                  $0.00
                </span>
              </div>
            </div>

            <Separator orientation="vertical" className="h-8" />

            {/* Orders */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary">
                <ShoppingBag className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                  Orders
                </span>
                <span className="text-sm font-bold text-foreground tabular-nums">
                  0
                </span>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="hidden h-10 sm:block" />

          {/* End Session */}
          <Button variant="destructive" size="sm" className="gap-2">
            <Power className="h-4 w-4" />
            <span>End Session</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default PosHeader;
