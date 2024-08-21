import { useApiClient } from "@/contexts/api-client.context";
import { ReactionType } from "@/types/reaction.type";
import { useMutation } from "react-query";

export function useCreateReactionByCommentId(commentId: string) {
  const { reactionsService } = useApiClient();

  return useMutation({
    mutationFn: (reactionType: ReactionType) => {
      return reactionsService().createReactionByCommentId(commentId, {
        type: reactionType,
      });
    },
  });
}
