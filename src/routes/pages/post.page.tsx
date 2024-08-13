import { PostCard } from "@/components/post-card";
import { useGetPostById } from "@/hooks/useGetPostById";
import { useParams } from "react-router-dom";

export function PostPage() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = useGetPostById({ postId: id! });

  if (isLoading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return <PostCard post={post} />;
}
