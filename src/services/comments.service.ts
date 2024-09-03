import { Metadata } from "@/types/api.type";
import { CommentEndpoints, Comment, GetCommentsByPostIdResponse } from "@/types/comment.type";
import { AxiosInstance } from "axios";

export class CommentsService {
  private static instance: CommentsService | null = null;
  private readonly apiClient: AxiosInstance;

  private constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  static getInstance(apiClient: AxiosInstance) {
    if (
      !CommentsService.instance ||
      apiClient !== CommentsService.instance.apiClient
    ) {
      CommentsService.instance = new CommentsService(apiClient);
    }
    return CommentsService.instance;
  }

  getCommentsByPostId(
    postId: string,
    params: { offset: number; limit: number },
  ) {
    return this.apiClient.get<GetCommentsByPostIdResponse>(CommentEndpoints.GetCommentsByPostId.replace(":postId", postId), {
      params,
    });
  }

  getRepliesByCommentId(
    commentId: string,
    params: { offset: number; limit: number },
  ) {
    return this.apiClient.get<{
      comments: Comment[];
      metadata: Metadata;
    }>(
      CommentEndpoints.GetRepliesByCommentId.replace(":commentId", commentId),
      {
        params,
      },
    );
  }
}
