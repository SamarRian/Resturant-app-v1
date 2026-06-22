import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, TriangleAlert, X, PowerOff } from "lucide-react";
import { usePosContext } from "@/hooks/usePosContext";
import { useCloseSession } from "@/hooks/QueryHooks/PosSession/useCloseSession";

export function EndPosSessionDialog() {
  const {
    isPosEndSessionDialog,
    setPosEndSessionDialog,
    togglePosReportSessionDialog,

    sessinId,
  } = usePosContext();

  const [cashCount, setCashCount] = useState("");
  const [closingNotes, setClosingNotes] = useState("");

  // SESSION DATA FETCHING
  const { closeSessionFN, isPending } = useCloseSession();

  function handleEnd() {
    closeSessionFN(
      {
        id: sessinId,
        endingBalance: cashCount,
        notes: closingNotes,
      },
      {
        onSuccess: () => {
          setPosEndSessionDialog(false);
          togglePosReportSessionDialog();
        },
      }
    );
  }

  function handleCancel() {
    setPosEndSessionDialog(false);
  }

  return (
    <Dialog open={isPosEndSessionDialog} onOpenChange={setPosEndSessionDialog}>
      <DialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className={[
          "gap-0 overflow-hidden p-0",
          "flex flex-col",
          "[&>button]:hidden",
          "w-full sm:max-w-md",
        ].join(" ")}
      >
        {/* ── Header ───────────────────────────────────────────── */}
        <div className="flex flex-col items-center px-6 pt-8 pb-5 text-center">
          {/* Warning Icon */}
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
            <TriangleAlert className="h-7 w-7 text-orange-500" />
          </div>

          <h2 className="text-xl font-semibold text-foreground">
            End POS Session?
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            This will close your current session and save all records.
          </p>
        </div>

        {/* ── Body ─────────────────────────────────────────────── */}
        <div className="space-y-4 px-6 pb-6">
          {/* Important Banner */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/40">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <span className="font-semibold">Important:</span> Please count
              your cash before ending the session.
            </p>
          </div>

          {/* Actual Cash Count */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Actual Cash Count
            </label>
            <div className="flex items-center overflow-hidden rounded-lg border border-input bg-background ring-offset-background transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <div className="flex h-10 items-center border-r border-input bg-muted px-3">
                <span className="text-sm font-medium text-muted-foreground">
                  PKR
                </span>
              </div>
              <input
                type="number"
                min={0}
                placeholder="Enter actual cash amount"
                value={cashCount}
                onChange={(e) => setCashCount(e.target.value)}
                className="flex-1 [appearance:textfield] bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Closing Notes */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Closing Notes{" "}
              <span className="font-normal text-muted-foreground">
                (Optional)
              </span>
            </label>
            <Textarea
              placeholder="Any notes about session closing..."
              value={closingNotes}
              onChange={(e) => setClosingNotes(e.target.value)}
              className="min-h-[100px] resize-none rounded-lg text-sm"
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-1">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="h-11 flex-1 gap-2 rounded-xl"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>

            <Button
              disabled={isPending}
              onClick={handleEnd}
              className="h-11 flex-1 gap-2 rounded-xl bg-red-500 text-white transition-all hover:bg-red-600 active:scale-[0.99] dark:bg-red-600 dark:hover:bg-red-700"
            >
              <PowerOff className="h-4 w-4" />
              Yes, End Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
