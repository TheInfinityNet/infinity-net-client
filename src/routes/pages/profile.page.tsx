import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "@/components/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useGetPostByUserId } from "@/hooks/useGetPostsByUserId";
import { PostCard } from "@/components/post-card";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { User } from "@/lib/api/types/user.type";
import { useGetFriendsByUserId } from "@/hooks/useGetFriendsByUserId";
import { useGetUserProfileByUserId } from "@/hooks/useGetUserProfileByUserId";
import { FriendshipStatus } from "@/lib/api/types/friend.type";

function FriendsList({ friends }: { friends: User[] }) {
  return (
    <div className="">
      {friends.map((friend, index) => (
        <Link
          href={`/users/${friend.id}`}
          className="group flex items-center justify-center "
          key={index}
        >
          <div
            key={friend.id}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>{friend.username}</AvatarFallback>
              </Avatar>
              <span className="ml-3">{friend.name}</span>
            </div>
            <Button variant="secondary" size="sm">
              View Profile
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
}

type ProfileFriendsSectionProps = {
  userId: string;
};

function ProfileFriendsSection({ userId }: ProfileFriendsSectionProps) {
  const [activeTab, setActiveTab] = useState("all-friends");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetFriendsByUserId(userId);

  const friends = data?.pages.flatMap((page) => page.data.friends) || [];

  return (
    <Tabs
      defaultValue="all-friends"
      value={activeTab}
      onValueChange={setActiveTab}
      className=""
    >
      <TabsList>
        <TabsTrigger value="all-friends">All friends</TabsTrigger>
        <TabsTrigger value="recently-added">Recently Added</TabsTrigger>
        <TabsTrigger value="birthdays">Birthdays</TabsTrigger>
        <TabsTrigger value="current-city">Current City</TabsTrigger>
        <TabsTrigger value="hometown">Hometown</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      <TabsContent value="all-friends">
        <FriendsList friends={friends} />
        {hasNextPage && !isFetchingNextPage && (
          <button onClick={() => fetchNextPage()} className="mt-4">
            Load More
          </button>
        )}
        {isFetchingNextPage && <p>Loading more...</p>}{" "}
      </TabsContent>
      <TabsContent value="recently-added"></TabsContent>
      <TabsContent value="birthdays"></TabsContent>
      <TabsContent value="current-city"></TabsContent>
      <TabsContent value="hometown"></TabsContent>
      <TabsContent value="following"></TabsContent>
    </Tabs>
  );
}

function InfinitePost({ userId }: { userId: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPostByUserId(userId);

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.data.posts) ?? [],
    [data],
  );

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const fetchElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        handleLoadMore();
      }
    });

    const currentRef = fetchElementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchElementRef, hasNextPage, isFetchingNextPage, handleLoadMore]);

  return (
    <>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
      <div ref={fetchElementRef}>Loading more...</div>
    </>
  );
}

export function ProfilePage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>User not found</div>;
  }

  const { data, isLoading } = useGetUserProfileByUserId({ userId: id });
  const { user, friendshipStatus } = data ?? {
    user: null,
    friendshipStatus: null,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const renderFriendshipButton = () => {
    switch (friendshipStatus) {
      case FriendshipStatus.Self:
        return (
          <Button variant="secondary" size="sm">
            Edit Profile
          </Button>
        );
      case FriendshipStatus.Accepted:
        return (
          <Button variant="secondary" size="sm">
            Unfriend
          </Button>
        );
      case FriendshipStatus.SentRequest:
        return (
          <Button variant="secondary" size="sm">
            Cancel Request
          </Button>
        );
      case FriendshipStatus.ReceivedRequest:
        return (
          <Button variant="secondary" size="sm">
            Accept Friend
          </Button>
        );
      case FriendshipStatus.NotFriends:
        return (
          <Button variant="secondary" size="sm">
            Add Friend
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container w-full mx-auto">
      <div
        className="h-48 md:h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${user?.cover ?? "/placeholder.svg"})`,
        }}
      />
      <div className="relative -mt-16 md:-mt-20 bg-background">
        <div className="flex items-end p-4 md:p-6">
          <div className="relative -mt-12 md:-mt-16 w-24 h-24 md:w-32 md:h-32 bg-background rounded-full border-4 border-background">
            <img
              src={user?.avatar ?? "/placeholder.svg"}
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>
          <div className="ml-4 md:ml-6 flex-1">
            <h2 className="text-xl md:text-2xl font-bold">
              {user.middleName
                ? `${user.firstName} ${user.middleName} ${user.lastName}`
                : `${user.firstName} ${user.lastName}`}
            </h2>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
          {renderFriendshipButton()}
        </div>
        <div className="px-4 md:px-6 py-2 md:py-3 border-t border-muted">
          <p className="text-muted-foreground">{user?.bio}</p>
        </div>
      </div>

      <Tabs defaultValue="posts" className="">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="abouts">Abouts</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <InfinitePost userId={id} />
            </div>

            <div className="col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">About</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">Born</h4>
                      <p className="text-muted-foreground text-sm">
                        {format(new Date(user.birthdate), "MMMM dd, yyyy")}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Lives in</h4>
                      <p className="text-muted-foreground text-sm">
                        San Francisco, CA
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Relationship</h4>
                      <p className="text-muted-foreground text-sm">Single</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Joined</h4>
                      <p className="text-muted-foreground text-sm">
                        February 15, 2015
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Photos</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <img
                        key={index}
                        src="/placeholder.svg"
                        alt={`Photo ${index}`}
                        width={150}
                        height={150}
                        className="rounded-lg"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Friends</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 ">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Link
                        href="#"
                        className="group flex items-center justify-center flex-col"
                        key={index}
                      >
                        <Avatar className="w-12 h-12 group-hover:ring-2 group-hover:ring-primary">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <p className="mt-2 text-sm font-medium group-hover:underline">
                          Jane Doe
                        </p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="friends">
          <ProfileFriendsSection userId={id} />
        </TabsContent>
        <TabsContent value="photos">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 40 }).map((_, index) => (
              <img
                key={index}
                src="/placeholder.svg"
                alt={`Photo ${index}`}
                width={150}
                height={150}
                className="rounded-lg"
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos">
          {Array.from({ length: 40 }).map((_, index) => (
            <img
              key={index}
              src="/placeholder.svg"
              alt={`Video ${index}`}
              width={150}
              height={150}
              className="rounded-lg"
            />
          ))}
        </TabsContent>
        <TabsContent value="abouts">
          <Tabs defaultValue="overview" className="">
            <TabsList className="space-x-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="places">Places</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            <TabsContent value="overview"></TabsContent>
            <TabsContent value="work"></TabsContent>
            <TabsContent value="education"></TabsContent>
            <TabsContent value="places"></TabsContent>
            <TabsContent value="contact"></TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
