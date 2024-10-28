import { User } from ".";

export type CreateUserParams = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
};

export type CreateUserResponse = {
  data: User;
};
