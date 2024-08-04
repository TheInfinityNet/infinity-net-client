import usersService from "@/lib/api/services/users.service";
import { useQuery } from "react-query";

export function useGetUser({ userId }: { userId: string }) {
  return useQuery(["user", userId], {
    queryFn: () => usersService.getUser({ userId }),
    enabled: !!userId,
    select: (data) => data.data.user,
    staleTime: 1000 * 60 * 5,
  });
}
