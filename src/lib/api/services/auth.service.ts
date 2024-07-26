import apiClient from "../api-client";
import { User } from "../types/user.type";

export enum AuthEndpoints {
  SignIn = "/auth/signin",
  SignUp = "/auth/signup",
  SignOut = "/auth/signout",
  RefreshToken = "/auth/refresh",
}

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: User;
};

export type SignUpRequest = {
  email: string;
  password: string;
  name: string;
};

export type SignUpResponse = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: User;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};

const signIn = (data: SignInRequest) =>
  apiClient.post<SignInResponse>({
    url: AuthEndpoints.SignIn,
    data,
    headers: { "No-Auth": true },
  });

const signUp = (data: SignUpRequest) =>
  apiClient.post<SignUpResponse>({
    url: AuthEndpoints.SignUp,
    data,
    headers: { "No-Auth": true },
  });

const signOut = () =>
  apiClient.delete<void>({
    url: AuthEndpoints.SignOut,
  });

const refreshToken = (data: RefreshTokenRequest) =>
  apiClient.post<RefreshTokenResponse>({
    url: AuthEndpoints.RefreshToken,
    data,
    headers: { "No-Auth": true },
  });

export default {
  signIn,
  signUp,
  signOut,
  refreshToken,
};
