import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../../services/productServices/productService.js";
export function useGetAllProducts() {
  const {
    isLoading: isProductsLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  return { isProductsLoading, productsData: data?.products, isError };
}
