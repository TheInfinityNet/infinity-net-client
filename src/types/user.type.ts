export const UserEndpoints = {
  GetCurrentUser: "/users/current-user",
  GetUser: "/users/:userId",
  UpdateUser: "/users/:userId",
  DeleteUser: "/users/:userId",
} as const;

export type User = {
  id: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  name?: string;
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

export type GetUserInput = {
  userId: string;
};
export type GetUserResponse = {
  user: User;
};

export type UpdateUserInput = {
  userId: string;
  user: User;
};
export type UpdateUserResponse = {
  user: User;
};

export type DeleteUserInput = {
  userId: string;
};
export type DeleteUserResponse = {
  message: string;
};
