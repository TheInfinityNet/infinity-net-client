import { AxiosResponse, HttpStatusCode } from "axios";
import apiClient, {
  BadRequestResponse,
  ForbiddenResponse,
  LockedResponse,
  PreconditionFailedResponse,
  PreconditionRequiredResponse,
  Response,
  UnauthorizedResponse,
  UnprocessableEntityResponse,
} from "../api-client";
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

export type SignInResponse = Response<
  HttpStatusCode.Ok,
  {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: User;
  }
>;

export type SignInErrorResponse =
  | UnprocessableEntityResponse<SignInRequest>
  | BadRequestResponse
  | UnauthorizedResponse
  | ForbiddenResponse
  | LockedResponse
  | PreconditionRequiredResponse;

export type SignUpRequest = {
  email: string;
  password: string;
  name: string;
};

export type SignUpResponse = Response<
  HttpStatusCode.Created,
  {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: User;
  }
>;

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};

const signIn = (data: SignInRequest) =>
  apiClient.post<AxiosResponse<SignInResponse>>({
    url: AuthEndpoints.SignIn,
    data,
    headers: { "No-Auth": true },
  });

const signUp = (data: SignUpRequest) =>
  apiClient.post<AxiosResponse<SignUpResponse>>({
    url: AuthEndpoints.SignUp,
    data,
    headers: { "No-Auth": true },
  });

const signOut = () =>
  apiClient.delete<void>({
    url: AuthEndpoints.SignOut,
  });

const refreshToken = (data: RefreshTokenRequest) =>
  apiClient.post<AxiosResponse<RefreshTokenResponse>>({
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
