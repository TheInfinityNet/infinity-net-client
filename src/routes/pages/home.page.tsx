import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "@/components/link";
import {
  Ellipsis,
  FilterIcon,
  HeartIcon,
  MessageCircleIcon,
  MoveHorizontalIcon,
  PlusIcon,
  SettingsIcon,
  ShareIcon,
} from "lucide-react";

interface FollowCardProps {
  name: string;
  username: string;
}

interface PostCardProps {
  name: string;
  username: string;
  content: string;
}

interface TrendingItemProps {
  topic: string;
  likes: number; // corrected to number to match likes count
}

export function HomePage() {
  return (
    <>
      <div className="hidden md:block">
        <div className="sticky top-16 space-y-4">
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Who to follow</h3>
            <FollowList />
          </div>
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Your profile</h3>
            <ProfileLink />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">News Feed</h2>
            <Button variant="ghost" size="icon">
              <FilterIcon className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
          <NewsFeed />
        </div>
      </div>
      <div className="hidden md:block">
        <div className="sticky top-16 space-y-4">
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Trending</h3>
            <TrendingList />
          </div>
        </div>
      </div>
    </>
  );
}

function FollowList() {
  return (
    <div className="grid gap-2">
      <FollowCard name="Infinity Net" username="@infinitynet" />
      <FollowCard name="Jane Doe" username="@janedoe" />
      <FollowCard name="John Smith" username="@johnsmith" />
    </div>
  );
}

function FollowCard({ name, username }: FollowCardProps) {
  return (
    <Link
      href="#"
      className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-muted"
    >
      <Avatar className="h-8 w-8 overflow-hidden rounded-full">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>IN</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{username}</p>
      </div>
      <Button variant="ghost" size="icon">
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Follow</span>
      </Button>
    </Link>
  );
}

function ProfileLink() {
  return (
    <Link
      href="#"
      className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-muted"
    >
      <Avatar className="h-8 w-8 overflow-hidden rounded-full">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>IN</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-medium">Infinity Net</p>
        <p className="text-sm text-muted-foreground">@infinitynet</p>
      </div>
      <Button variant="ghost" size="icon">
        <SettingsIcon className="h-4 w-4" />
        <span className="sr-only">Settings</span>
      </Button>
    </Link>
  );
}

function NewsFeed() {
  return (
    <div className="grid gap-4">
      <PostCard
        name="Infinity Net"
        username="@infinitynet"
        content="Excited to announce our latest product launch! Check it out and let us know what you think."
      />
      <PostCard
        name="Jane Doe"
        username="@janedoe"
        content="Loving the new updates to the platform! Can't wait to see what's next."
      />
    </div>
  );
}

function PostCard({ name, username, content }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center flex-row gap-2">
        <Avatar className="size-12 overflow-hidden rounded-full">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{username}</p>
        </div>
        <Button variant="ghost" size="icon">
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">More</span>
        </Button>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <HeartIcon className="h-4 w-4" />
          <span className="sr-only">Like</span>
        </Button>
        <Button variant="ghost" size="icon">
          <MessageCircleIcon className="h-4 w-4" />
          <span className="sr-only">Comment</span>
        </Button>
        <Button variant="ghost" size="icon">
          <ShareIcon className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

function TrendingList() {
  return (
    <div className="grid gap-2">
      <TrendingItem topic="Infinity Product Launch" likes={12300} />
      <TrendingItem topic="Remote Work Tips" likes={8700} />
      <TrendingItem topic="Tech Innovations" likes={6200} />
    </div>
  );
}

function TrendingItem({ topic, likes }: TrendingItemProps) {
  return (
    <Link
      href="#"
      className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-muted"
    >
      <div className="flex-1">
        <p className="font-medium">{topic}</p>
        <p className="text-sm text-muted-foreground">
          {likes.toLocaleString()} Likes
        </p>
      </div>
    </Link>
  );
}
