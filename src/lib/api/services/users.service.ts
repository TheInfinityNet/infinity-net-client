import apiClient from "../api-client";
import { Metadata } from "../types/api.type";
import { User } from "../types/user.type";

export enum UserEndpoints {
  GetUser = "/users/:userId",
  UpdateUser = "/users/:userId",
  FollowUser = "/users/:userId/follow",
  UnfollowUser = "/users/:userId/unfollow",
  GetUserPosts = "/users/:userId/posts",
  GetUserFriends = "/users/:userId/friends",
}

const getUser = async (pathParams: { userId: string }) =>
  apiClient.get<{
    user: User;
  }>(UserEndpoints.GetUser.replace(":userId", pathParams.userId));

const getUserPosts = (
  id: string,
  params: {
    page: number;
    limit: number;
  },
) =>
  apiClient.get<{
    posts: Post[];
    metadata: Metadata;
  }>(UserEndpoints.GetUserPosts.replace(":id", id), {
    params,
  });

export default {
  getUser,
  getUserPosts,
};
