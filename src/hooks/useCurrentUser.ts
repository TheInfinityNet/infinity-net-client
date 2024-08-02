import profileService from "@/lib/api/services/profile.service";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import axios from "axios";
import { useQuery } from "react-query";

export function useCurrentUser() {
  const setUser = useUserStore((state) => state.setUser);
  const { refreshToken } = useAuthStore.getState();

  return useQuery("currentUser", {
    queryFn: profileService.getProfile,
    onSuccess: (data) => {
      const { user } = data.data;
      setUser(user);
    },
    retry(failureCount, error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return false;
        }
      }
      return failureCount <= 3;
    },
    enabled: !!refreshToken,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
}
