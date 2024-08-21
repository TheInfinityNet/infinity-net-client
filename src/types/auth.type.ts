import { ValidationErrors } from "@/types/api.type";
import { User } from "./user.type";
import { z } from "zod";
import { SignInSchema, SignUpSchema } from "@/contracts/auth.contract";

export enum AuthEndpoints {
  SignIn = "/auth/signin",
  SignUp = "/auth/signup",
  SignOut = "/auth/signout",
  RefreshToken = "/auth/refresh",
  SendEmailVerification = "/auth/send-email-verification",
  VerifyEmailByCode = "/auth/verify-email-by-code",
  VerifyEmailByToken = "/auth/verify-email-by-token",
  SendEmailForgotPassword = "/auth/send-forgot-password",
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
  TokenMissing = "auth/token-missing",
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

export type SignInInput = z.infer<typeof SignInSchema>;
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
      errors: ValidationErrors<SignInInput>;
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

export type SignUpInput = z.infer<typeof SignUpSchema>;
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
      errors: ValidationErrors<SignUpInput>;
    }
  | {
      errorCode: AuthErrorCodes.RateLimitExceeded;
      message: string;
    };

export type RefreshTokenInput = {
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

export type SignOutInput = {
  refreshToken: string;
  accessToken?: string;
};
export type SignOutResponse = {
  message: string;
};
export type SignOutErrorResponse = {
  errorCode: AuthErrorCodes.TokenInvalid | AuthErrorCodes.TokenRevoked;
  message: string;
};

export type SendEmailVerificationInput = {
  email: string;
};
export type SendEmailVerificationResponse = {
  message: string;
  retryAfter: number;
};
export type SendEmailVerificationErrorResponse =
  | {
      errorCode: AuthErrorCodes.ValidationError | AuthErrorCodes.InvalidEmail;
      errors: ValidationErrors<SendEmailVerificationInput>;
    }
  | {
      errorCode:
        | AuthErrorCodes.UserNotFound
        | AuthErrorCodes.UserAlreadyVerified
        | AuthErrorCodes.TooManyRequests
        | AuthErrorCodes.RateLimitExceeded;
      message: string;
    };

export type VerifyEmailByCodeInput = {
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
      errors: ValidationErrors<VerifyEmailByCodeInput>;
    }
  | {
      errorCode:
        | AuthErrorCodes.UserNotFound
        | AuthErrorCodes.TooManyRequests
        | AuthErrorCodes.RateLimitExceeded;
      message: string;
    };

export type VerifyEmailByTokenInput = {
  token: string;
};
export type VerifyEmailByTokenResponse = {
  message: string;
};
export type VerifyEmailByTokenErrorResponse =
  | {
      errorCode: AuthErrorCodes.ValidationError;
      errors: ValidationErrors<VerifyEmailByTokenInput>;
    }
  | {
      errorCode:
        | AuthErrorCodes.TokenInvalid
        | AuthErrorCodes.TokenExpired
        | AuthErrorCodes.TokenRevoked;
      message: string;
    };

export type SendEmailForgotPasswordInput = {
  email: string;
};
export type SendEmailForgotPasswordResponse = {
  message: string;
  retryAfter: number;
};
export type SendEmailForgotPasswordErrorResponse =
  | {
      errorCode: AuthErrorCodes.ValidationError | AuthErrorCodes.InvalidEmail;
      errors: ValidationErrors<SendEmailForgotPasswordInput>;
    }
  | {
      errorCode:
        | AuthErrorCodes.UserNotFound
        | AuthErrorCodes.TooManyRequests
        | AuthErrorCodes.RateLimitExceeded;
      message: string;
    };

export type ForgotPasswordInput = {
  email: string;
  code: string;
};
export type ForgotPasswordResponse = {
  message: string;
  token: string;
};
export type ForgotPasswordErrorResponse =
  | {
      errorCode:
        | AuthErrorCodes.ValidationError
        | AuthErrorCodes.InvalidEmail
        | AuthErrorCodes.CodeInvalid;
      errors: ValidationErrors<ForgotPasswordInput>;
    }
  | {
      errorCode:
        | AuthErrorCodes.UserNotFound
        | AuthErrorCodes.TooManyRequests
        | AuthErrorCodes.RateLimitExceeded;
      message: string;
    };

export type ResetPasswordInput = {
  token: string;
  password: string;
  passwordConfirmation: string;
};
export type ResetPasswordResponse = {
  message: string;
};
export type ResetPasswordErrorResponse =
  | {
      errorCode: AuthErrorCodes.ValidationError;
      errors: ValidationErrors<ResetPasswordInput>;
    }
  | {
      errorCode:
        | AuthErrorCodes.TokenInvalid
        | AuthErrorCodes.TokenExpired
        | AuthErrorCodes.TokenRevoked;
      message: string;
    };
