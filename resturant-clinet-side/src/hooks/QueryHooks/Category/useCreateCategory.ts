import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/services/categoryServices/categoryServices.js";
import { toast } from "sonner";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { mutate: createCategoryFN, isPending: isCategoryCreating } =
    useMutation({
      mutationFn: (categoryName) => createCategory(categoryName),

      onSuccess: () => {
        toast.success("Category Created Successfully!");
        queryClient.invalidateQueries({ queryKey: ["category"] });
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { createCategoryFN, isCategoryCreating };
}
