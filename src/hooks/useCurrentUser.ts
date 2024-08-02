import profileService from "@/lib/api/services/profile.service";
import { useUserStore } from "@/stores/user.store";
import { useQuery } from "react-query";

export function useCurrentUser() {
  const setUser = useUserStore((state) => state.setUser);

  return useQuery("currentUser", {
    queryFn: profileService.getProfile,
    onSuccess: (data) => {
      const { user } = data.data;
      setUser(user);
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: true,
  });
}
