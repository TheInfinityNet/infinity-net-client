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
import { AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { BellRing, Check, Ellipsis, User } from "lucide-react";

const notifications = [
  {
    id: "1",
    type: "like",
    user: {
      id: "101",
      name: "John Doe",
      profileImageUrl: "https://example.com/profile/101.jpg",
    },
    content: "John Doe liked your post.",
    timestamp: "2024-07-30T12:34:56Z",
  },
  {
    id: "2",
    type: "comment",
    user: {
      id: "102",
      name: "Jane Smith",
      profileImageUrl: "https://example.com/profile/102.jpg",
    },
    content: "Jane Smith commented on your photo.",
    timestamp: "2024-07-30T12:35:56Z",
  },
  {
    id: "3",
    type: "follow",
    user: {
      id: "103",
      name: "Emily Johnson",
      profileImageUrl: "https://example.com/profile/103.jpg",
    },
    content: "Emily Johnson started following you.",
    timestamp: "2024-07-30T12:36:56Z",
  },
  {
    id: "4",
    type: "mention",
    user: {
      id: "104",
      name: "Michael Brown",
      profileImageUrl: "https://example.com/profile/104.jpg",
    },
    content: "Michael Brown mentioned you in a comment.",
    timestamp: "2024-07-30T12:37:56Z",
  },
  {
    id: "5",
    type: "share",
    user: {
      id: "105",
      name: "Sarah Davis",
      profileImageUrl: "https://example.com/profile/105.jpg",
    },
    content: "Sarah Davis shared your post.",
    timestamp: "2024-07-30T12:38:56Z",
  },
];

export function NotificationPage() {
  return (
    <div className="max-w-5xl container mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
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
              <div
                key={notification.id}
                className="flex items-center space-x-4 rounded-md border p-4 mb-4"
              >
                <Avatar className="size-10 overflow-hidden rounded-full">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleString()}
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
                </DropdownMenu>{" "}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
