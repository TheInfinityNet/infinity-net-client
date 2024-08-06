import commentsService from "@/lib/api/services/comments.service";
import { useInfiniteQuery } from "react-query";

export function useGetRepliesByCommentId(
  commentId: string,
  enable: boolean = true,
) {
  return useInfiniteQuery(["comments", commentId], {
    queryFn: ({ pageParam = 0 }) =>
      commentsService.getRepliesByCommentId(commentId, {
        offset: pageParam,
        limit: 10,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.metadata.pagination.nextOffset,
    staleTime: 1000 * 60 * 5,
    enabled: enable,
  });
}
