import apiClient from "../api-client";
import { Metadata } from "../types/api.type";
import { Reaction } from "../types/reactions.type";
export enum ReactionEndpoints {
  GetReactionsByPostId = "/posts/:postId/reactions",
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
