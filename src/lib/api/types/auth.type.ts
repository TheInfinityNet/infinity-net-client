import { type JwtPayload } from "jwt-decode";

export type AccessTokenPayload = {
  userId: string;
  sessionId: string;
} & JwtPayload;

export type RefreshTokenPayload = {
  userId: string;
  sessionId: string;
} & JwtPayload;
