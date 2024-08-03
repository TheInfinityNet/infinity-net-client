import { User } from "./user.type";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Ellipsis,
  HeartIcon,
  MessageCircleIcon,
  ShareIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/lib/api/types/post.type";

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
          <p className="font-medium">{user?.firstName}</p>
          <p className="text-sm text-muted-foreground">@{user?.username}</p>
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

      <CardFooter className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <HeartIcon className="size-4" />
            <span className="sr-only">Like</span>
          </Button>
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
          <div className="flex items-center gap-1">
            <HeartIcon className="size-4 text-red-500" />
            <span className="text-sm">125</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircleIcon className="size-4 text-blue-500" />
            <span className="text-sm">25</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
