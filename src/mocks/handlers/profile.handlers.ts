import {
  GetProfileResponse,
  ProfileEndpoints,
} from "@/lib/api/services/profile.service";
import { http, HttpResponse, PathParams } from "msw";
import { isAuthenticated } from "../utils/jwt";
import { generateFriendshipStatus, generateUser } from "../generators";
import { FriendshipStatus } from "@/lib/api/types/friend.type";
import { PermissionType } from "@/lib/permissions";

export const profileHandlers = [
  http.get<PathParams, {}, GetProfileResponse, ProfileEndpoints.GetProfile>(
    ProfileEndpoints.GetProfile,
    async ({ request }) => {
      const user = await isAuthenticated(request);

      return HttpResponse.json({
        user: user,
      });
    },
  ),

  http.get("/users/:userId/profile", async ({ params, request }) => {
    const userId = params as { userId: string };

    let friendshipStatus = generateFriendshipStatus();
    try {
      let currentUser = await isAuthenticated(request);
      currentUser.id === userId.userId &&
        (friendshipStatus = FriendshipStatus.Self);
    } catch {}

    const permissions = {
      [PermissionType.UpdateProfile]:
        friendshipStatus === FriendshipStatus.Self,
      [PermissionType.SendFriendRequest]:
        friendshipStatus === FriendshipStatus.NotFriends,
      [PermissionType.AcceptFriendRequest]:
        friendshipStatus === FriendshipStatus.ReceivedRequest,
      [PermissionType.DeclineFriendRequest]:
        friendshipStatus === FriendshipStatus.ReceivedRequest,
      [PermissionType.CancelFriendRequest]:
        friendshipStatus === FriendshipStatus.SentRequest,
      [PermissionType.RemoveFriend]:
        friendshipStatus === FriendshipStatus.Accepted,
    };

    return HttpResponse.json({
      user: generateUser({ id: userId.userId }),
      friendshipStatus,
      permissions,
    });
  }),
];
