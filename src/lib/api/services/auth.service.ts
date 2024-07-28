import { User } from "../types/user.type";
import apiClient, { ValidationErrors } from "../api-client";

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

export enum SignInErrorCodes {
  ValidationError = "auth/validation-error",
  InvalidEmail = "auth/invalid-email",
  WrongPassword = "auth/wrong-password",
  UserDisabled = "auth/user-disabled",
  UserNotFound = "auth/user-not-found",
  TooManyRequests = "auth/too-many-requests",
  ExpiredPassword = "auth/expired-password",
  TwoFactorRequired = "auth/two-factor-required",
  TokenInvalid = "auth/token-invalid",
}

export type SignInErrorResponse =
  | {
      errorCode:
        | SignInErrorCodes.ValidationError
        | SignInErrorCodes.InvalidEmail
        | SignInErrorCodes.WrongPassword
        | SignInErrorCodes.ExpiredPassword;
      message: string;
      errors: ValidationErrors<SignInRequest>;
    }
  | {
      errorCode:
        | SignInErrorCodes.UserDisabled
        | SignInErrorCodes.UserNotFound
        | SignInErrorCodes.TooManyRequests
        | SignInErrorCodes.TwoFactorRequired
        | SignInErrorCodes.TokenInvalid;
      message: string;
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
  apiClient.post<SignInResponse>(AuthEndpoints.SignIn, data, {
    headers: { "No-Auth": true },
  });

const signUp = (data: SignUpRequest) =>
  apiClient.post<SignUpResponse>(AuthEndpoints.SignUp, data, {
    headers: { "No-Auth": true },
  });

const signOut = () => apiClient.delete<void>(AuthEndpoints.SignOut);

const refreshToken = (data: RefreshTokenRequest) =>
  apiClient.post<RefreshTokenResponse>(AuthEndpoints.RefreshToken, data, {
    headers: { "No-Auth": true },
  });

export default {
  signIn,
  signUp,
  signOut,
  refreshToken,
};
