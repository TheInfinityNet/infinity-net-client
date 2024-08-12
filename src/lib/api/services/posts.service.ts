import apiClient from "../api-client";
import { Metadata } from "../types/api.type";
import { Post } from "../types/post.type";

export enum PostEndpoints {
  GetPostsByUserId = "/users/:userId/posts",
  CreatePost = "/posts",
  UpdatePost = "/posts/:postId",
  DeletePost = "/posts/:postId",
  GetNewsFeed = "/news-feed",
  GetPostById = "/posts/:postId",
}

const getPostsByUserId = (
  userId: string,
  params: {
    offset: number;
    limit: number;
  },
) =>
  apiClient.get<{
    posts: Post[];
    metadata: Metadata;
  }>(PostEndpoints.GetPostsByUserId.replace(":userId", userId.toString()), {
    params,
  });

const getNewsFeed = (params: { offset: number; limit: number }) =>
  apiClient.get<{
    posts: Post[];
    metadata: Metadata;
  }>("/news-feed", {
    params,
  });

export default {
  getPostsByUserId,
  getNewsFeed,
};
