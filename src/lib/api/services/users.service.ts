import apiClient from "../api-client";
import { User } from "../types/user.type";

export enum UserEndpoints {
  GetUser = "/users/:userId",
  UpdateUser = "/users/:userId",
  FollowUser = "/users/:userId/follow",
  UnfollowUser = "/users/:userId/unfollow",
  GetUserPosts = "/users/:userId/posts",
  GetUserFriends = "/users/:userId/friends",
}

const getUser = async (params: { userId: string }) =>
  apiClient.get<{
    user: User;
  }>(UserEndpoints.GetUser, {
    params,
  });

export default {
  getUser,
};
