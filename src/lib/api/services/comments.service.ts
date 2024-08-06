import apiClient from "../api-client";
import { Metadata } from "../types/api.type";
import { Comment } from "../types/comment.type";

export enum CommentEndpoints {
  GetCommentsByPostId = "/posts/:postId/comments",
  GetRepliesByCommentId = "/comments/:commentId/replies",
}

const getCommentsByPostId = (
  postId: string,
  params: {
    offset: number;
    limit: number;
  },
) =>
  apiClient.get<{
    comments: Comment[];
    metadata: Metadata;
  }>(CommentEndpoints.GetCommentsByPostId.replace(":postId", postId), {
    params,
  });

const getRepliesByCommentId = (
  commentId: string,
  params: {
    offset: number;
    limit: number;
  },
) =>
  apiClient.get<{
    comments: Comment[];
    metadata: Metadata;
  }>(CommentEndpoints.GetRepliesByCommentId.replace(":commentId", commentId), {
    params,
  });

export default {
  getCommentsByPostId,
  getRepliesByCommentId,
};
