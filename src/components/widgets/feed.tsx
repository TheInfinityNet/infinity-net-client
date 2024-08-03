import { PostCard } from "../post-card";

export function NewsFeed() {
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
