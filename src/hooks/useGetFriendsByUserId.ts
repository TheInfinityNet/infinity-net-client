import { useApiClient } from "@/contexts/api-client.context";
import { useInfiniteQuery } from "react-query";

export function useGetFriendsByUserId(
  userId: string,
  params?: {
    query: string;
  },
) {
  const { friendsService } = useApiClient();

  return useInfiniteQuery(["friends", userId, params?.query], {
    queryFn: ({ pageParam = 0 }) =>
      friendsService().getFriendsByUserId(userId, {
        offset: pageParam,
        limit: 10,
        query: params?.query,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.metadata.pagination.nextOffset,
    staleTime: 1000 * 60 * 5,
  });
}
