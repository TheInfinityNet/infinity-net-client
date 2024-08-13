import { MessageCircleIcon, ShareIcon, ThumbsUp } from "lucide-react";
import { Post } from "@/lib/api/types/post.type";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import _ from "lodash";
import {
  Reaction,
  ReactionType,
  ReactionTypeToUnifiedMap,
  UnifiedToReactionTypeMap,
} from "@/lib/api/types/reaction.type";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateReactionByPostId } from "@/hooks/useCreateReactionByPostIdMutation";
import { useDeleteReactionByPostId } from "@/hooks/useDeleteReactionByPostIdMutation";

type PostActionsProps = {
  post: Post;
};

export function PostActions({ post }: PostActionsProps) {
  const [currentUserReaction, setCurrentUserReaction] =
    useState<Reaction | null>(post.currentUserReaction || null);

  const createReactionByPostIdMutation = useCreateReactionByPostId(post.id);
  const deleteReactionByPostIdMutation = useDeleteReactionByPostId(post.id);

  const handleReactionClick = (reactionType: ReactionType | null) => {
    if (reactionType) {
      const newReaction: Reaction = {
        type: reactionType,
        postId: post.id,
        userId: "",
        createdAt: "",
        updatedAt: "",
        id: "",
      };
      setCurrentUserReaction(newReaction);
      createReactionByPostIdMutation.mutate(reactionType, {
        onError: () => {
          setCurrentUserReaction(null);
        },
      });
    } else {
      setCurrentUserReaction(null);
      deleteReactionByPostIdMutation.mutate(undefined, {
        onError: () => {
          setCurrentUserReaction(post.currentUserReaction || null);
        },
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              handleReactionClick(
                currentUserReaction ? null : ReactionType.Like,
              );
            }}
          >
            {(() => {
              if (currentUserReaction) {
                return (
                  <Emoji
                    unified={ReactionTypeToUnifiedMap[currentUserReaction.type]}
                    size={24}
                  />
                );
              }
              return <ThumbsUp className="size-4" />;
            })()}
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
      <Button variant="ghost" size="icon">
        <MessageCircleIcon className="size-4" />
        <span className="sr-only">Comment</span>
      </Button>
      <Button variant="ghost" size="icon">
        <ShareIcon className="size-4" />
        <span className="sr-only">Share</span>
      </Button>
    </div>
  );
}
