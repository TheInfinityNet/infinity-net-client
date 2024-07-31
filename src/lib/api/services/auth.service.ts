import { User } from "../types/user.type";
import apiClient, { ValidationErrors } from "../api-client";

export enum AuthEndpoints {
  SignIn = "/auth/signin",
  SignUp = "/auth/signup",
  SignOut = "/auth/signout",
  RefreshToken = "/auth/refresh",
  SendEmailVerification = "/auth/send-email-verification",
  VerifyEmailByCode = "/auth/verify-email-by-code",
  VerifyEmailByToken = "/auth/verify-email-by-token",
  SendForgotPassword = "/auth/send-forgot-password",
  ForgotPassword = "/auth/forgot-password",
  ResetPassword = "/auth/reset-password",
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

  // Verification Errors
  CodeInvalid = "auth/code-invalid",

  // User Errors
  UserDisabled = "auth/user-disabled",
  UserNotFound = "auth/user-not-found",
  EmailAlreadyInUse = "auth/email-already-in-use",
  UserAlreadyVerified = "auth/user-already-verified",

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
  middleName?: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  mobileNumber: string;
  birthdate: string;
  gender: string;
  acceptTerms: boolean;
};
export type SignUpResponse = {
  message: string;
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

export type SignOutResponse = void;

export type SendEmailVerificationRequest = {
  email: string;
};
export type SendEmailVerificationResponse = {
  message: string;
  retryAfter: number;
};
export type SendEmailVerificationErrorResponse =
  | {
      errorCode: AuthErrorCodes.ValidationError | AuthErrorCodes.InvalidEmail;
      errors: ValidationErrors<SendEmailVerificationRequest>;
    }
  | {
      errorCode:
        | AuthErrorCodes.UserNotFound
        | AuthErrorCodes.UserAlreadyVerified
        | AuthErrorCodes.TooManyRequests
        | AuthErrorCodes.RateLimitExceeded;
      message: string;
    };

export type VerifyEmailByCodeRequest = {
  email: string;
  code: string;
};
export type VerifyEmailByCodeResponse = {
  message: string;
};
export type VerifyEmailByCodeErrorResponse =
  | {
      errorCode:
        | AuthErrorCodes.ValidationError
        | AuthErrorCodes.InvalidEmail
        | AuthErrorCodes.CodeInvalid;
      errors: ValidationErrors<VerifyEmailByCodeRequest>;
    }
  | {
      errorCode:
        | AuthErrorCodes.UserNotFound
        | AuthErrorCodes.TooManyRequests
        | AuthErrorCodes.RateLimitExceeded;
      message: string;
    };

export type VerifyEmailByTokenRequest = {
  token: string;
};
export type VerifyEmailByTokenResponse = {
  message: string;
};
export type VerifyEmailByTokenErrorResponse =
  | {
      errorCode: AuthErrorCodes.ValidationError;
      errors: ValidationErrors<VerifyEmailByTokenRequest>;
    }
  | {
      errorCode:
        | AuthErrorCodes.TokenInvalid
        | AuthErrorCodes.TokenExpired
        | AuthErrorCodes.TokenRevoked;
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

const signOut = () => apiClient.delete<SignOutResponse>(AuthEndpoints.SignOut);

const refreshToken = (data: RefreshTokenRequest) =>
  apiClient.post<RefreshTokenResponse>(AuthEndpoints.RefreshToken, data, {
    headers: { "No-Auth": true },
  });

const sendEmailVerification = (data: SendEmailVerificationRequest) =>
  apiClient.post<SendEmailVerificationResponse>(
    AuthEndpoints.SendEmailVerification,
    data,
    {
      headers: { "No-Auth": true },
    },
  );

const verifyEmailByCode = (data: VerifyEmailByCodeRequest) =>
  apiClient.post<VerifyEmailByCodeResponse>(
    AuthEndpoints.VerifyEmailByCode,
    data,
    {
      headers: { "No-Auth": true },
    },
  );

const verifyEmailByToken = (data: VerifyEmailByTokenRequest) =>
  apiClient.post<VerifyEmailByTokenResponse>(
    AuthEndpoints.VerifyEmailByToken,
    data,
    {
      headers: { "No-Auth": true },
    },
  );

export default {
  signIn,
  signUp,
  signOut,
  refreshToken,
  sendEmailVerification,
  verifyEmailByCode,
  verifyEmailByToken,
};
