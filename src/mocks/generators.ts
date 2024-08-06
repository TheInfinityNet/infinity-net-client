import type { User } from "@/lib/api/types/user.type";
import type { Post } from "@/lib/api/types/post.type";
import type { Comment } from "@/lib/api/types/comment.type";
import { faker } from "@faker-js/faker";

export const generateUser = (user?: Partial<User>): User => ({
  id: faker.string.uuid(),
  avatar: faker.image.avatar(),
  cover: faker.image.url(),
  email: faker.internet.email(),
  bio: faker.lorem.paragraph(),
  username: faker.internet.userName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  middleName: faker.person.middleName(),
  mobileNumber: faker.phone.number(),
  birthdate: faker.date.past().toISOString(),
  acceptTerms: true,
  gender: faker.person.sex(),
  password: faker.internet.password(),
  ...user,
});

export const generatePost = (post?: Partial<Post>): Post => ({
  id: faker.string.uuid(),
  user: generateUser(),
  content: faker.lorem.paragraph(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  ...post,
});

export const generateComment = (comment?: Partial<Comment>): Comment => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  user: generateUser(),
  postId: faker.string.uuid(),
  parentId: faker.string.uuid(),
  content: faker.lorem.paragraph(),
  childrenCount: faker.number.int({ min: 0, max: 10 }),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  ...comment,
});
