import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllTables } from "@/hooks/QueryHooks/Tables/useGetAllTables";
import { usePosContext } from "@/hooks/usePosContext";
import { usePosOrderContext } from "@/hooks/usePosOrderContext";
import clsx from "clsx";
import { LayoutGrid, Table, Table2Icon, Users, X } from "lucide-react";
import { useState } from "react";

function PosSelectTableDialog() {
  const { PosSelectTableDialog, setPosSelectTableDialog } = usePosContext();
  const [selectedTable, setSelectedTable] = useState("");
  const { submitOrderData } = usePosOrderContext();
  const { data, isLoading } = useGetAllTables();

  const tablesData = data?.tablesData;
  function handleTableSelect(tableId: string) {
    console.log({ tableId });

    submitOrderData("tableId", tableId);
  }

  return (
    <Dialog open={PosSelectTableDialog} onOpenChange={setPosSelectTableDialog}>
      <DialogContent className="max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-7xl">
        <DialogHeader className="flex flex-row items-center justify-between bg-linear-to-r from-accent/90 to-accent px-6 py-3">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-white">
            <Table2Icon className="h-5 w-5" />
            Select Table
          </DialogTitle>
        </DialogHeader>
        {!tablesData ? (
          <div className="flex items-center justify-center p-8">
            <Table className="h-6 w-6 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No tables found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 overflow-y-scroll p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {tablesData?.map((table, i) => (
              <Card
                key={i}
                className={clsx(
                  "cursor-pointer border transition-shadow duration-200 hover:shadow-md",
                  table._id === selectedTable ? "border-2 border-green-500" : ""
                )}
                onClick={() => {
                  if (table.status === "Available") {
                    handleTableSelect(table._id);
                    setSelectedTable(table._id);
                  }
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                        <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-sm font-semibold">
                        {table.tableName}
                      </CardTitle>
                    </div>
                    <Badge
                      className={
                        table.status === "Available"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : table.status === "Reserved"
                            ? "bg-red-100 text-red-700 hover:bg-red-100"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      }
                    >
                      {table.status}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        <div className="p-6">
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>
                <X className="h-4 w-4" />
                Close
              </Button>
            </DialogClose>
            <Button>Submit Table</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PosSelectTableDialog;
