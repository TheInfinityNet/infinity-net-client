import postsService from "@/lib/api/services/posts.service";
import { useInfiniteQuery } from "react-query";

export function useGetNewsFeed() {
  return useInfiniteQuery(["posts", "news-feed"], {
    queryFn: ({ pageParam = 0 }) =>
      postsService.getNewsFeed({ offset: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) =>
      lastPage.data.metadata.pagination.nextOffset,
    staleTime: 1000 * 60 * 5,
  });
}
