import { UnauthenticatedLayout } from "./unauthenticated.layout";
import { AuthenticatedLayout } from "./authenticated.layout";
import { useAuth } from "@/contexts/auth.context";

export function GenericLayout() {
  const { user } = useAuth();

  if (!user) {
    return <UnauthenticatedLayout />;
  }
  return <AuthenticatedLayout />;
}
