import { useMutation } from "react-query";
import reactionsService from "@/lib/api/services/reactions.service";
import { ReactionType } from "@/lib/api/types/reaction.type";

export function useCreateReactionByCommentId(commentId: string) {
  return useMutation({
    mutationFn: (reactionType: ReactionType) => {
      return reactionsService.createReactionByCommentId(commentId, {
        type: reactionType,
      });
    },
  });
}
