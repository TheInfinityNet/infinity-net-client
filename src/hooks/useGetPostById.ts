import postsService from "@/lib/api/services/posts.service";
import { useQuery } from "react-query";

export function useGetPostById({ postId }: { postId: string }) {
  return useQuery(["post", postId], {
    queryFn: () => postsService.getPostById(postId),
    select: (data) => data.data.post,
    staleTime: 1000 * 60 * 5,
  });
}
