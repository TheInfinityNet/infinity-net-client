import { FollowCard } from "../follow-card";

export function FollowList() {
  return (
    <div className="grid gap-2">
      <FollowCard name="Infinity Net" username="@infinitynet" />
      <FollowCard name="Jane Doe" username="@janedoe" />
      <FollowCard name="John Smith" username="@johnsmith" />
    </div>
  );
}
