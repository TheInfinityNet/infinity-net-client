import { authHandlers } from "./auth.handlers";
import { profileHandlers } from "./profile.handlers";

export const handlers = [...authHandlers, ...profileHandlers];
