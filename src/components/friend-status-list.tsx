import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetFriendsByUserId } from "@/hooks/useGetFriendsByUserId";
import { useUserStore } from "@/stores/user.store";
import { useDebounce } from "@uidotdev/usehooks";

export function FriendStatusList() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const user = useUserStore((state) => state.user);
  if (!user) return null;

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetFriendsByUserId(user.id, { query: debouncedQuery });

  const friends = data?.pages.flatMap((page) => page.data.friends) ?? [];

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Friends</CardTitle>
        <Input
          type="search"
          placeholder="Search friends..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[75vh] pr-4">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center space-x-4 mb-4">
              <Avatar>
                <AvatarImage src={friend.avatar} alt={friend.firstName} />
                <AvatarFallback>
                  {friend.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {friend.firstName} {friend.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {true ? "Online" : "Offline"}
                </p>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${true ? "bg-green-500" : "bg-gray-300"}`}
              />
            </div>
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
                {friends.length} of{" "}
                {data?.pages[0].data.metadata.pagination.totalCount}
              </span>
            </div>
          )}
          {isError && <div>Error loading friends</div>}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
