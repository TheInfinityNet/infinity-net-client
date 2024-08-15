import apiClient from "../api-client";
import { Metadata } from "../types/api.type";
import {
  CommentReaction,
  PostReaction,
  ReactionType,
} from "../types/reaction.type";

export enum ReactionEndpoints {
  GetReactionsByPostId = "/posts/:postId/reactions",
  CreatePostReaction = "/posts/:postId/reactions",
  DeletePostReaction = "/posts/:postId/reactions",

  GetReactionsByCommentId = "/comments/:commentId/reactions",
  CreateCommentReaction = "/comments/:commentId/reactions",
  DeleteCommentReaction = "/comments/:commentId/reactions",

  GetReactionsByMessageId = "/messages/:messageId/reactions",
  CreateMessageReaction = "/messages/:messageId/reactions",
  DeleteMessageReaction = "/messages/:messageId/reactions/:reactionId",
}

const getReactionsByPostId = (
  postId: string,
  params: {
    offset: number;
    limit: number;
    type?: ReactionType;
  },
) =>
  apiClient.get<{
    reactions: PostReaction[];
    metadata: Metadata;
  }>(ReactionEndpoints.GetReactionsByPostId.replace(":postId", postId), {
    params,
  });

const createReactionByPostId = (
  postId: string,
  data: {
    type: ReactionType;
  },
) =>
  apiClient.post<{
    reaction: PostReaction;
  }>(ReactionEndpoints.CreatePostReaction.replace(":postId", postId), data);

const deleteReactionByPostId = (postId: string) =>
  apiClient.delete<{
    reaction: PostReaction;
  }>(ReactionEndpoints.DeletePostReaction.replace(":postId", postId));

const getReactionsByCommentId = (
  commentId: string,
  params: {
    offset: number;
    limit: number;
    type?: ReactionType;
  },
) =>
  apiClient.get<{
    reactions: CommentReaction[];
    metadata: Metadata;
  }>(
    ReactionEndpoints.GetReactionsByCommentId.replace(":commentId", commentId),
    {
      params,
    },
  );

const createReactionByCommentId = (
  commentId: string,
  data: {
    type: ReactionType;
  },
) =>
  apiClient.post<{
    reaction: CommentReaction;
  }>(
    ReactionEndpoints.CreateCommentReaction.replace(":commentId", commentId),
    data,
  );

const deleteReactionByCommentId = (reactionId: string) =>
  apiClient.delete<{
    reaction: CommentReaction;
  }>(
    ReactionEndpoints.DeleteCommentReaction.replace(":reactionId", reactionId),
  );

export default {
  getReactionsByPostId,
  createReactionByPostId,
  deleteReactionByPostId,
  getReactionsByCommentId,
  createReactionByCommentId,
  deleteReactionByCommentId,
};
