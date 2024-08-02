import { useUserStore } from "@/stores/user.store";
import { UnauthenticatedLayout } from "./unauthenticated.layout";
import { AuthenticatedLayout } from "./authenticated.layout";

export function GenericLayout() {
  const { user } = useUserStore.getState();

  if (!user) {
    return <UnauthenticatedLayout />;
  }
  return <AuthenticatedLayout />;
}
