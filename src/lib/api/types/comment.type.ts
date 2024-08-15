import { Post } from "./post.type";
import { CommentReaction, ReactionType } from "./reaction.type";
import { User } from "./user.type";

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  parentId?: string;
  content: string;
  children?: Comment[];
  childrenCount?: number;
  currentUserReaction?: CommentReaction;
  reactionCounts?: {
    [key in ReactionType]: number;
  };
  createdAt: string;
  updatedAt: string;
  user?: User;
  post?: Post;
};
