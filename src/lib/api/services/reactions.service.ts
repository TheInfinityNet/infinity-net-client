import apiClient from "../api-client";
import { Metadata } from "../types/api.type";
import { Reaction, ReactionType } from "../types/reaction.type";

export enum ReactionEndpoints {
  GetReactionsByPostId = "/posts/:postId/reactions",
  CreatePostReaction = "/posts/:postId/reactions",
  DeletePostReaction = "/posts/:postId/reactions",

  GetReactionsByCommentId = "/comments/:commentId/reactions",
  CreateCommentReaction = "/comments/:commentId/reactions",
  DeleteCommentReaction = "/comments/:commentId/reactions/:reactionId",

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
    reactions: Reaction[];
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
    reaction: Reaction;
  }>(ReactionEndpoints.CreatePostReaction.replace(":postId", postId), data);

const deleteReactionByPostId = (postId: string) =>
  apiClient.delete<{
    reaction: Reaction;
  }>(ReactionEndpoints.DeletePostReaction.replace(":postId", postId));

export default {
  getReactionsByPostId,
  createReactionByPostId,
  deleteReactionByPostId,
};
