import { User } from "../types/user.type";
import { ValidationErrors } from "../types/api.type";
import { AuthErrorCodes } from "./auth.type";

export enum ProfileEndpoints {
  GetProfile = "/profile",
  UpdateProfile = "/profile/update",
}

export enum ProfileErrorCodes {
  ValidationError = "profile/validation-error",
  EmailAlreadyInUse = "profile/email-already-in-use",
  InvalidEmail = "profile/invalid-email",
  RateLimitExceeded = "profile/rate-limit-exceeded",
}

export type GetProfileResponse = {
  user: User;
};

export type GetProfileErrorResponse = {
  errorCode:
    | AuthErrorCodes.TokenInvalid
    | AuthErrorCodes.TokenExpired
    | AuthErrorCodes.TokenBlacklisted
    | AuthErrorCodes.TokenRevoked
    | AuthErrorCodes.InvalidSignature
    | AuthErrorCodes.TooManyRequests
    | AuthErrorCodes.RateLimitExceeded
    | AuthErrorCodes.UserNotFound
    | AuthErrorCodes.UserDisabled;
  message: string;
};

export type UpdateProfileInput = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  mobileNumber?: string;
  birthdate?: string;
  gender?: string;
};

export type UpdateProfileResponse = {
  user: User;
};

export type ProfileErrorResponse =
  | {
      errorCode:
        | ProfileErrorCodes.ValidationError
        | ProfileErrorCodes.EmailAlreadyInUse
        | ProfileErrorCodes.InvalidEmail;
      message: string;
      errors: ValidationErrors<UpdateProfileInput>;
    }
  | {
      errorCode: ProfileErrorCodes.RateLimitExceeded;
      message: string;
    };
