import { useApiClient } from "@/contexts/api-client.context";
import { useQuery } from "react-query";

export function useGetPostById({ postId }: { postId: string }) {
  const { postsService } = useApiClient();
  return useQuery(["post", postId], {
    queryFn: () => postsService().getPostById(postId),
    select: (data) => data.data.post,
    staleTime: 1000 * 60 * 5,
  });
}
