import { z } from "zod";
import { Comment } from "./comment.type";
import { PostReaction, ReactionType } from "./reaction.type";
import { User } from "./user.type";
import { CreatePostSchema } from "@/contracts/post.contract";

export const PostEndpoints = {
  GetPostsByUserId: "/users/:userId/posts",
  CreatePost: "/posts",
  UpdatePost: "/posts/:postId",
  DeletePost: "/posts/:postId",
  GetNewsFeed: "/news-feed",
  GetPostById: "/posts/:postId",
};

export enum PostPrivacy {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
  Friends = 'FRIENDS',
  Custom = 'CUSTOM',
}

export type Post = {
  id: string;
  userId: string;
  user?: User;
  comments?: Comment[];
  commentCounts?: number;
  content: string;
  currentUserReaction?: PostReaction;
  reactions?: PostReaction[];
  reactionCounts?: {
    [key in ReactionType]: number;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
