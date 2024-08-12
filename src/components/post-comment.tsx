import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HeartIcon, MessageCircleIcon, ShareIcon } from "lucide-react";
import { useState } from "react";
import { Comment } from "@/lib/api/types/comment.type";
import { useGetRepliesByCommentId } from "@/hooks/useGetRepliesByCommentId";
import { ReplyComment } from "./reply-comment";
import { cn } from "@/lib/utils";

interface PostCommentProps {
  comment: Comment;
  level?: number;
}

export const PostComment = memo(({ comment, level }: PostCommentProps) => {
  const [showComments, setShowComments] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetRepliesByCommentId(comment.id, showComments);

  const toggleComments = useCallback(
    () => setShowComments((prev) => !prev),
    [],
  );
  const toggleReplyForm = useCallback(
    () => setShowReplyForm((prev) => !prev),
    [],
  );

  const children = data?.pages.flatMap((page) => page.data.comments) ?? [];

  return (
    <div className="space-y-4 mb-4 relative">
      <div className="flex items-start gap-4">
        <Avatar className="w-8 h-8 z-10">
          <AvatarImage src={comment.user?.avatar ?? "/placeholder-user.jpg"} />
          <AvatarFallback>{comment.user?.firstName ?? "?"}</AvatarFallback>
        </Avatar>
        <span
          className={cn("absolute h-full ml-4 border-l-2", {
            "border-primary": showComments,
            "border-red-500": level && level > 5,
          })}
        />

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
            <div
              className="flex items-center gap-1 text-sm text-muted-foreground"
              onClick={toggleReplyForm}
            >
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

      <div
        className={cn("ml-8", {
          "ml-0": level && level > 5,
        })}
      >
        <Button
          variant="link"
          onClick={toggleComments}
          className={cn("text-muted-foreground", {
            "ml-8": level && level > 5,
          })}
        >
          {showComments ? "Hide" : "Show"} comments
        </Button>

        {showComments && children.length > 0 && (
          <>
            <div>
              {children.map((child) => (
                <PostComment
                  key={child.id}
                  comment={child}
                  level={(level ?? 0) + 1}
                />
              ))}
            </div>

            {hasNextPage && (
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => fetchNextPage()}
                  variant="link"
                  className="text-muted-foreground"
                >
                  View more comments
                </Button>
                <span className="text-sm text-muted-foreground">
                  {data?.pages.at(-1)?.data.metadata.pagination.nextOffset} of{" "}
                  {data?.pages.at(-1)?.data.metadata.pagination.totalCount}
                </span>
              </div>
            )}
          </>
        )}

        {showReplyForm && <ReplyComment commentId={comment.id} />}
      </div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading comments</div>}
    </div>
  );
});
