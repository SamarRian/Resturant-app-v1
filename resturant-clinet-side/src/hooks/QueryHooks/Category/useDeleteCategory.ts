import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryById } from "@/services/categoryServices/categoryServices.js";
import { toast } from "sonner";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteCategoryFN, isPending: isCategoryDeleting } =
    useMutation({
      mutationFn: (id) => deleteCategoryById(id),

      onSuccess: () => {
        toast.success("Category Deleted Successfully!");
        queryClient.invalidateQueries({ queryKey: ["category"] });
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { deleteCategoryFN, isCategoryDeleting };
}
