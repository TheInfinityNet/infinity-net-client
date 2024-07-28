import type { User } from "@/lib/api/types/user.type";
import { faker } from "@faker-js/faker";

export const generateUser = (): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  middleName: faker.person.middleName(),
  mobileNumber: faker.phone.number(),
  birthdate: faker.date.past().toISOString(),
  termsAccepted: true,
  gender: faker.person.sex(),
  password: faker.internet.password(),
});
