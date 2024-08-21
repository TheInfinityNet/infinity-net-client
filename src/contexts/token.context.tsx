import { getAccessTokenState } from "@/lib/utils";
import { AccessTokenState } from "@/types/token.type";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useApiClient } from "./api-client.context";

const REFRESH_TOKEN_KEY = "refreshToken";

type TokenContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
  getAccessToken: () => Promise<string | null>;
};

const TokenContext = createContext<TokenContextType | null>(null);

export function TokenProvider({ children }: { children: ReactNode }) {
  const { authService } = useApiClient();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem(REFRESH_TOKEN_KEY),
  );

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }, [refreshToken]);

  const getAccessToken = async () => {
    const accessTokenState = getAccessTokenState(accessToken);

    if (accessTokenState === AccessTokenState.Valid) return accessToken;

    const refreshAccessToken = async () => {
      if (!refreshToken) return null;
      const response = await authService().refreshToken({ refreshToken });
      return response.data.accessToken;
    };

    if (
      accessTokenState === AccessTokenState.NeedsRefreshSerial ||
      accessTokenState === AccessTokenState.Unset ||
      accessTokenState === AccessTokenState.Expired
    ) {
      const newAccessToken = await refreshAccessToken();
      return newAccessToken || accessToken;
    } else if (accessTokenState === AccessTokenState.NeedsRefreshParallel) {
      refreshAccessToken().then(setAccessToken);
    }

    return accessToken;
  };

  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      getAccessToken,
      setAccessToken,
      setRefreshToken,
    }),
    [accessToken, refreshToken],
  );

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useToken must be used within a TokenProvider");
  return context;
}
