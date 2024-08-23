import { CreatePostInput, PostEndpoints } from "@/types/post.type";
import { Metadata } from "../types/api.type";
import { Post } from "../types/post.type";
import { AxiosInstance } from "axios";

export class PostsService {
  private static instance: PostsService | null = null;
  private readonly apiClient: AxiosInstance;

  private constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  static getInstance(apiClient: AxiosInstance) {
    if (
      !PostsService.instance ||
      apiClient !== PostsService.instance.apiClient
    ) {
      PostsService.instance = new PostsService(apiClient);
    }
    return PostsService.instance;
  }

  getPostsByUserId(userId: string, params: { offset: number; limit: number }) {
    return this.apiClient.get<{
      posts: Post[];
      metadata: Metadata;
    }>(PostEndpoints.GetPostsByUserId.replace(":userId", userId.toString()), {
      params,
    });
  }

  getNewsFeed(params: { offset: number; limit: number }) {
    return this.apiClient.get<{
      posts: Post[];
      metadata: Metadata;
    }>(PostEndpoints.GetNewsFeed, {
      params,
    });
  }

  getPostById(postId: string) {
    return this.apiClient.get<{
      post: Post;
    }>(PostEndpoints.GetPostById.replace(":postId", postId));
  }

  createPost(data: CreatePostInput) {
    return this.apiClient.post<Post>(PostEndpoints.CreatePost, data);
  }
}
