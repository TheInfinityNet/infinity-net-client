import { Navigate, Outlet } from "react-router-dom";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MenuIcon } from "lucide-react";
import Logo from "@/assets/logo.svg";
import { useAuth } from "@/contexts/auth.context";

export function AuthenticatedLayout() {
  const { user } = useAuth();

  if (!user) {
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
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
