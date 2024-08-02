import type { User } from "@/lib/api/types/user.type";
import { faker } from "@faker-js/faker";

export const generateUser = (user: Partial<User>): User => ({
  id: faker.string.uuid(),
  avatar: faker.image.avatar(),
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
