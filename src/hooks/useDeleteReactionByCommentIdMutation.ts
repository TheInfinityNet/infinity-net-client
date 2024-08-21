import { useApiClient } from "@/contexts/api-client.context";
import { useMutation } from "react-query";

export function useDeleteReactionByCommentId(commentId: string) {
  const { reactionsService } = useApiClient();

  return useMutation({
    mutationFn: () => reactionsService().deleteReactionByCommentId(commentId),
  });
}
