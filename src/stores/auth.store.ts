import { createStore } from "zustand";

const REFRESH_TOKEN_KEY = "refreshToken";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  setRefreshToken: (token: string) => void;
  clearRefreshToken: () => void;
};

export const useAuthStore = createStore<AuthState>((set) => ({
  accessToken: null,
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || null,

  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),

  setRefreshToken: (token) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
    set({ refreshToken: token });
  },
  clearRefreshToken: () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    set({ refreshToken: null });
  },
}));
