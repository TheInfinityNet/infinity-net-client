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

export enum SignUpErrorCodes {
  ValidationError = "auth/validation-error",
  EmailAlreadyInUse = "auth/email-already-in-use",
  WeakPassword = "auth/weak-password",
  InvalidEmail = "auth/invalid-email",
  PasswordMismatch = "auth/password-mismatch",
  TermsNotAccepted = "auth/terms-not-accepted",
  RateLimitExceeded = "auth/rate-limit-exceeded",
}

export type SignUpErrorResponse =
  | {
      errorCode:
        | SignUpErrorCodes.ValidationError
        | SignUpErrorCodes.EmailAlreadyInUse
        | SignUpErrorCodes.WeakPassword
        | SignUpErrorCodes.InvalidEmail
        | SignUpErrorCodes.PasswordMismatch
        | SignUpErrorCodes.TermsNotAccepted;
      message: string;
      errors: ValidationErrors<SignUpRequest>;
    }
  | {
      errorCode: SignUpErrorCodes.RateLimitExceeded;
      message: string;
    };

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};

export enum RefreshTokenErrorCodes {
  TokenExpired = "auth/token-expired",
  InvalidToken = "auth/invalid-token",
  TokenRevoked = "auth/token-revoked",
  UserNotFound = "auth/user-not-found",
  TokenBlacklisted = "auth/token-blacklisted",
  InvalidSignature = "auth/invalid-signature",
  RateLimitExceeded = "auth/rate-limit-exceeded",
}

export type RefreshTokenErrorResponse = {
  errorCode:
    | RefreshTokenErrorCodes.TokenExpired
    | RefreshTokenErrorCodes.InvalidToken
    | RefreshTokenErrorCodes.TokenRevoked
    | RefreshTokenErrorCodes.UserNotFound
    | RefreshTokenErrorCodes.TokenBlacklisted
    | RefreshTokenErrorCodes.InvalidSignature
    | RefreshTokenErrorCodes.RateLimitExceeded;
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
