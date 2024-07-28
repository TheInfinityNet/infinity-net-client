import { HttpStatusCode } from "axios";
import { http, HttpResponse, PathParams } from "msw";
import {
  AuthEndpoints,
  SignInErrorResponse,
  SignInRequest,
  SignInResponse,
} from "../../lib/api/services/auth.service";

export const authHandlers = [
  http.post<
    PathParams,
    SignInRequest,
    SignInResponse | SignInErrorResponse,
    AuthEndpoints.SignIn
  >(AuthEndpoints.SignIn, async ({ request }) => {
    const { email, password } = await request.json();

    if (!email || !password) {
      return HttpResponse.json(
        {
          statusCode: HttpStatusCode.UnprocessableEntity,
          data: {
            errors: {
              ...(email ? {} : { email: ["Email is required"] }),
              ...(password ? {} : { password: ["Password is required"] }),
            },
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
          statusCode: HttpStatusCode.UnprocessableEntity,
          data: {
            errors: {
              email: ["Email is invalid"],
              password: ["Password is invalid"],
            },
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
          data: {
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
          statusCode: HttpStatusCode.Ok,
        },
        {
          status: HttpStatusCode.Ok,
        },
      );
    }

    if (email === "forbidden@infinity.net" && password === "password") {
      return HttpResponse.json(
        {
          statusCode: HttpStatusCode.Forbidden,
          data: {
            message: "Your account is disabled by the administrator",
          },
        },
        {
          status: HttpStatusCode.Forbidden,
        },
      );
    }

    if (email === "locked@infinity.net" && password === "password") {
      return HttpResponse.json(
        {
          statusCode: HttpStatusCode.Locked,
          data: {
            message: "Your account is locked due to too many failed attempts",
          },
        },
        {
          status: HttpStatusCode.Locked,
        },
      );
    }

    if (email === "inactive@infinity.net" && password === "password") {
      return HttpResponse.json(
        {
          statusCode: HttpStatusCode.Unauthorized,
          data: {
            message: "Your account is not activated",
          },
        },
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }

    if (email === "expired@infinity.net" && password === "password") {
      return HttpResponse.json(
        {
          statusCode: HttpStatusCode.Unauthorized,
          data: {
            message: "Your password has expired",
          },
        },
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }

    if (email === "2fa@infinity.net" && password === "password") {
      return HttpResponse.json(
        {
          statusCode: HttpStatusCode.PreconditionRequired,
          data: {
            message: "Two-factor authentication required",
          },
        },
        {
          status: HttpStatusCode.PreconditionRequired,
        },
      );
    }

    return HttpResponse.json(
      {
        statusCode: HttpStatusCode.Unauthorized,
        data: {
          message: "Invalid email or password",
        },
      },
      {
        status: HttpStatusCode.Unauthorized,
      },
    );
  }),
];
