import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Ellipsis, MessageCircleIcon } from "lucide-react";
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
import _ from "lodash";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PostActions } from "./post-actions";
import { PostReactionCountsPreview } from "./post-reaction-counts";

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
          <PostActions post={post} />

          <div className="flex items-center gap-5">
            <PostReactionCountsPreview post={post} />
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
