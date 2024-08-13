import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { NewsFeed } from "@/components/widgets/feed";
import { PostComposer } from "@/components/post-composer";

export function HomePage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">News Feed</h2>
        <Button variant="ghost" size="icon">
          <FilterIcon className="size-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>
      <PostComposer />
      <NewsFeed />
    </>
  );
}
