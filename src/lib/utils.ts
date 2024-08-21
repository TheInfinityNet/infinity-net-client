import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import {
  AccessTokenPayload,
  AccessTokenState,
  RefreshTokenPayload,
  RefreshTokenState,
} from "@/types/token.type";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setFormError<TFieldValues extends FieldValues = FieldValues>(
  form: UseFormReturn<TFieldValues>,
  errors: Record<string, string | string[]>,
) {
  Object.entries(errors).forEach(([key, value]) => {
    const keyError = key as FieldPath<TFieldValues>;
    typeof value === "string"
      ? form.setError(keyError, { message: value })
      : form.setError(keyError, { message: value[0] });
  });
}

export const getAccessTokenState = (token: string | null): AccessTokenState => {
  if (!token) {
    return AccessTokenState.Unset;
  }
  try {
    const tokenPayload = jwtDecode<AccessTokenPayload>(token);
    if (!tokenPayload.exp) {
      return AccessTokenState.Expired;
    }
    const currentTime = Date.now();
    const tokenExpiry = tokenPayload.exp * 1000;
    const timeLeft = tokenExpiry - currentTime;

    if (timeLeft <= 0) {
      return AccessTokenState.Expired;
    } else if (timeLeft <= 1 * 60 * 1000) {
      return AccessTokenState.NeedsRefreshSerial;
    } else if (timeLeft <= 5 * 60 * 1000) {
      return AccessTokenState.NeedsRefreshParallel;
    } else {
      return AccessTokenState.Valid;
    }
  } catch {
    return AccessTokenState.Expired;
  }
};

export const getRefreshTokenState = (
  token: string | null,
): RefreshTokenState => {
  if (!token) {
    return RefreshTokenState.Unset;
  }
  try {
    const tokenPayload = jwtDecode<RefreshTokenPayload>(token);

    if (!tokenPayload.exp) {
      return RefreshTokenState.Expired;
    }
    return tokenPayload.exp * 1000 > Date.now()
      ? RefreshTokenState.Valid
      : RefreshTokenState.Expired;
  } catch {
    return RefreshTokenState.Expired;
  }
};
