import { FriendStatusList } from "@/components/friend-status-list";
import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router-dom";

export function FeedLayout() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] gap-8 px-4 sm:px-6">
      <div className="hidden xl:block">
        <div className="sticky top-20">
          <Sidebar />
        </div>
      </div>

      <div className="space-y-4 max-w-screen-md mx-auto">
        <Outlet />
      </div>

      <div className="hidden sm:block">
        <div className="sticky top-20">
          <FriendStatusList />
        </div>
      </div>
    </main>
  );
}
