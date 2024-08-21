import { createContext, ReactNode, useContext, useMemo } from "react";
import { useAxios } from "./axios.context";
import { AuthService } from "@/services/auth.service";
import { UsersService } from "@/services/users.service";
import { ProfileService } from "@/services/profile.service";
import { PostsService } from "@/services/posts.service";

type ApiClientContextType = {
  authService: () => AuthService;
  usersService: () => UsersService;
  profileService: () => ProfileService;
  postsService: () => PostsService;
};

const ApiClientContext = createContext<ApiClientContextType | null>(null);

export function ApiClientProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();

  const value = useMemo(
    () => ({
      authService: () => AuthService.getInstance(axios),
      usersService: () => UsersService.getInstance(axios),
      profileService: () => ProfileService.getInstance(axios),
      postsService: () => PostsService.getInstance(axios),
    }),
    [axios],
  );

  return (
    <ApiClientContext.Provider value={value}>
      {children}
    </ApiClientContext.Provider>
  );
}

export const useApiClient = () => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error("useApiClient must be used within an ApiClientProvider");
  }
  return context;
};
