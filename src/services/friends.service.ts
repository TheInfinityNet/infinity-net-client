import { AxiosInstance } from "axios";
import { Metadata } from "../types/api.type";
import { User } from "../types/user.type";

export enum FriendsEndpoints {
  GetFriendsByUserId = "/users/:userId/friends",
  GetPendingRequestsByUserId = "/users/:userId/friends/pending-requests",
}

export class FriendsService {
  private static instance: FriendsService | null = null;
  private readonly apiClient: AxiosInstance;

  private constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  static getInstance(apiClient: AxiosInstance) {
    if (
      !FriendsService.instance ||
      apiClient !== FriendsService.instance.apiClient
    ) {
      FriendsService.instance = new FriendsService(apiClient);
    }
    return FriendsService.instance;
  }

  getFriendsByUserId(
    userId: string,
    params: { offset: number; limit: number; query?: string },
  ) {
    return this.apiClient.get<{
      friends: User[];
      metadata: Metadata;
    }>(FriendsEndpoints.GetFriendsByUserId.replace(":userId", userId), {
      params,
    });
  }

  getPendingRequestsByUserId(
    userId: string,
    params: { offset: number; limit: number },
  ) {
    return this.apiClient.get<{
      pendingRequests: User[];
      metadata: Metadata;
    }>(FriendsEndpoints.GetPendingRequestsByUserId.replace(":userId", userId), {
      params,
    });
  }
}
