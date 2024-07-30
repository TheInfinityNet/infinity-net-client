import { User } from "../types/user.type";
import apiClient, { ValidationErrors } from "../api-client";

export enum AuthEndpoints {
  SignIn = "/auth/signin",
  SignUp = "/auth/signup",
  SignOut = "/auth/signout",
  RefreshToken = "/auth/refresh",
}

export enum AuthErrorCodes {
  // Validation Errors
  ValidationError = "auth/validation-error",
  InvalidEmail = "auth/invalid-email",
  WeakPassword = "auth/weak-password",
  PasswordMismatch = "auth/password-mismatch",
  TermsNotAccepted = "auth/terms-not-accepted",

  // Authentication Errors
  WrongPassword = "auth/wrong-password",
  ExpiredPassword = "auth/expired-password",
  TwoFactorRequired = "auth/two-factor-required",

  // Token Errors
  TokenInvalid = "auth/token-invalid",
  TokenExpired = "auth/token-expired",
  InvalidToken = "auth/invalid-token",
  TokenRevoked = "auth/token-revoked",
  TokenBlacklisted = "auth/token-blacklisted",
  InvalidSignature = "auth/invalid-signature",

  // User Errors
  UserDisabled = "auth/user-disabled",
  UserNotFound = "auth/user-not-found",
  EmailAlreadyInUse = "auth/email-already-in-use",

  // Rate Limiting Errors
  TooManyRequests = "auth/too-many-requests",
  RateLimitExceeded = "auth/rate-limit-exceeded",
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

export type SignInErrorResponse =
  | {
      errorCode:
        | AuthErrorCodes.ValidationError
        | AuthErrorCodes.InvalidEmail
        | AuthErrorCodes.WrongPassword
        | AuthErrorCodes.ExpiredPassword;
      message: string;
      errors: ValidationErrors<SignInRequest>;
    }
  | {
      errorCode:
        | AuthErrorCodes.UserDisabled
        | AuthErrorCodes.UserNotFound
        | AuthErrorCodes.TooManyRequests
        | AuthErrorCodes.TwoFactorRequired
        | AuthErrorCodes.TokenInvalid;
      message: string;
    };

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  mobileNumber: string;
  birthdate: string;
  gender: string;
  termsAccepted: boolean;
};

export type SignUpResponse = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: User;
};

export type SignUpErrorResponse =
  | {
      errorCode:
        | AuthErrorCodes.ValidationError
        | AuthErrorCodes.EmailAlreadyInUse
        | AuthErrorCodes.WeakPassword
        | AuthErrorCodes.InvalidEmail
        | AuthErrorCodes.PasswordMismatch
        | AuthErrorCodes.TermsNotAccepted;
      message: string;
      errors: ValidationErrors<SignUpRequest>;
    }
  | {
      errorCode: AuthErrorCodes.RateLimitExceeded;
      message: string;
    };

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};
export type RefreshTokenErrorResponse = {
  errorCode:
    | AuthErrorCodes.TokenExpired
    | AuthErrorCodes.InvalidToken
    | AuthErrorCodes.TokenRevoked
    | AuthErrorCodes.UserNotFound
    | AuthErrorCodes.TokenBlacklisted
    | AuthErrorCodes.InvalidSignature
    | AuthErrorCodes.RateLimitExceeded;
  message: string;
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
