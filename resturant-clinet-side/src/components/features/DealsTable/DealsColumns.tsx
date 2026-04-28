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
  const { toggleDialogue } = useFormContext();

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
        const variants = row.getValue("variantsIncluded") as string | number;
        return (
          <Badge
            onClick={toggleDialogue}
            className="bg-blue-200 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
          >
            {variants ?? "0 Varients"}
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
        // const price = row.getValue("regularPrice") as number;
        // return <div>{price.toFixed(2)}</div>;
        <div>Regular price</div>;
      },
    },
    {
      accessorKey: "saving",
      header: "Saving",
      cell: ({ row }) => {
        // const saving = row.getValue("saving") as number;

        return (
          <Badge
            className={cn(
              "bg-accent/50 dark:bg-accent/70 dark:text-white/80",
              "text-red-600"
            )}
          >
            {/* Save {saving.amount.toFixed(2)} ({saving.percentage.toFixed(2)}%) */}
            saving amount
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <Badge variant="destructive">{status}</Badge>;
      },
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const deal = row.original;

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

              <DropdownMenuItem onClick={toggleDialogue}>
                Update Deal
              </DropdownMenuItem>

              <DropdownMenuItem className="text-red-600">
                Delete Deal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
