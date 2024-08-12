import apiClient from "../api-client";
import { User } from "../types/user.type";

export enum UserEndpoints {
  GetUser = "/users/:userId",
  UpdateUser = "/users/:userId",
}

const getUser = async (pathParams: { userId: string }) =>
  apiClient.get<{
    user: User;
  }>(UserEndpoints.GetUser.replace(":userId", pathParams.userId));

export default {
  getUser,
};
