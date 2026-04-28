import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "../../../services/productServices/productService";

export const useGetSingleProduct = (id) => {
  const { data: singleProduct, isLoading } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => getSingleProduct(id),
    enabled: !!id,
  });

  return { singleProduct, isLoading };
};
