import apiClient from "../api-client";
import { Metadata } from "../types/api.type";
import { Reaction } from "../types/reaction.type";

export enum ReactionEndpoints {
  GetReactionsByPostId = "/posts/:postId/reactions",
  CreatePostReaction = "/posts/:postId/reactions",
  DeletePostReaction = "/posts/:postId/reactions/:reactionId",

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
  },
) =>
  apiClient.get<{
    reactions: Reaction[];
    metadata: Metadata;
  }>(ReactionEndpoints.GetReactionsByPostId.replace(":postId", postId), {
    params,
  });

export default {
  getReactionsByPostId,
};
