import usersService from "@/lib/api/services/users.service";
import { useQuery } from "react-query";

export function useGetUserProfileByUserId({ userId }: { userId: string }) {
  return useQuery(["user-profile", userId], {
    queryFn: () => usersService.getUserProfileByUserId({ userId }),
    enabled: !!userId,
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
  });
}
