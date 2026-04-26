import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct } from "../../../services/productServices/productService.js";
import { toast } from "sonner";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutate: ProductCreate, isPending } = useMutation({
    mutationFn: (data) => createProduct(data),

    onSuccess: (data) => {
      toast.success(data.message || "Product Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { ProductCreate, isPending };
}
