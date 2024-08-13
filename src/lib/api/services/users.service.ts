import apiClient from "../api-client";
import { User } from "../types/user.type";

export enum UserEndpoints {
  GetUser = "/users/:userId",
  UpdateUser = "/users/:userId",
  GetUserDetailByUserId = "/users/:userId/details",
}

const getUser = async (pathParams: { userId: string }) =>
  apiClient.get<{
    user: User;
  }>(UserEndpoints.GetUser.replace(":userId", pathParams.userId));

const getUserDetailByUserId = async (pathParams: { userId: string }) =>
  apiClient.get<{
    user: User;
  }>(UserEndpoints.GetUserDetailByUserId.replace(":userId", pathParams.userId));

export default {
  getUser,
  getUserDetailByUserId,
};
