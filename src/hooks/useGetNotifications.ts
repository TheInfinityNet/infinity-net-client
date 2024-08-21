import { useApiClient } from "@/contexts/api-client.context";
import { useInfiniteQuery } from "react-query";

export function useGetNotifications() {
  const { notificationsService } = useApiClient();
  return useInfiniteQuery(["notifications"], {
    queryFn: ({ pageParam = 0 }) =>
      notificationsService().getNotifications({
        offset: pageParam,
        limit: 10,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.metadata.pagination.nextOffset,
    staleTime: 1000 * 60 * 5,
  });
}
