import { User } from "@/types/user.type";
import { AxiosInstance } from "axios";

export class UsersService {
  private apiClient: AxiosInstance;
  private static instance: UsersService | null = null;

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  static getInstance(apiClient: AxiosInstance) {
    if (
      !UsersService.instance ||
      apiClient !== UsersService.instance.apiClient
    ) {
      UsersService.instance = new UsersService(apiClient);
    }
    return UsersService.instance;
  }

  getCurrentUser() {
    return this.apiClient.get<{
      user: User;
    }>("/me");
  }
}
