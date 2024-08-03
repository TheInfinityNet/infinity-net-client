import { Link } from "../link";

interface TrendingItemProps {
  topic: string;
  likes: number;
}

export function TrendingList() {
  return (
    <div className="grid gap-2">
      <TrendingItem topic="Infinity Product Launch" likes={12300} />
      <TrendingItem topic="Remote Work Tips" likes={8700} />
      <TrendingItem topic="Tech Innovations" likes={6200} />
    </div>
  );
}

export function TrendingItem({ topic, likes }: TrendingItemProps) {
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
