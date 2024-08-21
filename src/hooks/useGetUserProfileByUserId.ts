import { useApiClient } from "@/contexts/api-client.context";
import { useQuery } from "react-query";

export function useGetUserProfileByUserId({ userId }: { userId: string }) {
  const { usersService } = useApiClient();
  return useQuery(["user-profile", userId], {
    queryFn: () => usersService().getUserProfileByUserId({ userId }),
    enabled: !!userId,
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
  });
}
