import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "@/lib/api/types/auth.type";
import { User } from "@/lib/api/types/user.type";
const JWT_SECRET = "secret";
import sign from "jwt-encode";

export const generateAccessToken = (user: User, sessionId: string) => {
  const payload: AccessTokenPayload = {
    userId: user.id,
    sessionId,
    exp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 minutes expiry
    aud: "https://infinity.net",
    iat: Math.floor(Date.now() / 1000),
    iss: "https://infinity.net",
    jti: `${user.id}-${sessionId}-${Date.now()}`,
    nbf: Math.floor(Date.now() / 1000),
    sub: user.id,
  };
  return sign(payload, JWT_SECRET);
};

export const generateRefreshToken = (user: User, sessionId: string) => {
  const payload: RefreshTokenPayload = {
    userId: user.id,
    sessionId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1 week expiry
    aud: "https://infinity.net",
    iat: Math.floor(Date.now() / 1000),
    iss: "https://infinity.net",
    jti: `${user.id}-${sessionId}-${Date.now()}`,
    nbf: Math.floor(Date.now() / 1000),
    sub: user.id,
  };
  return sign(payload, JWT_SECRET);
};
