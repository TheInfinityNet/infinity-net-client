import { useMutation } from "react-query";
import reactionsService from "@/lib/api/services/reactions.service";

export function useDeleteReactionByCommentId(commentId: string) {
  return useMutation({
    mutationFn: () => reactionsService.deleteReactionByCommentId(commentId),
  });
}
