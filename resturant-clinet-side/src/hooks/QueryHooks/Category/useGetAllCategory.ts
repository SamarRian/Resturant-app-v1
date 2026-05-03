import { getAllCategories } from "@/services/categoryServices/categoryServices";
import { useQuery } from "@tanstack/react-query";

export function useGetAllCategory() {
  const { data: Category, isLoading: isCategoryLoading } = useQuery({
    queryFn: getAllCategories,
    queryKey: ["category"],
  });
  return { Category, isCategoryLoading };
}
