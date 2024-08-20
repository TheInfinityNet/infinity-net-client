import { type JwtPayload } from "jwt-decode";

export enum AccessTokenState {
  Expired = "Expired",
  NeedsRefreshParallel = "NeedsRefreshParallel",
  NeedsRefreshSerial = "NeedsRefreshSerial",
  Valid = "Valid",
}

export enum RefreshTokenState {
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
