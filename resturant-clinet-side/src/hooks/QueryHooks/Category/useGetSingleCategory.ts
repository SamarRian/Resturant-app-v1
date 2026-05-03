import { useQuery } from "@tanstack/react-query";
import { getSingleCategory } from "@/services/categoryServices/categoryServices.js";

export function useGetSingleCategory(id) {
  const {
    data: singleCategoryData,
    isLoading: isSingleCategoryLoading,
    isError,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getSingleCategory(id),
    enabled: !!id,
  });

  return {
    singleCategoryData,
    isSingleCategoryLoading,
    isError,
  };
}
