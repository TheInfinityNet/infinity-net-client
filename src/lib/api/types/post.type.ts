import { User } from "./user.type";

export type Post = {
  id: string;
  user?: User;
  content: string;
  createdAt: string;
  updatedAt: string;
};
