import { AuthErrorCodes } from "@/lib/api/services/auth.service";
import {
  GetProfileResponse,
  ProfileEndpoints,
} from "@/lib/api/services/profile.service";
import { AccessTokenPayload } from "@/lib/api/types/auth.type";
import { HttpStatusCode } from "axios";
import { jwtDecode } from "jwt-decode";
import {
  DefaultBodyType,
  http,
  HttpResponse,
  PathParams,
  StrictRequest,
} from "msw";
import { generateUser } from "../generators";
import { User } from "@/lib/api/types/user.type";
import { users } from "../data";

async function isAuthenticated<T extends DefaultBodyType>(
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

  let user = users[decoded.userId] || generateUser({ id: decoded.userId });
  users[decoded.userId] = user;

  return user;
}

export const profileHandlers = [
  http.get<PathParams, {}, GetProfileResponse, ProfileEndpoints.GetProfile>(
    ProfileEndpoints.GetProfile,
    async ({ request }) => {
      const user = await isAuthenticated(request);

      return HttpResponse.json({
        user: user,
      });
    },
  ),
];
