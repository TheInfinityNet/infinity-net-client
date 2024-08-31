import { z } from "zod";
import { Comment } from "./comment.type";
import { PostReaction, ReactionType } from "./reaction.type";
import { User } from "./user.type";
import { CreatePostSchema } from "@/contracts/post.contract";
import { PostAdditionalActions, PostPrimaryActions } from "./post-action.type";
import { Pagination } from "./api.type";

export const PostEndpoints = {
  GetPostsByUserId: "/users/:userId/posts",
  CreatePost: "/posts",
  UpdatePost: "/posts/:postId",
  DeletePost: "/posts/:postId",
  GetNewsFeed: "/news-feed",
  GetPostById: "/posts/:postId",
  GetPostAdditionalActions: "/posts/:postId/actions/additional"
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
  reactions?: PostReaction[];
  reactionCounts?: {
    [key in ReactionType]: number;
  };
  createdAt: string;
  updatedAt: string;

  primaryActions: PostPrimaryActions;
};

export type CreatePostInput = z.infer<typeof CreatePostSchema>;

export type GetPostsPaginationResponse = {
  posts: Post[],
  metadata: {
    pagination: Pagination
  }
}

export type GetPostResponse = {
  post: Post
}

export type CreatePostResponse = {
  post: Post
}

export type GetPostAdditionalActions = {
  additionalActions: PostAdditionalActions;
}
