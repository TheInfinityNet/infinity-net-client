import { MessageCircleIcon, ShareIcon, ThumbsUp } from "lucide-react";
import { Post } from "@/lib/api/types/post.type";
import { HoverCard } from "./ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import _ from "lodash";
import {
  ReactionTypeToUnifiedMap,
  UnifiedToReactionTypeMap,
} from "@/lib/api/types/reaction.type";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { Button } from "@/components/ui/button";

type PostActionsProps = {
  post: Post;
};

export function PostActions({ post }: PostActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="icon">
            {(() => {
              if (post.currentUserReaction) {
                return (
                  <Emoji
                    unified={
                      ReactionTypeToUnifiedMap[post.currentUserReaction.type]
                    }
                    size={24}
                  />
                );
              }
              return <ThumbsUp className="size-4" />;
            })()}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="z-20">
          <EmojiPicker
            reactionsDefaultOpen={true}
            allowExpandReactions={false}
            onEmojiClick={(emoji) => {
              console.log(emoji.unified);
              console.log(UnifiedToReactionTypeMap[emoji.unified]);
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
