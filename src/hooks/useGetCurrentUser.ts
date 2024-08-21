import { useApiClient } from "@/contexts/api-client.context";
import { useAuth } from "@/contexts/auth.context";
import { useToken } from "@/contexts/token.context";
import { useQuery } from "react-query";

export function useGetCurrentUser() {
  const { usersService } = useApiClient();
  const { setUser } = useAuth();
  const { refreshToken } = useToken();

  return useQuery("current-user", {
    queryFn: () => usersService().getCurrentUser(),
    select: (data) => data.data.user,
    onSuccess: (data) => setUser(data),
    enabled: !!refreshToken,
    staleTime: 1000 * 60 * 5,
  });
}
