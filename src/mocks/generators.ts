import type { User } from "@/lib/api/types/user.type";
import { faker } from "@faker-js/faker";

export const generateUser = (): User => ({
  id: faker.string.uuid(),
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  middleName: faker.person.middleName(),
  mobileNumber: faker.phone.number(),
  birthdate: faker.date.past().toISOString(),
  acceptTerms: true,
  gender: faker.person.sex(),
  password: faker.internet.password(),
});
