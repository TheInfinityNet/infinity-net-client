import apiClient from "../api-client";
import { Metadata } from "../types/api.type";
import { Post } from "../types/post.type";

export enum PostEndpoints {
  GetPostsByUserId = "/users/:userId/posts",
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

export default {
  getPostsByUserId,
};
