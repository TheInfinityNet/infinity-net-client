import { authHandlers } from "./auth.handlers";
import { commentReactionsHandlers } from "./comment-reactions.handlers";
import { commentsHandlers } from "./comments.handlers";
import { conversationsHandlers } from "./conversations.handlers";
import { followsHandlers } from "./follows.handlers";
import { friendsHandlers } from "./friends.handlers";
import { mediaHandlers } from "./media.handlers";
import { messageReactionsHandlers } from "./message-reactions.handlers";
import { messagesHandlers } from "./messages.handlers";
import { notificationHandlers } from "./notifications.handlers";
import { postReactionsHandlers } from "./post-reactions.handlers";
import { postsHandlers } from "./posts.handlers";
import { profileHandlers } from "./profile.handlers";
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
  ...conversationsHandlers,
  ...messagesHandlers,
  ...commentReactionsHandlers,
  ...postReactionsHandlers,
  ...messageReactionsHandlers,
];
