import { Link } from "@/components/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useGetNotifications } from "@/hooks/useGetNotifications";
import { Notification, NotificationType } from "@/types/notification.type";
import { AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { BellRing, Check, Ellipsis, User } from "lucide-react";

export function NotificationCard({
  notification,
}: {
  notification: Notification;
}) {
  let link: string = "";
  let image: string | undefined = "";

  switch (notification.type) {
    case NotificationType.Reaction:
      link = `/posts/${notification.postId}`;
      image = notification.user?.avatar;
      break;
    case NotificationType.Tag:
      link = `/posts/${notification.postId}`;
      image = notification.user?.avatar;
      break;
    case NotificationType.Reply:
      link = `/posts/${notification.postId}`;
      image = notification.user?.avatar;
      break;
    case NotificationType.Share:
      link = `/posts/${notification.postId}`;
      image = notification.user?.avatar;
      break;
    case NotificationType.Story:
      link = `/stories/${notification.storyId}`;
      image = notification.user?.avatar;
      break;
    case NotificationType.Follow:
      link = `/users/${notification.userId}`;
      image = notification.user?.avatar;
      break;
    case NotificationType.Comment:
      link = `/posts/${notification.postId}`;
      image = notification.user?.avatar;
      break;
    case NotificationType.Mention:
      link = `/posts/${notification.postId}`;
      image = notification.user?.avatar;
      break;
    case NotificationType.Message:
      link = `/messages/${notification.messageId}`;
      image = notification.user?.avatar;
      break;
    case NotificationType.FriendRequest:
      link = `/users/${notification.userId}`;
      image = notification.user?.avatar;
      break;
    case NotificationType.GroupInvitation:
      link = `/groups/${notification.groupId}`;
      image = notification.user?.avatar;
      break;
  }

  return (
    <div className="flex items-center space-x-4 rounded-md border p-4 mb-4">
      <Avatar className="size-10 overflow-hidden rounded-full">
        <AvatarImage src={image ?? "/placeholder-user.jpg"} />
        <AvatarFallback>IN</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Link href={link}>
          <p className="text-sm font-medium leading-none">
            {notification.type}
          </p>
        </Link>
        <p className="text-xs text-muted-foreground">
          {new Date(notification.createdAt).toLocaleString()}
          {notification.isRead && (
            <span className="ml-2 size-2 bg-primary rounded-full inline-block" />
          )}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function NotificationPage() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetNotifications();

  const notifications =
    data?.pages.flatMap((page) => page.data.notifications) ?? [];

  return (
    <div className="max-w-5xl container mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
          <Button className="w-full">
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Send notifications to device.
              </p>
            </div>
            <Switch />
          </div>
          <div>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
            {isError && <p>Error loading notifications</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
