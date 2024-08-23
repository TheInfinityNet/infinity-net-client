import { useApiClient } from "@/contexts/api-client.context";
import { CreatePostInput } from "@/types/post.type";
import { useMutation, useQueryClient, } from "react-query";

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  const { postsService } = useApiClient();
  return useMutation({
    mutationFn: (data: CreatePostInput) => postsService().createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries("news-feed");
    }
  })
}
