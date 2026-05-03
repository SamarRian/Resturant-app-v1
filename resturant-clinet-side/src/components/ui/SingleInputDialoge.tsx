import { useCreateTable } from "@/hooks/QueryHooks/Tables/useCreateTable";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Field, FieldGroup } from "./field";
import { Input } from "./input";
import { Label } from "./label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useFormContext } from "@/hooks/useFormContext";
import { useUpdateTable } from "@/hooks/QueryHooks/Tables/useUpdateTable";
import { useGetSingleTable } from "@/hooks/QueryHooks/Tables/useGetSingleTable";
import { useUpdateStaff } from "@/hooks/QueryHooks/Staff/useUpdateStaff";
import { useCreateStaff } from "@/hooks/QueryHooks/Staff/useCreateStaff";
import { useGetSingleStaff } from "@/hooks/QueryHooks/Staff/useGetSingleStaff";
import { useCreateCategory } from "@/hooks/QueryHooks/Category/useCreateCategory";
import { useUpdateCategory } from "@/hooks/QueryHooks/Category/useUpdateCategory";
import { useGetSingleCategory } from "@/hooks/QueryHooks/Category/useGetSingleCategory";

function SingleInputDialoge({ title, submitionKey }) {
  const {
    isSingleDialog,
    setIsSingleDialog,
    toggleSingleDialog,
    tableId,
    staffID,
    categoryID,
  } = useFormContext();
  //STaff data fetching

  // Table data fetching
  const { createTableFN, isPending } = useCreateTable();
  const { isPending: isTableUpdating, updateTableFN } = useUpdateTable();
  const { SingleTableData, isSingleTableLoading } = useGetSingleTable(
    tableId ? tableId : ""
  );

  const singleTable = SingleTableData?.table;

  // STAfF data fetching
  const { staffUpdateFN, isPending: isStaffUpdating } = useUpdateStaff();
  const { createStaffFN, isPending: IsSTaffCreating } = useCreateStaff();
  const { isLoading: isSingleStaffLoading, singleStaff } = useGetSingleStaff(
    staffID ? staffID : ""
  );
  const singleStaffData = singleStaff?.staff;

  // CATEGORY DATA FETCHING

  const { createCategoryFN, isCategoryCreating } = useCreateCategory();
  const { isCategoryUpdating, updateCategoryFN } = useUpdateCategory();
  const { singleCategoryData, isSingleCategoryLoading } = useGetSingleCategory(
    categoryID ? categoryID : ""
  );

  const singleCategory = singleCategoryData?.category;
  // component state
  const [singleInput, setSingleInput] = useState("");

  useEffect(() => {
    if (singleTable?.tableName) {
      setSingleInput(singleTable.tableName);
    } else {
      setSingleInput("");
    }
  }, [singleTable, tableId]);

  // Staff useeffect
  useEffect(() => {
    if (singleStaffData?.personName) {
      setSingleInput(singleStaffData.personName);
    } else {
      setSingleInput("");
    }
  }, [singleStaffData, staffID]);

  //  Category useEffect
  useEffect(() => {
    if (singleCategory?.categoryName) {
      setSingleInput(singleCategory.categoryName);
    } else {
      setSingleInput("");
    }
  }, [singleCategory, categoryID]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!singleInput.trim()) return;

    if (categoryID && submitionKey === "category-single-dialog") {
      updateCategoryFN(
        { id: categoryID, categoryName: singleInput },
        {
          onSuccess: () => {
            setSingleInput("");
            toggleSingleDialog();
          },
        }
      );
    } else if (submitionKey === "category-single-dialog") {
      createCategoryFN(singleInput, {
        onSuccess: () => {
          setSingleInput("");
          toggleSingleDialog();
        },
      });
    }
    if (staffID && submitionKey === "staff-single-dialog") {
      staffUpdateFN(
        { id: staffID, personName: singleInput },
        {
          onSuccess: () => {
            setSingleInput("");
            toggleSingleDialog();
          },
        }
      );
    } else if (submitionKey === "staff-single-dialog") {
      createStaffFN(singleInput, {
        onSuccess: () => {
          setSingleInput("");
          toggleSingleDialog();
        },
      });
    }

    if (tableId && submitionKey === "table-single-dialog") {
      // ✅ Update
      updateTableFN(
        { id: tableId, tableName: singleInput },
        {
          onSuccess: () => {
            setSingleInput("");
            toggleSingleDialog();
          },
        }
      );
    } else if (submitionKey === "table-single-dialog") {
      // ✅ Create
      createTableFN(singleInput, {
        onSuccess: () => {
          setSingleInput("");
          toggleSingleDialog();
          toast.success("Table created successfully!");
        },
      });
    }
  };

  return (
    <Dialog open={isSingleDialog} onOpenChange={setIsSingleDialog}>
      <DialogContent className="w-[20%] sm:w-[30%]!">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit {title}</DialogTitle>
            <DialogDescription>
              Make changes to your {title} here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                disabled={isSingleTableLoading}
                value={singleInput}
                onChange={(e) => setSingleInput(e.target.value)}
                placeholder={`Enter ${title} Name`}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {isPending ? "Submiting..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SingleInputDialoge;
