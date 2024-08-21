import { useApiClient } from "@/contexts/api-client.context";
import { useInfiniteQuery } from "react-query";

export function useGetNewsFeed() {
  const { postsService } = useApiClient();

  return useInfiniteQuery(["posts", "news-feed"], {
    queryFn: ({ pageParam = 0 }) =>
      postsService().getNewsFeed({ offset: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) =>
      lastPage.data.metadata.pagination.nextOffset,
    staleTime: 1000 * 60 * 5,
  });
}
