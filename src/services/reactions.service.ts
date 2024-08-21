import {
  ReactionEndpoints,
  PostReaction,
  CommentReaction,
  ReactionType,
} from "@/types/reaction.type";
import { Metadata } from "../types/api.type";
import { AxiosInstance } from "axios";

export class ReactionsService {
  private static instance: ReactionsService | null = null;
  private readonly apiClient: AxiosInstance;

  private constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  static getInstance(apiClient: AxiosInstance) {
    if (
      !ReactionsService.instance ||
      apiClient !== ReactionsService.instance.apiClient
    ) {
      ReactionsService.instance = new ReactionsService(apiClient);
    }
    return ReactionsService.instance;
  }

  getReactionsByPostId(
    postId: string,
    params: { offset: number; limit: number; type?: ReactionType },
  ) {
    return this.apiClient.get<{
      reactions: PostReaction[];
      metadata: Metadata;
    }>(ReactionEndpoints.GetReactionsByPostId.replace(":postId", postId), {
      params,
    });
  }

  createReactionByPostId(postId: string, data: { type: ReactionType }) {
    return this.apiClient.post<{
      reaction: PostReaction;
    }>(ReactionEndpoints.CreatePostReaction.replace(":postId", postId), data);
  }

  deleteReactionByPostId(postId: string) {
    return this.apiClient.delete<{
      reaction: PostReaction;
    }>(ReactionEndpoints.DeletePostReaction.replace(":postId", postId));
  }

  getReactionsByCommentId(
    commentId: string,
    params: { offset: number; limit: number; type?: ReactionType },
  ) {
    return this.apiClient.get<{
      reactions: CommentReaction[];
      metadata: Metadata;
    }>(
      ReactionEndpoints.GetReactionsByCommentId.replace(
        ":commentId",
        commentId,
      ),
      {
        params,
      },
    );
  }

  createReactionByCommentId(commentId: string, data: { type: ReactionType }) {
    return this.apiClient.post<{
      reaction: CommentReaction;
    }>(
      ReactionEndpoints.CreateCommentReaction.replace(":commentId", commentId),
      data,
    );
  }

  deleteReactionByCommentId(reactionId: string) {
    return this.apiClient.delete<{
      reaction: CommentReaction;
    }>(
      ReactionEndpoints.DeleteCommentReaction.replace(
        ":reactionId",
        reactionId,
      ),
    );
  }
}
