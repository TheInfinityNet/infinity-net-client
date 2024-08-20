import {
  AuthEndpoints,
  ForgotPasswordInput,
  ForgotPasswordResponse,
  RefreshTokenInput,
  RefreshTokenResponse,
  ResetPasswordInput,
  ResetPasswordResponse,
  SendEmailForgotPasswordInput,
  SendEmailForgotPasswordResponse,
  SendEmailVerificationInput,
  SendEmailVerificationResponse,
  SignInInput,
  SignInResponse,
  SignOutInput,
  SignOutResponse,
  SignUpInput,
  SignUpResponse,
  VerifyEmailByCodeInput,
  VerifyEmailByCodeResponse,
  VerifyEmailByTokenInput,
  VerifyEmailByTokenResponse,
} from "@/types/auth.type";
import { AxiosInstance } from "axios";

export class AuthService {
  private static instance: AuthService | null = null;
  private readonly apiClient: AxiosInstance;

  private constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  static getInstance(apiClient: AxiosInstance) {
    if (!AuthService.instance || apiClient !== AuthService.instance.apiClient) {
      AuthService.instance = new AuthService(apiClient);
    }
    return AuthService.instance;
  }

  signIn(data: SignInInput) {
    return this.apiClient.post<SignInResponse>(AuthEndpoints.SignIn, data, {
      headers: { "No-Auth": true },
    });
  }

  signUp(data: SignUpInput) {
    return this.apiClient.post<SignUpResponse>(AuthEndpoints.SignUp, data, {
      headers: { "No-Auth": true },
    });
  }

  signOut(data: SignOutInput) {
    return this.apiClient.post<SignOutResponse>(AuthEndpoints.SignOut, data, {
      headers: { "No-Auth": true },
    });
  }

  refreshToken(data: RefreshTokenInput) {
    return this.apiClient.post<RefreshTokenResponse>(
      AuthEndpoints.RefreshToken,
      data,
      {
        headers: { "No-Auth": true },
      },
    );
  }

  sendEmailVerification(data: SendEmailVerificationInput) {
    return this.apiClient.post<SendEmailVerificationResponse>(
      AuthEndpoints.SendEmailVerification,
      data,
      { headers: { "No-Auth": true } },
    );
  }

  verifyEmailByCode(data: VerifyEmailByCodeInput) {
    return this.apiClient.post<VerifyEmailByCodeResponse>(
      AuthEndpoints.VerifyEmailByCode,
      data,
      { headers: { "No-Auth": true } },
    );
  }

  verifyEmailByToken(data: VerifyEmailByTokenInput) {
    return this.apiClient.post<VerifyEmailByTokenResponse>(
      AuthEndpoints.VerifyEmailByToken,
      data,
      { headers: { "No-Auth": true } },
    );
  }

  sendEmailForgotPassword(data: SendEmailForgotPasswordInput) {
    return this.apiClient.post<SendEmailForgotPasswordResponse>(
      AuthEndpoints.SendEmailForgotPassword,
      data,
      { headers: { "No-Auth": true } },
    );
  }

  forgotPassword(data: ForgotPasswordInput) {
    return this.apiClient.post<ForgotPasswordResponse>(
      AuthEndpoints.ForgotPassword,
      data,
      {
        headers: { "No-Auth": true },
      },
    );
  }

  resetPassword(data: ResetPasswordInput) {
    return this.apiClient.post<ResetPasswordResponse>(
      AuthEndpoints.ResetPassword,
      data,
      {
        headers: { "No-Auth": true },
      },
    );
  }
}
