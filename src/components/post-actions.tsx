import { MessageCircleIcon, ShareIcon, ThumbsUp } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import _ from "lodash";
import {
  ReactionType,
  ReactionTypeToUnifiedMap,
  UnifiedToReactionTypeMap,
} from "@/types/reaction.type";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { useCreateReactionByPostId } from "@/hooks/useCreateReactionByPostIdMutation";
import { useDeleteReactionByPostId } from "@/hooks/useDeleteReactionByPostIdMutation";
import { PostCurrentReactStatus, PostPrimaryActions, PostReactAction } from "@/types/post-action.type";
import { useState } from "react";
import { PostActions as PostActionsEnum } from "@/types/action.type";
import { PostReactionCountsPreview } from "./post-reaction-counts";
import { generatePost } from "@/mocks/generators";

type PostReactActionButtonProps = {
  postId: string;
  context: PostReactAction[PostActionsEnum.React];
};

export function PostReactActionButton({ postId, context }: PostReactActionButtonProps) {
  const [currentUserReaction, setCurrentUserReaction] = useState<ReactionType | null>(
    context.currentStatus === PostCurrentReactStatus.Reacted ? context.currentUserReaction : null
  );

  const createReactionByPostIdMutation = useCreateReactionByPostId(postId);
  const deleteReactionByPostIdMutation = useDeleteReactionByPostId(postId);

  const handleReactionClick = (reactionType: ReactionType | null) => {
    if (reactionType) {
      setCurrentUserReaction(reactionType);
      createReactionByPostIdMutation.mutate(reactionType, {
        onError: () => {
          setCurrentUserReaction(null);
        },
      });
    } else {
      setCurrentUserReaction(null);
      deleteReactionByPostIdMutation.mutate(undefined, {
        onError: () => {
          if (context.currentStatus === PostCurrentReactStatus.Reacted) {
            setCurrentUserReaction(context.currentUserReaction);
          } else {
            setCurrentUserReaction(null);
          }
        },
      });
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={!context.isEnable || createReactionByPostIdMutation.isLoading || deleteReactionByPostIdMutation.isLoading}
          onClick={() => {
            handleReactionClick(currentUserReaction ? null : ReactionType.Like);
          }}
        >
          {currentUserReaction !== null ? (
            <Emoji unified={ReactionTypeToUnifiedMap[currentUserReaction]} size={24} />
          ) : (
            <ThumbsUp className="size-4" />
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="z-20 w-fit p-0">
        <EmojiPicker
          style={{ border: "none" }}
          reactionsDefaultOpen={true}
          allowExpandReactions={false}
          onEmojiClick={(emoji) => {
            handleReactionClick(UnifiedToReactionTypeMap[emoji.unified]);
          }}
        />
      </HoverCardContent>
    </HoverCard>
  );
}

type PostActionsProps = {
  postId: string;
  action: PostPrimaryActions;
};

export function PostActions({ postId, action }: PostActionsProps) {
  return (
    <div className="flex w-full justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <PostReactActionButton postId={postId} context={action[PostActionsEnum.React]} />
        <Button variant="ghost" size="icon">
          <MessageCircleIcon className="size-4" />
          <span className="sr-only">Comment</span>
        </Button>
        <Button variant="ghost" size="icon">
          <ShareIcon className="size-4" />
          <span className="sr-only">Share</span>
        </Button>
      </div>

      <div className="flex items-center gap-5">
        <PostReactionCountsPreview post={generatePost()} />
        <div className="flex items-center gap-1">
          <MessageCircleIcon className="size-4 text-blue-500" />
          <span className="text-sm">{generatePost().commentCounts}</span>
        </div>
      </div>
    </div>

  );
}
