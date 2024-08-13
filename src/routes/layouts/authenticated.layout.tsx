import { Navigate, Outlet } from "react-router-dom";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MenuIcon, PlusIcon } from "lucide-react";
import Logo from "@/assets/logo.svg";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useUserStore } from "@/stores/user.store";

export function AuthenticatedLayout() {
  const { isLoading } = useCurrentUser();
  const user = useUserStore((state) => state.user);

  if (!user && !isLoading) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-14 items-center justify-between px-4 sm:px-6 md:h-16">
          <Link href="/" className="flex items-center gap-2">
            <img src={Logo} alt="Infinity Net" className="h-8 w-auto" />
            <span className="sr-only">Infinity Net</span>
          </Link>
          <nav className="hidden space-x-4 md:flex">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/explore" className="nav-link">
              Explore
            </Link>
            <Link href="/notifications" className="nav-link">
              Notifications
            </Link>
            <Link href="/messages" className="nav-link">
              Messages
            </Link>
            <Link href={`/users/${user?.id}`} className="nav-link">
              Profile
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Button variant="outline" className="hidden sm:inline-flex">
              <PlusIcon className="h-4 w-4 mr-2" />
              Post
            </Button>
            <Link href={`/users/${user?.id}`} className="hidden sm:inline-flex">
              <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
