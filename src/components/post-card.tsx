import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  AngryIcon,
  Ellipsis,
  FrownIcon,
  HeartIcon,
  LaughIcon,
  MessageCircleIcon,
  ShareIcon,
  ThumbsUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/lib/api/types/post.type";
import { Link } from "./link";
import { PostComments } from "./post-comments";
import { ReplyComment } from "./reply-comment";
import { HoverCard } from "./ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import _ from "lodash";
import { ReactionType } from "@/lib/api/types/reaction.type";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { user, content, createdAt } = post;
  if (!user) return null;

  return (
    <Card>
      <CardHeader className="flex items-center flex-row gap-2">
        <Avatar className="size-12 overflow-hidden rounded-full">
          <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} />
          <AvatarFallback>{user.lastName}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Link href={`/users/${user.id}`}>
            <p className="font-medium">{user?.firstName}</p>
            <p className="text-sm text-muted-foreground">@{user?.username}</p>
          </Link>
          <p className="text-xs text-muted-foreground">{createdAt}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis className="size-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save post</DropdownMenuItem>
            <DropdownMenuItem>Hide post</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Report post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <p>{content}</p>
      </CardContent>

      <CardFooter className="grid">
        <div className="flex w-full justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn({
                    "bg-primary text-white": post.currentUserReaction,
                  })}
                >
                  {(() => {
                    if (post.currentUserReaction) {
                      if (post.currentUserReaction.type === ReactionType.Like) {
                        return <ThumbsUp className="size-4" />;
                      }
                      if (post.currentUserReaction.type === ReactionType.Love) {
                        return <HeartIcon className="size-4" />;
                      }
                      if (post.currentUserReaction.type === ReactionType.Haha) {
                        return <LaughIcon className="size-4" />;
                      }
                      if (post.currentUserReaction.type === ReactionType.Sad) {
                        return <FrownIcon className="size-4" />;
                      }
                      if (
                        post.currentUserReaction.type === ReactionType.Angry
                      ) {
                        return <AngryIcon className="size-4" />;
                      }
                    }
                    return <ThumbsUp className="size-4" />;
                  })()}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="z-20">
                <Card>
                  <CardContent className="flex items-center p-4 gap-2">
                    <ThumbsUp className="size-4" />
                    <HeartIcon className="size-4" />
                    <LaughIcon className="size-4" />
                    <FrownIcon className="size-4" />
                    <AngryIcon className="size-4" />
                  </CardContent>
                </Card>
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
          <div className="flex items-center gap-5">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-1">
                  {_.chain(post.reactionCounts)
                    .toPairs()
                    .sortBy(([, count]) => -count)
                    .take(3)
                    .map(([reaction]) => (
                      <div
                        key={reaction}
                        className="flex items-center gap-1 text-sm text-muted-foreground"
                      >
                        {reaction === ReactionType.Like && (
                          <ThumbsUp className="size-4" />
                        )}
                        {reaction === ReactionType.Love && (
                          <HeartIcon className="size-4" />
                        )}
                        {reaction === ReactionType.Haha && (
                          <LaughIcon className="size-4" />
                        )}
                        {reaction === ReactionType.Sad && (
                          <FrownIcon className="size-4" />
                        )}
                        {reaction === ReactionType.Angry && (
                          <AngryIcon className="size-4" />
                        )}
                      </div>
                    ))
                    .value()}

                  <span className="text-sm">
                    {_.chain(post.reactionCounts).values().sum().value()}
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="z-20">
                List users who reacted :D
              </HoverCardContent>
            </HoverCard>
            <div className="flex items-center gap-1">
              <MessageCircleIcon className="size-4 text-blue-500" />
              <span className="text-sm">{post.commentCounts}</span>
            </div>
          </div>
        </div>

        <PostComments postId={post.id} />

        <ReplyComment postId={post.id} />
      </CardFooter>
    </Card>
  );
}
