import { CreatePostInput, CreatePostResponse, GetPostAdditionalActions, GetPostResponse, GetPostsPaginationResponse, PostEndpoints } from "@/types/post.type";
import { Post } from "../types/post.type";
import { AxiosInstance } from "axios";
import { PostAdditionalActions } from "@/types/post-action.type";

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
    return this.apiClient.get<GetPostsPaginationResponse>(PostEndpoints.GetPostsByUserId.replace(":userId", userId.toString()), {
      params,
    });
  }

  getNewsFeed(params: { offset: number; limit: number }) {
    return this.apiClient.get<GetPostsPaginationResponse>(PostEndpoints.GetNewsFeed, {
      params,
    });
  }

  getPostById(postId: string) {
    return this.apiClient.get<GetPostResponse>(PostEndpoints.GetPostById.replace(":postId", postId));
  }

  createPost(data: CreatePostInput) {
    return this.apiClient.post<CreatePostResponse>(PostEndpoints.CreatePost, data);
  }

  getPostAdditionalActions(postId: string) {
    return this.apiClient.get<GetPostAdditionalActions>(PostEndpoints.GetPostAdditionalActions.replace(":postId", postId));
  }
}
