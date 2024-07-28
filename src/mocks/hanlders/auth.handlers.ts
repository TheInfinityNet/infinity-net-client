import { HttpStatusCode } from "axios";
import { http, HttpResponse, PathParams } from "msw";
import {
  AuthEndpoints,
  SignInErrorCodes,
  SignInErrorResponse,
  SignInRequest,
  SignInResponse,
  SignUpErrorCodes,
  SignUpErrorResponse,
  SignUpRequest,
  SignUpResponse,
} from "../../lib/api/services/auth.service";
import { generateUser } from "../generators";

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
          errorCode: SignUpErrorCodes.ValidationError,
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
          errorCode: SignUpErrorCodes.PasswordMismatch,
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
          errorCode: SignUpErrorCodes.EmailAlreadyInUse,
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
          errorCode: SignUpErrorCodes.WeakPassword,
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
          errorCode: SignUpErrorCodes.InvalidEmail,
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
          errorCode: SignUpErrorCodes.TermsNotAccepted,
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
];
