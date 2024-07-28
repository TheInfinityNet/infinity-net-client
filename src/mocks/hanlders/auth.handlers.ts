import { HttpStatusCode } from "axios";
import { http, HttpResponse, PathParams } from "msw";
import {
  AuthEndpoints,
  SignInRequest,
  SignInResponse,
} from "../../lib/api/services/auth.service";

export const authHandlers = [
  http.post<PathParams, SignInRequest, SignInResponse, AuthEndpoints.SignIn>(
    AuthEndpoints.SignIn,
    async ({ request }) => {
      const { email, password } = await request.json();

      if (!email || !password) {
        return HttpResponse.json(
          {
            errors: {
              ...(email ? {} : { email: ["Email is required"] }),
              ...(password ? {} : { password: ["Password is required"] }),
            },
          },
          {
            status: HttpStatusCode.BadRequest,
          },
        );
      }

      if (email === "invalidation@infinity.net" && password === "password") {
        return HttpResponse.json(
          {
            errors: {
              email: ["Email is invalid"],
              password: ["Password is invalid"],
            },
          },
          {
            status: HttpStatusCode.UnprocessableEntity,
          },
        );
      }

      if (email === "ok@infinity.net" && password === "password") {
        return HttpResponse.json(
          {
            tokens: {
              accessToken: "access-token",
              refreshToken: "refresh-token",
            },
            user: {
              id: "user-id",
              email,
              name: "User",
            },
          },
          {
            status: HttpStatusCode.Ok,
          },
        );
      }

      if (email === "forbidden@infinity.net" && password === "password") {
        return HttpResponse.json(
          {
            message: "Your account is disabled by the administrator",
          },
          {
            status: HttpStatusCode.Forbidden,
          },
        );
      }

      if (email === "locked@infinity.net" && password === "password") {
        return HttpResponse.json(
          {
            message: "Your account is locked due to too many failed attempts",
          },
          {
            status: HttpStatusCode.Locked,
          },
        );
      }

      if (email === "inactive@infinity.net" && password === "password") {
        return HttpResponse.json(
          {
            message: "Your account is not activated",
          },
          {
            status: HttpStatusCode.Unauthorized,
          },
        );
      }

      if (email === "expired@infinity.net" && password === "password") {
        return HttpResponse.json(
          {
            message: "Your password has expired",
          },
          {
            status: HttpStatusCode.Unauthorized,
          },
        );
      }

      if (email === "2fa@infinity.net" && password === "password") {
        return HttpResponse.json(
          {
            message: "Two-factor authentication required",
          },
          {
            status: HttpStatusCode.PreconditionRequired,
          },
        );
      }

      return HttpResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    },
  ),
];
