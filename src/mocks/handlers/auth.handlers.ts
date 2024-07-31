import { HttpStatusCode } from "axios";
import { http, HttpResponse, PathParams } from "msw";
import {
  AuthEndpoints,
  RefreshTokenErrorResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignInErrorResponse,
  SignInRequest,
  SignInResponse,
  AuthErrorCodes,
  SignUpErrorResponse,
  SignUpRequest,
  SignUpResponse,
  SendEmailVerificationRequest,
  SendEmailVerificationResponse,
  SendEmailVerificationErrorResponse,
  VerifyEmailByCodeRequest,
  VerifyEmailByCodeResponse,
  VerifyEmailByCodeErrorResponse,
} from "../../lib/api/services/auth.service";
import { generateUser } from "../generators";
import { PathParam } from "react-router-dom";

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
          errorCode: AuthErrorCodes.ValidationError,
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
          errorCode: AuthErrorCodes.ValidationError,
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
          errorCode: AuthErrorCodes.ExpiredPassword,
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
          errorCode: AuthErrorCodes.TwoFactorRequired,
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
          errorCode: AuthErrorCodes.TokenInvalid,
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
          user: generateUser(),
        },
        {
          status: HttpStatusCode.Ok,
        },
      );
    }

    if (email === "notfound@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.UserNotFound,
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
          errorCode: AuthErrorCodes.UserDisabled,
          message: "User account is disabled",
        },
        {
          status: HttpStatusCode.Forbidden,
        },
      );
    }

    return HttpResponse.json(
      {
        errorCode: AuthErrorCodes.WrongPassword,
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

  http.post<
    PathParams,
    SignUpRequest,
    SignUpResponse | SignUpErrorResponse,
    AuthEndpoints.SignUp
  >(AuthEndpoints.SignUp, async ({ request }) => {
    const {
      firstName,
      lastName,
      middleName,
      email,
      password,
      passwordConfirmation,
      mobileNumber,
      birthdate,
      gender,
      termsAccepted,
    } = await request.json();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordConfirmation ||
      !mobileNumber ||
      !birthdate ||
      !gender ||
      termsAccepted === undefined
    ) {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.ValidationError,
          message: "Validation error",
          errors: {
            ...(firstName ? {} : { firstName: ["First name is required"] }),
            ...(lastName ? {} : { lastName: ["Last name is required"] }),
            ...(email ? {} : { email: ["Email is required"] }),
            ...(password ? {} : { password: ["Password is required"] }),
            ...(passwordConfirmation
              ? {}
              : {
                  passwordConfirmation: ["Password confirmation is required"],
                }),
            ...(mobileNumber
              ? {}
              : { mobileNumber: ["Mobile number is required"] }),
            ...(birthdate ? {} : { birthdate: ["Birthdate is required"] }),
            ...(gender ? {} : { gender: ["Gender is required"] }),
            ...(termsAccepted === undefined
              ? { termsAccepted: ["Terms acceptance is required"] }
              : {}),
          },
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    if (password !== passwordConfirmation) {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.PasswordMismatch,
          errors: {
            passwordConfirmation: ["Passwords do not match"],
          },
          message: "Passwords do not match",
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    if (email === "existing@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.EmailAlreadyInUse,
          message: "Email is already in use",
          errors: {
            email: ["Email is already in use"],
          },
        },
        {
          status: HttpStatusCode.Conflict,
        },
      );
    }

    if (password.length < 6) {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.WeakPassword,
          message: "Password is too weak",
          errors: {
            password: ["Password is too weak"],
          },
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    if (!/^[\w-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.InvalidEmail,
          message: "Invalid email address",
          errors: {
            email: ["Invalid email address"],
          },
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    if (!termsAccepted) {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.TermsNotAccepted,
          message: "You must accept the terms and conditions",
          errors: {
            termsAccepted: ["You must accept the terms and conditions"],
          },
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    return HttpResponse.json(
      {
        tokens: {
          accessToken: "access-token",
          refreshToken: "refresh-token",
        },
        user: {
          id: "user-id",
          firstName,
          lastName,
          email,
          name: `${firstName} ${lastName + (middleName ? ` ${middleName}` : "")}`,
          mobileNumber,
          birthdate,
          middleName,
          gender,
          password,
          termsAccepted,
        },
      },
      {
        status: HttpStatusCode.Created,
      },
    );
  }),

  http.post<
    PathParams,
    RefreshTokenRequest,
    RefreshTokenResponse | RefreshTokenErrorResponse,
    AuthEndpoints.RefreshToken
  >(AuthEndpoints.RefreshToken, async ({ request }) => {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.InvalidToken,
          message: "Invalid refresh token",
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    if (refreshToken === "expired-token") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.TokenExpired,
          message: "Refresh token has expired",
        },
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }

    if (refreshToken === "revoked-token") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.TokenRevoked,
          message: "Refresh token has been revoked",
        },
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }

    if (refreshToken === "blacklisted-token") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.TokenBlacklisted,
          message: "Refresh token is blacklisted",
        },
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }

    if (refreshToken === "invalid-signature") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.InvalidSignature,
          message: "Invalid token signature",
        },
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }

    if (refreshToken === "not-found") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.UserNotFound,
          message: "User not found",
        },
        {
          status: HttpStatusCode.NotFound,
        },
      );
    }

    if (refreshToken === "rate-limit") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.RateLimitExceeded,
          message: "Rate limit exceeded",
        },
        {
          status: HttpStatusCode.TooManyRequests,
        },
      );
    }

    return HttpResponse.json(
      {
        message: "Token refreshed",
        accessToken: "new-access-token",
      },
      {
        status: HttpStatusCode.Ok,
      },
    );
  }),

  http.post<
    PathParams,
    SendEmailVerificationRequest,
    SendEmailVerificationResponse | SendEmailVerificationErrorResponse,
    AuthEndpoints.SendEmailVerification
  >(AuthEndpoints.SendEmailVerification, async ({ request }) => {
    const { email } = await request.json();

    if (!email) {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.ValidationError,
          errors: {
            email: ["Email is required"],
          },
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    if (email === "invalid@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.InvalidEmail,
          errors: {
            email: ["Invalid email address"],
          },
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    if (email === "notfound@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.UserNotFound,
          message: "User not found",
        },
        {
          status: HttpStatusCode.NotFound,
        },
      );
    }

    return HttpResponse.json(
      {
        message: "Verification email sent, please check your inbox",
        retryAfter: Date.now() + 60 * 1000,
      },
      {
        status: HttpStatusCode.Ok,
      },
    );
  }),

  http.post<
    PathParams,
    VerifyEmailByCodeRequest,
    VerifyEmailByCodeResponse | VerifyEmailByCodeErrorResponse,
    AuthEndpoints.VerifyEmailByCode
  >(AuthEndpoints.VerifyEmailByCode, async ({ request }) => {
    const { email, code } = await request.json();

    if (!email || !code) {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.ValidationError,
          errors: {
            ...(email ? {} : { email: ["Email is required"] }),
            ...(code ? {} : { code: ["Verification code is required"] }),
          },
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    if (email === "invalid@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.InvalidEmail,
          errors: {
            email: ["Invalid email address"],
          },
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    if (email === "invalidation@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.ValidationError,
          errors: {
            email: ["Email is invalid"],
            code: ["Code is invalid"],
          },
        },
        {
          status: HttpStatusCode.UnprocessableEntity,
        },
      );
    }

    if (email === "ok@infinity.net") {
      return HttpResponse.json(
        {
          message: "Email verified, please sign in",
        },
        {
          status: HttpStatusCode.Ok,
        },
      );
    }

    if (email === "notfound@infinity.net") {
      return HttpResponse.json(
        {
          errorCode: AuthErrorCodes.UserNotFound,
          message: "User not found",
        },
        {
          status: HttpStatusCode.NotFound,
        },
      );
    }

    return HttpResponse.json(
      {
        errorCode: AuthErrorCodes.CodeInvalid,
        errors: {
          code: ["Verification code is invalid"],
        },
      },
      {
        status: HttpStatusCode.BadRequest,
      },
    );
  }),
];
