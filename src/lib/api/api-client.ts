import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth.store";
import authService from "./services/auth.service";
import { getAccessTokenState, getRefreshTokenState } from "../utils";
import { AccessTokenState, RefreshTokenState } from "./types/auth.type";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (config.headers["No-Auth"] === undefined) {
      const { accessToken, refreshToken } = useAuthStore.getState();

      const accessTokenState = getAccessTokenState(accessToken);
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
