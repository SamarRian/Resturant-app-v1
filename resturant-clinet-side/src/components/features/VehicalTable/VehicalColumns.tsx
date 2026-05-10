import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteVehical } from "@/hooks/QueryHooks/Vehical/useDeleteVehical";
import { useUpdateVehical } from "@/hooks/QueryHooks/Vehical/useUpdateVehical";
import { useFormContext } from "@/hooks/useFormContext";

import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type vehicaltypes = {
  vehicalNumber: string;
  status: string;
};

export const VehicalColumns = (): ColumnDef<vehicaltypes>[] => {
  const { handleVehicalId, toggleSingleDialog } = useFormContext();

  const { updateVehicalFN } = useUpdateVehical();

  const { deleteVehicalFN, isPending } = useDeleteVehical();
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "no",
      header: "#",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },

    {
      accessorKey: "vehicalNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vehical Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: () => <span>Vehical Status</span>,
      cell: ({ row }) => {
        const status = row.original?.status;
        const statusBoolean = status === "Available";
        const id = row.original?._id;

        return (
          <Badge
            onClick={() => {
              updateVehicalFN({
                id,
                status: statusBoolean ? "Busy" : "Available",
              });
            }}
            className={cn(
              "cursor-pointer!",
              statusBoolean ? "bg-accent" : "bg-red-700"
            )}
          >
            {status}
          </Badge>
        );
      },
    },

    {
      accessorKey: "createdBy",
      header: "Created By",
      cell: () => {
        return <span>Admin</span>;
      },
    },

    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const id = row.original?._id;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  toggleSingleDialog();
                  handleVehicalId(id);
                }}
              >
                Update
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  deleteVehicalFN(id);
                }}
                variant="destructive"
              >
                {/* {isDeleting ? "Deleting..." : "Delete"} */}
                delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
