import { useApiClient } from "@/contexts/api-client.context";
import { useMutation } from "react-query";

export function useDeleteReactionByPostId(postId: string) {
  const { reactionsService } = useApiClient();

  return useMutation({
    mutationFn: () => reactionsService().deleteReactionByPostId(postId),
  });
}
