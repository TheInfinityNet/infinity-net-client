import { faker } from "@faker-js/faker";
import { PostCard } from "../post-card";

export function NewsFeed() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 50 }).map((_, index) => (
        <PostCard
          key={index}
          name={faker.person.fullName()}
          username={`@${faker.internet.userName()}`}
          content={faker.lorem.paragraph()}
        />
      ))}
    </div>
  );
}
