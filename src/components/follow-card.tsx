import { PlusIcon } from "lucide-react";
import { Link } from "./link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface FollowCardProps {
  name: string;
  username: string;
}

export function FollowCard({ name, username }: FollowCardProps) {
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
        <PlusIcon className="size-4" />
        <span className="sr-only">Follow</span>
      </Button>
    </Link>
  );
}
