import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import Logo from "@/assets/logo.svg";

export function UnauthenticatedLayout() {
  return (
    <div>
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src={Logo} alt="Infinity Net" className="h-8 w-auto" />
          <span className="sr-only">Infinity Net</span>
        </Link>{" "}
        <Link href="/sign-in">
          <Button>Sign Up</Button>
        </Link>
      </header>
      <Outlet />
    </div>
  );
}
