import postsService from "@/lib/api/services/posts.service";
import { useInfiniteQuery } from "react-query";

export function useGetNewsFeed() {
  const userId = "news-feed";
  return useInfiniteQuery(["posts", userId], {
    queryFn: ({ pageParam = 0 }) =>
      postsService.getNewsFeed({ offset: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) =>
      lastPage.data.metadata.pagination.nextOffset,
  });
}
