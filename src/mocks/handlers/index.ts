import { authHandlers } from "./auth.handlers";
import { postsHandlers } from "./posts.handlers";
import { profileHandlers } from "./profile.handlers";
import { usersHandlers } from "./users.handlers";

export const handlers = [
  ...authHandlers,
  ...profileHandlers,
  ...usersHandlers,
  ...postsHandlers,
];
