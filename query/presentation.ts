import { getCurrentppt } from "@/actions/getCurrentPpt";
import { useQuery } from "@tanstack/react-query";

export function useGetCurrentPpt(id: string) {
  return useQuery({
    queryKey: ["currentPpt", id],
    queryFn: () => getCurrentppt(id),
    enabled: !!id, 
  });
}
