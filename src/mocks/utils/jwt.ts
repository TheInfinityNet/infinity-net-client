import { User } from "@/types/user.type";
import { HttpStatusCode } from "axios";
import { jwtDecode } from "jwt-decode";
const JWT_SECRET = "secret";
import sign from "jwt-encode";
import { DefaultBodyType, HttpResponse, StrictRequest } from "msw";
import { generateUser } from "../generators";
import { users } from "../data";
import { AccessTokenPayload, RefreshTokenPayload } from "@/types/token.type";
import { AuthErrorCodes } from "@/types/auth.type";

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

export async function isAuthenticated<T extends DefaultBodyType>(
  request: StrictRequest<T>,
): Promise<User> {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    throw HttpResponse.json(
      {
        errorCode: AuthErrorCodes.TokenMissing,
        message: "Token is missing",
      },
      {
        status: HttpStatusCode.Unauthorized,
      },
    );
  }

  const decoded = jwtDecode<AccessTokenPayload>(token);

  if (!decoded || !decoded.exp) {
    throw HttpResponse.json(
      {
        errorCode: AuthErrorCodes.TokenInvalid,
        message: "Token is invalid",
      },
      {
        status: HttpStatusCode.Unauthorized,
      },
    );
  }

  if (decoded.exp * 1000 < Date.now()) {
    throw HttpResponse.json(
      {
        errorCode: AuthErrorCodes.TokenExpired,
        message: "Token is expired",
      },
      {
        status: HttpStatusCode.Unauthorized,
      },
    );
  }

  const user = users[decoded.userId] || generateUser({ id: decoded.userId });
  users[decoded.userId] = user;

  return user;
}
