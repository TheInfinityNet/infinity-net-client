import { useApiClient } from "@/contexts/api-client.context";
import { useInfiniteQuery } from "react-query";

export function useGetPostByUserId(userId: string) {
  const { postsService } = useApiClient();

  return useInfiniteQuery(["posts", userId], {
    queryFn: ({ pageParam = 0 }) =>
      postsService().getPostsByUserId(userId, { offset: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) =>
      lastPage.data.metadata.pagination.nextOffset,
    staleTime: 1000 * 60 * 5,
  });
}
