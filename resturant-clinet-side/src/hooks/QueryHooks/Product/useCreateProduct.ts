import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct } from "../../../services/productServices/productService.js";
import { toast } from "sonner";

export function useCreateProduct() {
  // const queryClient = useQueryClient();
  const { mutate: ProductCreate, isPending } = useMutation({
    mutationFn: (data) => createProduct(data),

    onSuccess: (data) => {
      toast.success(data.message || "Product Created Successfully!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { ProductCreate, isPending };
}
