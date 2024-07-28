import { HttpStatusCode } from "axios";
import { http, HttpResponse, PathParams } from "msw";
import {
  AuthEndpoints,
  SignInErrorCodes,
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
          errorCode: SignInErrorCodes.ValidationError,
          message: "Validation error",
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
          errorCode: SignInErrorCodes.ValidationError,
          message: "Validation error",
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

    if (email === "expired@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: SignInErrorCodes.ExpiredPassword,
          message: "Password is expired",
          errors: {
            password: ["Password is expired"],
          },
        },
        {
          status: HttpStatusCode.Conflict,
        },
      );
    }

    if (email === "twofactor@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: SignInErrorCodes.TwoFactorRequired,
          message: "Two-factor authentication required",
        },
        {
          status: HttpStatusCode.Forbidden,
        },
      );
    }

    if (email === "token@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: SignInErrorCodes.TokenInvalid,
          message: "Token is invalid",
        },
        {
          status: HttpStatusCode.Unauthorized,
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

    if (email === "notfound@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: SignInErrorCodes.UserNotFound,
          message: "User not found",
        },
        {
          status: HttpStatusCode.NotFound,
        },
      );
    }

    if (email === "disabled@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: SignInErrorCodes.UserDisabled,
          message: "User account is disabled",
        },
        {
          status: HttpStatusCode.Forbidden,
        },
      );
    }

    return HttpResponse.json(
      {
        errorCode: SignInErrorCodes.WrongPassword,
        message: "Incorrect password",
        errors: {
          password: ["Password is incorrect"],
        },
      },
      {
        status: HttpStatusCode.Unauthorized,
      },
    );
  }),
];
