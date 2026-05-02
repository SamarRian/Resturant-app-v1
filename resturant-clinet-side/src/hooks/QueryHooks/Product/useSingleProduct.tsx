import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "../../../services/productServices/productService";

export const useGetSingleProduct = (id) => {
  const {
    data: singleProduct,
    isLoading,
    refetch,
    error,
    isError,
  } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => getSingleProduct(id),
    enabled: !!id,
    retry: 1,
    staleTime: 0,
    cacheTime: 0,
  });

  return { singleProduct, isLoading, refetch, error, isError };
};
