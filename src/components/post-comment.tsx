import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HeartIcon, MessageCircleIcon, ShareIcon } from "lucide-react";
import { useState } from "react";
import { Comment } from "@/lib/api/types/comment.type";
import { useGetRepliesByCommentId } from "@/hooks/useGetRepliesByCommentId";

interface PostCommentProps {
  comment: Comment;
}
export function PostComment({ comment }: PostCommentProps) {
  const [showComments, setShowComments] = useState(false);
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetRepliesByCommentId(comment.id, showComments);

  const children = data?.pages.flatMap((page) => page.data.comments) ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading comments</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.user?.avatar ?? "/placeholder-user.jpg"} />
          <AvatarFallback>{comment.user?.firstName ?? "?"}</AvatarFallback>
        </Avatar>

        <div className="grid gap-1">
          <div className="flex items-center justify-between">
            <div className="font-medium">
              {comment.user?.username ?? "Unknown"}
            </div>
            <div className="text-sm text-muted-foreground">
              {comment.createdAt}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{comment.content}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <HeartIcon className="w-4 h-4" />
              <span>Like</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MessageCircleIcon className="w-4 h-4" />
              <span>Reply</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <ShareIcon className="w-4 h-4" />
              <span>Share</span>
            </div>
          </div>
        </div>
      </div>

      <Button variant="link" onClick={() => setShowComments((prev) => !prev)}>
        {showComments ? "Hide" : "Show"} comments
      </Button>

      {showComments && children.length > 0 && (
        <div className="pl-8 border-l border-dashed border-primary">
          {children.map((child) => (
            <PostComment key={child.id} comment={child} />
          ))}
          {hasNextPage && (
            <Button onClick={() => fetchNextPage()}>Load More</Button>
          )}
        </div>
      )}
    </div>
  );
}
