import reactionsService from "@/lib/api/services/reactions.service";
import { ReactionType } from "@/lib/api/types/reaction.type";
import { useInfiniteQuery } from "react-query";

export function useGetReactionsByCommentId(
  commentId: string,
  enable: boolean = true,
  params?: {
    type?: ReactionType;
  },
) {
  return useInfiniteQuery(["reactions", commentId, params], {
    queryFn: ({ pageParam = 0 }) =>
      reactionsService.getReactionsByCommentId(commentId, {
        offset: pageParam,
        limit: 10,
        type: params?.type,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.metadata.pagination.nextOffset,
    staleTime: 1000 * 60 * 5,
    enabled: enable,
  });
}
