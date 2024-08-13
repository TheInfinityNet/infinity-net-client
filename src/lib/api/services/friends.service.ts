import apiClient from "../api-client";
import { Metadata } from "../types/api.type";
import { User } from "../types/user.type";

export enum FriendsEndpoints {
  GetFriendsByUserId = "/users/:userId/friends",
  GetPendingRequestsByUserId = "/users/:userId/friends/pending-requests",
}

const getFriendsByUserId = (
  userId: string,
  params: {
    offset: number;
    limit: number;
    query?: string;
  },
) =>
  apiClient.get<{
    friends: User[];
    metadata: Metadata;
  }>(FriendsEndpoints.GetFriendsByUserId.replace(":userId", userId), {
    params,
  });

const getPendingRequestsByUserId = (
  userId: string,
  params: {
    offset: number;
    limit: number;
  },
) =>
  apiClient.get<{
    pendingRequests: User[];
    metadata: Metadata;
  }>(FriendsEndpoints.GetPendingRequestsByUserId.replace(":userId", userId), {
    params,
  });

export default {
  getFriendsByUserId,
  getPendingRequestsByUserId,
};
