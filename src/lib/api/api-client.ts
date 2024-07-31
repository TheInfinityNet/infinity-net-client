import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { jwtDecode } from "jwt-decode";
import { AccessTokenPayload } from "./types/auth.type";
import authService from "./services/auth.service";

export type ValidationErrors<T> = {
  [K in keyof T]?: string[];
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

enum AccessTokenState {
  Expired = "Expired",
  NeedsRefreshParallel = "NeedsRefreshParallel",
  NeedsRefreshSerial = "NeedsRefreshSerial",
  Valid = "Valid",
}

enum RefreshTokenState {
  Expired = "Expired",
  Valid = "Valid",
}

const getTokenState = (token: string | null): AccessTokenState => {
  if (!token) {
    return AccessTokenState.Expired;
  }
  const tokenPayload = jwtDecode<AccessTokenPayload>(token);
  if (!tokenPayload.exp) {
    return AccessTokenState.Expired;
  }
  const currentTime = Date.now();
  const tokenExpiry = tokenPayload.exp * 1000;
  const timeLeft = tokenExpiry - currentTime;

  if (timeLeft <= 0) {
    return AccessTokenState.Expired;
  } else if (timeLeft <= 1 * 60 * 1000) {
    return AccessTokenState.NeedsRefreshSerial;
  } else if (timeLeft <= 5 * 60 * 1000) {
    return AccessTokenState.NeedsRefreshParallel;
  } else {
    return AccessTokenState.Valid;
  }
};

const getRefreshTokenState = (token: string | null): RefreshTokenState => {
  if (!token) {
    return RefreshTokenState.Expired;
  }
  const tokenPayload = jwtDecode<AccessTokenPayload>(token);
  if (!tokenPayload.exp) {
    return RefreshTokenState.Expired;
  }
  return tokenPayload.exp * 1000 > Date.now()
    ? RefreshTokenState.Valid
    : RefreshTokenState.Expired;
};

apiClient.interceptors.request.use(
  async (config) => {
    if (config.headers["No-Auth"] === undefined) {
      const { accessToken, refreshToken } = useAuthStore.getState();

      const accessTokenState = getTokenState(accessToken);
      const refreshTokenState = getRefreshTokenState(refreshToken);

      const refreshAccessToken = async () => {
        if (!refreshToken) {
          return null;
        }
        const response = await authService.refreshToken({ refreshToken });
        const newAccessToken = response.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);
        return newAccessToken;
      };

      let newAccessToken: string | null = null;

      switch (refreshTokenState) {
        case RefreshTokenState.Expired:
          newAccessToken = null;
          break;
        case RefreshTokenState.Valid:
          switch (accessTokenState) {
            case AccessTokenState.Expired:
            case AccessTokenState.NeedsRefreshSerial:
              newAccessToken = await refreshAccessToken();
              break;
            case AccessTokenState.NeedsRefreshParallel:
              refreshAccessToken();
              break;
            case AccessTokenState.Valid:
              newAccessToken = accessToken;
              break;
          }
          break;
      }

      if (newAccessToken) {
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } else {
        useAuthStore.getState().clearAccessToken();
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default apiClient;
