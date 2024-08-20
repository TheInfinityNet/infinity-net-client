import { createContext, ReactNode, useContext, useMemo } from "react";
import { useAxios } from "./axios.context";
import { AuthService } from "@/services/auth.service";

type ApiClientContextType = {
  authService: () => AuthService;
};

const ApiClientContext = createContext<ApiClientContextType | null>(null);

export function ApiClientProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();

  const value = useMemo(
    () => ({
      authService: () => AuthService.getInstance(axios),
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
