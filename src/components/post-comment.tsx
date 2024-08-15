import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircleIcon, ShareIcon, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Comment } from "@/lib/api/types/comment.type";
import { useGetRepliesByCommentId } from "@/hooks/useGetRepliesByCommentId";
import { ReplyComment } from "./reply-comment";
import { cn } from "@/lib/utils";
import { CommentReactionCountsPreview } from "./comment-reaction-counts";
import {
  CommentReaction,
  ReactionType,
  ReactionTypeToUnifiedMap,
  UnifiedToReactionTypeMap,
} from "@/lib/api/types/reaction.type";
import { useCreateReactionByCommentId } from "@/hooks/useCreateReactionByCommentIdMutation";
import { useDeleteReactionByCommentId } from "@/hooks/useDeleteReactionByCommentIdMutation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import EmojiPicker, { Emoji } from "emoji-picker-react";

const ReactionNames: {
  [key in ReactionType]: string;
} = {
  [ReactionType.Like]: "Like",
  [ReactionType.Love]: "Love",
  [ReactionType.Haha]: "Haha",
  [ReactionType.Dislike]: "Dislike",
  [ReactionType.FoldedHands]: "Folded Hands",
  [ReactionType.Sad]: "Sad",
  [ReactionType.Angry]: "Angry",
};

interface PostCommentProps {
  comment: Comment;
  level?: number;
}

export const PostComment = memo(({ comment, level }: PostCommentProps) => {
  const [showComments, setShowComments] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetRepliesByCommentId(comment.id, showComments);

  const [currentUserReaction, setCurrentUserReaction] =
    useState<CommentReaction | null>(comment.currentUserReaction || null);

  const createReactionByCommentIdMutation = useCreateReactionByCommentId(
    comment.id,
  );
  const deleteReactionByCommentIdMutation = useDeleteReactionByCommentId(
    comment.id,
  );

  const handleReactionClick = (reactionType: ReactionType | null) => {
    if (reactionType) {
      const newReaction: CommentReaction = {
        type: reactionType,
        commentId: comment.id,
        userId: "",
        createdAt: "",
        updatedAt: "",
        id: "",
      };
      setCurrentUserReaction(newReaction);
      createReactionByCommentIdMutation.mutate(reactionType, {
        onError: () => {
          setCurrentUserReaction(null);
        },
      });
    } else {
      setCurrentUserReaction(null);
      deleteReactionByCommentIdMutation.mutate(undefined, {
        onError: () => {
          setCurrentUserReaction(comment.currentUserReaction || null);
        },
      });
    }
  };

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
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="gap-1 w-fit"
                  onClick={() => {
                    handleReactionClick(
                      currentUserReaction ? null : ReactionType.Like,
                    );
                  }}
                >
                  {(() => {
                    if (currentUserReaction) {
                      return (
                        <>
                          <Emoji
                            unified={
                              ReactionTypeToUnifiedMap[currentUserReaction.type]
                            }
                            size={16}
                          />
                          {ReactionNames[currentUserReaction.type]}
                        </>
                      );
                    }
                    return (
                      <>
                        <ThumbsUp className="size-4" /> Like
                      </>
                    );
                  })()}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="z-20 w-fit p-0">
                <EmojiPicker
                  style={{ border: "none" }}
                  reactionsDefaultOpen={true}
                  allowExpandReactions={false}
                  onEmojiClick={(emoji) => {
                    handleReactionClick(
                      UnifiedToReactionTypeMap[emoji.unified],
                    );
                  }}
                />
              </HoverCardContent>
            </HoverCard>{" "}
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
            <CommentReactionCountsPreview comment={comment} />
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
