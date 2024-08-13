import { authHandlers } from "./auth.handlers";
import { commentsHandlers } from "./comments.handlers";
import { followsHandlers } from "./follows.handlers";
import { friendsHandlers } from "./friends.handlers";
import { mediaHandlers } from "./media.handlers";
import { notificationHandlers } from "./notifications.handlers";
import { postsHandlers } from "./posts.handlers";
import { profileHandlers } from "./profile.handlers";
import { reactionsHandlers } from "./reactions.handlers";
import { usersHandlers } from "./users.handlers";

export const handlers = [
  ...authHandlers,
  ...profileHandlers,
  ...usersHandlers,
  ...postsHandlers,
  ...commentsHandlers,
  ...notificationHandlers,
  ...mediaHandlers,
  ...friendsHandlers,
  ...followsHandlers,
  ...reactionsHandlers,
];
