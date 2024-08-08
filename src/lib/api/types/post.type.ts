import { Comment } from "./comment.type";
import { User } from "./user.type";

export type Post = {
  id: string;
  userId: string;
  user?: User;
  comments?: Comment[];
  content: string;
  createdAt: string;
  updatedAt: string;
};
