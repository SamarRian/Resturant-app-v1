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

// Define the Deal type based on your image schema
export type Deal = {
  id: string;
  image: string;
  dealName: string;
  title: string;
  variantsIncluded: string | number; // "4 Products" or "Custom Deal"
  dealPrice: number;
  regularPrice: number;
  saving: {
    amount: number;
    percentage: number;
  };
  status: "Active" | "Inactive" | "Expired";
  createdBy: string;
};

export const dealsColumns: ColumnDef<Deal>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "no",
    header: "#",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      console.log(image);

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deal Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "variantsIncluded",
    header: "Variants Included",
    cell: ({ row }) => {
      const variants = row.getValue("variantsIncluded") as string | number;
      return (
        <Badge className="bg-blue-200 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          {variants}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dealPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deal Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue("dealPrice") as number;
      return <div>{price.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "regularPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Regular Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue("regularPrice") as number;
      return <div>{price.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "saving",
    header: "Saving",
    cell: ({ row }) => {
      const saving = row.getValue("saving") as {
        amount: number;
        percentage: number;
      };
      return (
        <Badge
          className={cn(
            "bg-accent/50 dark:bg-accent/70 dark:text-white/80",
            saving.amount > 0 ? "text-black/70" : "text-red-600"
          )}
        >
          Save {saving.amount.toFixed(2)} ({saving.percentage.toFixed(2)}%)
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <Badge variant={"destructive"}>{status}</Badge>;
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
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(deal.id)}
            >
              Copy Deal ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Deal</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Delete Deal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
