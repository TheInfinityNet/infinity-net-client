import { useMutation } from "react-query";
import reactionsService from "@/lib/api/services/reactions.service";

export function useDeleteReactionByPostId(postId: string) {
  return useMutation({
    mutationFn: () => reactionsService.deleteReactionByPostId(postId),
  });
}
