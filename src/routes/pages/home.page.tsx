import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "@/components/link";
import { FilterIcon, SettingsIcon } from "lucide-react";
import { TrendingList } from "@/components/widgets/trending";
import { NewsFeed } from "@/components/widgets/feed";
import { FollowList } from "@/components/widgets/follow";
import { PostComposer } from "@/components/post-composer";

export function HomePage() {
  return (
    <main className="grid flex-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr_240px]">
      <div className="hidden lg:block">
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

      <div className="space-y-4 max-w-screen-md justify-self-center">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">News Feed</h2>
            <Button variant="ghost" size="icon">
              <FilterIcon className="size-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
          <PostComposer />
          <NewsFeed />
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-16 space-y-4">
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Trending</h3>
            <TrendingList />
          </div>
        </div>
      </div>
    </main>
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
        <SettingsIcon className="size-4" />
        <span className="sr-only">Settings</span>
      </Button>
    </Link>
  );
}
