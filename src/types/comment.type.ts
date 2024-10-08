import { CreateCommentSchema } from "@/contracts/comment.contract";
import { Post } from "./post.type";
import { CommentReaction, ReactionType } from "./reaction.type";
import { User } from "./user.type";
import { z } from "zod";
import { Metadata } from "./api.type";

export const CommentEndpoints = {
  CreateCommentByPostId: "/posts/:postId/comments",
  GetCommentsByPostId: "/posts/:postId/comments",
  GetRepliesByCommentId: "/comments/:commentId/replies",
  UpdateComment: "/comments/:commentId",
};

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

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;
export type GetCommentsByPostIdResponse = {
  comments: Comment[];
  metadata: Metadata;
}
