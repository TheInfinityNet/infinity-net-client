import { type JwtPayload } from "jwt-decode";

export enum AccessTokenState {
  Unset = "Unset",
  Expired = "Expired",
  NeedsRefreshParallel = "NeedsRefreshParallel",
  NeedsRefreshSerial = "NeedsRefreshSerial",
  Valid = "Valid",
}

export enum RefreshTokenState {
  Unset = "Unset",
  Expired = "Expired",
  Valid = "Valid",
}

export type AccessTokenPayload = {
  userId: string;
  sessionId: string;
} & JwtPayload;

export type RefreshTokenPayload = {
  userId: string;
  sessionId: string;
} & JwtPayload;
