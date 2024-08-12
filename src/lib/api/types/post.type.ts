import { Comment } from "./comment.type";
import { Reaction, ReactionType } from "./reactions.type";
import { User } from "./user.type";

export type Post = {
  id: string;
  userId: string;
  user?: User;
  comments?: Comment[];
  commentCounts?: number;
  content: string;
  currentUserReaction?: Reaction;
  reactions?: Reaction[];
  reactionCounts?: {
    [key in ReactionType]: number;
  };
  createdAt: string;
  updatedAt: string;
};
