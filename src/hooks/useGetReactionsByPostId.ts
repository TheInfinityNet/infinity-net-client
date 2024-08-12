import reactionsService from "@/lib/api/services/reactions.service";
import { useInfiniteQuery } from "react-query";

export function useGetReactionsByPostId(
  postId: string,
  enable: boolean = true,
) {
  return useInfiniteQuery(["reactions", postId], {
    queryFn: ({ pageParam = 0 }) =>
      reactionsService.getReactionsByPostId(postId, {
        offset: pageParam,
        limit: 10,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.metadata.pagination.nextOffset,
    staleTime: 1000 * 60 * 5,
    enabled: enable,
  });
}
