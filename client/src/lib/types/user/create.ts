import { Role, User } from ".";

export type CreateUserParams = {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
};

export type CreateUserResponse = {
  data: User;
};
