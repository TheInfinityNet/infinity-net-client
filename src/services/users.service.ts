import { AxiosInstance } from "axios";
import type {
  GetUserInput,
  GetUserResponse,
  UpdateUserInput,
  UpdateUserResponse,
  DeleteUserInput,
  DeleteUserResponse,
  User,
} from "@/types/user.type";
import { UserEndpoints } from "@/types/user.type";
import { FriendshipStatus } from "@/types/friend.type";

export class UsersService {
  private static instance: UsersService | null = null;
  private readonly apiClient: AxiosInstance;

  private constructor(apiClient: AxiosInstance) {
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
    }>(UserEndpoints.GetCurrentUser);
  }

  getUser(data: GetUserInput) {
    return this.apiClient.get<GetUserResponse>(
      UserEndpoints.GetUser.replace(":userId", data.userId),
    );
  }

  updateUser(data: UpdateUserInput) {
    return this.apiClient.put<UpdateUserResponse>(
      UserEndpoints.UpdateUser.replace(":userId", data.userId),
      data,
    );
  }

  deleteUser(data: DeleteUserInput) {
    return this.apiClient.delete<DeleteUserResponse>(
      UserEndpoints.DeleteUser.replace(":userId", data.userId),
    );
  }

  getUserDetailByUserId({ userId }: { userId: string }) {
    return this.apiClient.get<{
      user: User;
    }>(UserEndpoints.GetUserDetailByUserId.replace(":userId", userId));
  }

  getUserProfileByUserId({ userId }: { userId: string }) {
    return this.apiClient.get<{
      user: User;
      friendshipStatus: FriendshipStatus;
    }>(UserEndpoints.GetUserProfileByUserId.replace(":userId", userId));
  }
}
