import { useApiClient } from "@/contexts/api-client.context";
import { useInfiniteQuery } from "react-query";

export function useGetCommentsByPostId(postId: string, enable: boolean = true) {
  const { commentsService } = useApiClient();

  return useInfiniteQuery(["comments", postId], {
    queryFn: ({ pageParam = 0 }) =>
      commentsService().getCommentsByPostId(postId, {
        offset: pageParam,
        limit: 10,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.metadata.pagination.nextOffset,
    staleTime: 1000 * 60 * 5,
    enabled: enable,
  });
}
