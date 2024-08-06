import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetCommentsByPostId } from "@/hooks/useGetCommentsByPostId";
import { Comment } from "@/lib/api/types/comment.type";
import { PostComment } from "./post-comment";

type PostCommentsProps = {
  postId: string;
  initialComments?: Comment[];
};

export function PostComments({ postId }: PostCommentsProps) {
  const [showComments, setShowComments] = useState(false);
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetCommentsByPostId(postId, showComments);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading comments</div>;

  return (
    <div>
      <Button variant="link" onClick={() => setShowComments((prev) => !prev)}>
        {showComments ? "Hide" : "Show"} comments
      </Button>
      {showComments && (
        <div>
          {data?.pages
            .flatMap((page) => page.data.comments)
            .map((comment) => (
              <PostComment key={comment.id} comment={comment} />
            ))}
          {hasNextPage && (
            <Button onClick={() => fetchNextPage()}>Load More</Button>
          )}
        </div>
      )}
    </div>
  );
}
