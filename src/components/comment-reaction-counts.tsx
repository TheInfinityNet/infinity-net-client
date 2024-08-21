import { Comment } from "@/types/comment.type";
import { HoverCard } from "./ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import _ from "lodash";
import { ReactionType, ReactionTypeToUnifiedMap } from "@/types/reaction.type";
import { Emoji } from "emoji-picker-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useGetReactionsByCommentId } from "@/hooks/useGetReactionsByCommentId";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "./link";

type CommentReactionCountPreviewProps = {
  comment: Comment;
};

export function CommentReactionCountsPreview({
  comment,
}: CommentReactionCountPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { data, isLoading, isError } = useGetReactionsByCommentId(
    comment.id,
    isHovered,
  );
  const reactions = data?.pages.flatMap((page) => page.data.reactions) ?? [];
  const totalReactions =
    data?.pages.at(-1)?.data.metadata.pagination.totalCount;
  const totalReactionsLeft = totalReactions
    ? totalReactions - reactions.length
    : 0;

  return (
    <Dialog>
      <DialogTrigger>
        <HoverCard
          onOpenChange={() => {
            setIsHovered(true);
          }}
        >
          <HoverCardTrigger asChild>
            <div className="flex items-center gap-1">
              {_.chain(comment.reactionCounts)
                .toPairs()
                .sortBy(([, count]) => -count)
                .take(3)
                .map(([reaction]) => (
                  <div
                    key={reaction}
                    className="flex items-center gap-1 text-sm text-muted-foreground"
                  >
                    <Emoji
                      unified={
                        ReactionTypeToUnifiedMap[reaction as ReactionType]
                      }
                      size={16}
                    />
                  </div>
                ))
                .value()}

              <span className="text-sm">
                {_.chain(comment.reactionCounts).values().sum().value()}
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="z-20">
            <Card>
              <CardContent className="p-4">
                <ul className="">
                  {reactions.map((reaction) => (
                    <li key={reaction.id} className="flex items-center gap-2">
                      <Emoji
                        unified={ReactionTypeToUnifiedMap[reaction.type]}
                        size={16}
                      />
                      <span className="text-sm">
                        {reaction?.user?.username}
                      </span>
                    </li>
                  ))}
                  {isError && <li>Error loading reactions</li>}
                  {isLoading && <li>Loading...</li>}
                  {reactions.length === 0 && <li>No reactions yet</li>}
                  {totalReactionsLeft === 0 && <li>No more reactions left</li>}
                  {totalReactionsLeft > 0 && (
                    <li className="flex items-center gap-2">
                      <span className="text-sm">
                        And {totalReactionsLeft} more...
                      </span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </HoverCardContent>
        </HoverCard>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reactions</DialogTitle>
          <DialogDescription>Number of reactions</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <CommentReactionCountsDetails comment={comment} />
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}

type CommentReactionCountDetailsProps = {
  comment: Comment;
};

export function CommentReactionCountsDetails({
  comment,
}: CommentReactionCountDetailsProps) {
  const commentId = comment.id;

  const [selectedReaction, setSelectedReaction] = useState<
    ReactionType | "all"
  >("all");

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetReactionsByCommentId(commentId, true, {
      type: selectedReaction === "all" ? undefined : selectedReaction,
    });

  const reactions = data?.pages.flatMap((page) => page.data.reactions) ?? [];

  return (
    <Tabs
      defaultValue="all"
      className="w-full pt-4"
      value={selectedReaction}
      onValueChange={(value) => setSelectedReaction(value as ReactionType)}
    >
      <TabsList className="w-full flex justify-start">
        <TabsTrigger value="all">All</TabsTrigger>
        {Object.keys(comment.reactionCounts as Object).map((reaction) => (
          <TabsTrigger key={reaction} value={reaction}>
            <Emoji
              unified={ReactionTypeToUnifiedMap[reaction as ReactionType]}
              size={16}
            />
          </TabsTrigger>
        ))}
      </TabsList>
      <ScrollArea className="h-[60vh] w-full rounded-md border mt-2">
        <div className="p-4 grid gap-y-2">
          {reactions.map((reaction) => (
            <Link key={reaction.id} href={`/users/${reaction.userId}`}>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src={reaction?.user?.avatar || "/placeholder.jpg"}
                    />
                    <AvatarFallback>{reaction?.user?.username}</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0">
                    <Emoji
                      unified={ReactionTypeToUnifiedMap[reaction.type]}
                      size={16}
                    />
                  </span>
                </div>
                <span className="text-sm">{reaction?.user?.username}</span>
              </div>
            </Link>
          ))}
          {hasNextPage && (
            <div className="flex justify-between items-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isLoading}
                className="text-sm text-muted-foreground"
              >
                {isLoading ? "Loading..." : "Load more"}
              </button>
              <span className="text-sm text-muted-foreground">
                {data?.pages.at(-1)?.data.metadata.pagination.nextOffset} of{" "}
                {data?.pages.at(-1)?.data.metadata.pagination.totalCount}
              </span>
            </div>
          )}
          {isError && <div>Error loading reactions</div>}
        </div>
      </ScrollArea>
    </Tabs>
  );
}
