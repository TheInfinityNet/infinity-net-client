import apiClient from "../api-client";
import { User } from "../types/user.type";

export enum AuthEndpoints {
  SignIn = "/auth/signin",
  SignUp = "/auth/signup",
  SignOut = "/auth/signout",
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

const signIn = (data: SignInRequest) =>
  apiClient.post<SignInResponse>({ url: AuthEndpoints.SignIn, data });

const signUp = (data: SignUpRequest) =>
  apiClient.post<SignUpResponse>({ url: AuthEndpoints.SignUp, data });

const signOut = () => apiClient.delete<void>({ url: AuthEndpoints.SignOut });

export default {
  signIn,
  signUp,
  signOut,
};
