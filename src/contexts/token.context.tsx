import { createContext, ReactNode, useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useApiClient } from "./api-client.context";
import { getAccessTokenState } from "@/lib/utils";
import { AccessTokenState } from "@/types/token.type";

const REFRESH_TOKEN_KEY = "refreshToken";

type TokenContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  getAccessToken: () => Promise<string | null>;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
};

const TokenContext = createContext<TokenContextType | null>(null);

export function TokenProvider({ children }: { children: ReactNode }) {
  const { authService } = useApiClient();
  const queryClient = useQueryClient();

  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  let refreshTokenPromise: Promise<string | null> | null = null;

  const refreshTokenMutation = useMutation(
    async () => {
      if (!refreshToken) throw new Error("No refresh token");
      const response = await authService().refreshToken({ refreshToken });
      return response.data.accessToken;
    },
    {
      onSuccess: (newAccessToken) => {
        setAccessToken(newAccessToken);
        queryClient.invalidateQueries("accessToken");
        refreshTokenPromise = null;
      },
      onError: () => {
        refreshTokenPromise = null;
      },
    }
  );

  const getAccessToken = async () => {
    const accessTokenState = getAccessTokenState(accessToken);

    if (accessTokenState === AccessTokenState.Valid) return accessToken;

    if (
      accessTokenState === AccessTokenState.NeedsRefreshSerial ||
      accessTokenState === AccessTokenState.Unset ||
      accessTokenState === AccessTokenState.Expired
    ) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenMutation.mutateAsync();
      }
      return await refreshTokenPromise;
    }

    return accessToken;
  };

  const value = {
    accessToken,
    refreshToken,
    getAccessToken,
    setAccessToken,
    setRefreshToken: (token: string | null) => {
      localStorage.setItem(REFRESH_TOKEN_KEY, token ?? "");
    },
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useToken must be used within a TokenProvider");
  return context;
}

