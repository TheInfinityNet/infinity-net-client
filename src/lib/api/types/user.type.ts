export type User = {
  id: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  username: string;
  email: string;
  password: string;
  mobileNumber: string;
  birthdate: string;
  gender: string;
  acceptTerms: boolean;
};

export type UserDetail = {
  userId: string;
  relationshipStatus?: string;
  hobbies?: string[];
  interests?: string[];
  languages?: string[];
};
