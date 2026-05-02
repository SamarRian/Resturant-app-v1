import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useFormContext } from "@/hooks/useFormContext";
import { useDeleteDeal } from "@/hooks/QueryHooks/Deals/useDeleteDeal";

export type Deal = {
  id: string;
  image: string;
  dealName: string;
  title: string;
  variantsIncluded: string | number;
  dealPrice: number;
  regularPrice: number;
  saving: {
    amount: number;
    percentage: number;
  };
  status: "Active" | "Inactive" | "Expired";
  createdBy: string;
};

export const useDealsColumns = (): ColumnDef<Deal>[] => {
  const { toggleDialogue, handleDealID } = useFormContext();

  const { deleteDealFN, isPending } = useDeleteDeal();

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
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const image = row.getValue("image") as string;

        return (
          <div className="flex w-full items-center">
            <Avatar>
              <AvatarImage src={`http://localhost:5000/images/${image}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        );
      },
    },
    {
      accessorKey: "dealName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deal Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "dealTitle",
      header: "Title",
    },

    {
      accessorKey: "variantsIncluded",
      header: "Variants Included",
      cell: ({ row }) => {
        const variants = row.getValue("variantsIncluded") as any[];

        return (
          <Badge className="bg-blue-200 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {variants?.length > 0
              ? `${variants?.length} Variants`
              : "0 Variants"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "dealPrice",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deal Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const price = row.getValue("dealPrice") as number;
        return <div>{price.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "regularPrice",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Regular Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const price = row.getValue("regularPrice") as number;

        return <div>{price}</div>;
      },
    },
    {
      accessorKey: "saving",
      header: "Saving",
      cell: ({ row }) => {
        const regularPrice = row.original.regularPrice;

        const dealPrice = row.original.dealPrice;

        const saving = regularPrice - dealPrice;
        return (
          <Badge
            className={cn(
              "bg-red-500 dark:bg-accent/70 dark:text-white/80",
              "text-white"
            )}
          >
            Save {saving}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            className={cn(
              "",
              status === "active" ? "bg-green-500" : "bg-red-400"
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
        const id = row.original._id;
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
                  toggleDialogue();

                  handleDealID(id);
                }}
              >
                Add Variants
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => deleteDealFN(id)}
                className="text-red-600"
              >
                {isPending ? "Deleting..." : "Delete Deal"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
