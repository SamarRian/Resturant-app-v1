import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { usePosContext } from "@/hooks/usePosContext";

import { Bike, ForkKnife, Handbag, ListCheck, X } from "lucide-react";
import PosRunningOrdersTable from "./PosRunningOrdersTable";
import { useState } from "react";

export default function PosRunningOrdersDialog() {
  const { isPosRunningDialog, setIsPosRunningDialog } = usePosContext();

  const [tab, setTab] = useState("");

  return (
    <Dialog open={isPosRunningDialog} onOpenChange={setIsPosRunningDialog}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-7xl">
        <DialogHeader className="flex flex-row items-center justify-between bg-linear-to-r from-cyan-500 to-cyan-600 px-6 py-3">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-white">
            <ListCheck className="h-5 w-5" />
            Running Orders
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden p-6">
          <Tabs
            defaultValue="dine-in"
            className="flex h-full flex-col"
            value={tab}
            onValueChange={setTab}
          >
            <TabsList>
              <TabsTrigger
                value="dine-in"
                className="text-lg data-[state=active]:bg-accent data-[state=active]:text-white"
              >
                <ForkKnife className="h-4 w-4" />
                Dine-in
              </TabsTrigger>

              <TabsTrigger
                value="takeaway"
                className="text-lg data-[state=active]:bg-accent data-[state=active]:text-white"
              >
                <Handbag className="h-4 w-4" />
                Take Away
              </TabsTrigger>

              <TabsTrigger
                value="delivery"
                className="text-lg data-[state=active]:bg-accent data-[state=active]:text-white"
              >
                <Bike className="h-4 w-4" />
                Delivery
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="dine-in"
              className="mt-4 flex-1 overflow-hidden"
            >
              <PosRunningOrdersTable tab={tab} key={tab} />
            </TabsContent>

            <TabsContent
              value="takeaway"
              className="mt-4 flex-1 overflow-hidden"
            >
              <PosRunningOrdersTable tab={tab} key={tab} />
            </TabsContent>

            <TabsContent
              value="delivery"
              className="mt-4 flex-1 overflow-hidden"
            >
              <PosRunningOrdersTable tab={tab} key={tab} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t p-4">
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <X className="h-4 w-4" />
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
