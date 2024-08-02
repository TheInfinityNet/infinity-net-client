import { User } from "../types/user.type";
import apiClient from "../api-client";
import { ValidationErrors } from "../types/api.type";
import { AuthErrorCodes } from "./auth.service";

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

export type UpdateProfileRequest = {
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
      errors: ValidationErrors<UpdateProfileRequest>;
    }
  | {
      errorCode: ProfileErrorCodes.RateLimitExceeded;
      message: string;
    };

const getProfile = () =>
  apiClient.get<GetProfileResponse>(ProfileEndpoints.GetProfile);

const updateProfile = (data: UpdateProfileRequest) =>
  apiClient.put<UpdateProfileResponse>(ProfileEndpoints.UpdateProfile, data);

export default {
  getProfile,
  updateProfile,
};
