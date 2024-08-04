import _ from "lodash";
import { User } from "@/lib/api/types/user.type";
import { generateUser } from "./generators";

export const users: { [key: string]: User } = _.times(10, () =>
  generateUser(),
).reduce((acc, user) => ({ ...acc, [user.id]: user }), {});

export const posts = [];
export const comments = [];
export const reactions = [];
export const friends = [];
export const followers = [];
export const following = [];
export const notifications = [];
export const messages = [];
export const conversations = [];
export const sessions = [];
