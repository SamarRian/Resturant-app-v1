import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoryById } from "@/services/categoryServices/categoryServices.js";
import { toast } from "sonner";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { mutate: updateCategoryFN, isPending: isCategoryUpdating } =
    useMutation({
      mutationFn: ({ id, categoryName }) =>
        updateCategoryById(id, categoryName),

      onSuccess: () => {
        toast.success("Category Updated Successfully1");
        queryClient.invalidateQueries({ queryKey: ["category"] });
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateCategoryFN, isCategoryUpdating };
}
