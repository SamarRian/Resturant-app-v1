import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MonitorCheck,
  User,
  CalendarDays,
  Banknote,
  RotateCcw,
  Play,
  Info,
  StickyNote,
  ChevronRight,
} from "lucide-react";
import { useCreateSession } from "@/hooks/QueryHooks/PosSession/useCreateSession";
import { usePosContext } from "@/hooks/usePosContext";
import { useGenerateEmptyOrder } from "@/hooks/QueryHooks/PosSession/PosOrder/useGenerateEmptyOrder";

import { usePosOrderContext } from "@/hooks/usePosOrderContext";

const QUICK_AMOUNTS = [100, 500, 1000, 2000];

export function StartPosSessionDialog({ setItems }) {
  const {
    handleSessionID,
    startPosSessionDialog,
    setStartPosSessionDialog,
    sessinId,
  } = usePosContext();

  const { handleEmptyOrderID } = usePosOrderContext();

  const [cashBalance, setCashBalance] = useState(0);
  const [notes, setNotes] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  const { createSessionFN, isPending } = useCreateSession();
  const {
    generateEmptyOrderFN,
    data,
    isPending: isOrderPending,
  } = useGenerateEmptyOrder();

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  function handleQuickAmount(amount) {
    setCashBalance((prev) => prev + amount);
  }

  function handleClear() {
    setCashBalance(0);
    setNotes("");
  }

  function handleStart() {
    if (!cashBalance || cashBalance === 0) return;

    createSessionFN(
      { startingBalance: cashBalance, notes },
      {
        onSuccess: (data) => {
          const newSessionId = data?.data?._id;
          handleSessionID(newSessionId);

          generateEmptyOrderFN(undefined, {
            onSuccess: (data) => {
              handleEmptyOrderID(data?.order?._id || "");
              setItems([]);
            },
          });

          setStartPosSessionDialog(false);
        },
      }
    );
  }

  return (
    <Dialog
      open={startPosSessionDialog}
      onOpenChange={setStartPosSessionDialog}
    >
      <DialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className={[
          "gap-0 overflow-hidden p-0",
          "max-h-[90dvh]",
          "[&>button]:hidden",
          "flex flex-col",
          "w-full sm:max-w-lg",
        ].join(" ")}
      >
        {/* Rest of your JSX remains exactly the same */}
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-linear-to-br from-slate-800 via-slate-700 to-slate-900 px-6 pt-8 pb-6 text-center">
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/5" />
          <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-white/5" />

          <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <MonitorCheck className="h-8 w-8 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500" />
            </span>
          </div>

          <h2 className="text-xl font-semibold text-white">
            Start POS Session
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Begin your point of sale session to process orders
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto bg-background px-6 pt-5 pb-4">
          {/* Cashier + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-xl border bg-muted/50 px-3 py-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">Cashier</p>
                <p className="truncate text-sm font-medium">Admin</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border bg-muted/50 px-3 py-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <CalendarDays className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">
                  {formattedDate}
                </p>
                <p className="text-sm font-medium">{formattedTime}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Cash Balance */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">
                Starting Cash Balance
              </label>
            </div>

            <div className="flex items-center gap-2 rounded-xl border-2 border-emerald-500/30 bg-emerald-50/50 px-4 py-3 transition-colors focus-within:border-emerald-500 dark:bg-emerald-950/20">
              <Badge
                variant="secondary"
                className="shrink-0 bg-emerald-100 font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
              >
                PKR
              </Badge>
              <input
                type="number"
                min={0}
                value={cashBalance}
                onChange={(e) => setCashBalance(Number(e.target.value))}
                className="flex-1 [appearance:textfield] bg-transparent text-right text-lg font-bold text-emerald-700 outline-none dark:text-emerald-400 [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {QUICK_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleQuickAmount(amount)}
                  className="rounded-lg border border-slate-200 bg-background py-2 text-xs font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  +{amount.toLocaleString()}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2 text-xs text-muted-foreground transition-all hover:border-slate-400 hover:text-foreground active:scale-[0.99] dark:border-slate-600"
            >
              <RotateCcw className="h-3 w-3" />
              Clear
            </button>
          </div>

          <Separator />

          {/* Notes */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StickyNote className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">
                Session Notes{" "}
                <span className="font-normal text-muted-foreground">
                  (Optional)
                </span>
              </label>
            </div>
            <Textarea
              placeholder="Add any notes for this session..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-18 resize-none rounded-xl text-sm"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 space-y-3 border-t bg-background px-6 pt-3 pb-5">
          <Button
            onClick={handleStart}
            disabled={isPending || !cashBalance || cashBalance === 0}
            className="h-12 w-full gap-2 rounded-xl bg-emerald-500 text-base font-semibold text-white shadow-sm shadow-emerald-200 transition-all hover:bg-emerald-600 active:scale-[0.99] dark:shadow-emerald-900"
          >
            <Play className="h-4 w-4 fill-white" />
            Start POS Session
            <ChevronRight className="ml-auto h-4 w-4" />
          </Button>

          <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <Info className="h-3 w-3 shrink-0" />
            You will be able to process orders after starting session
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
