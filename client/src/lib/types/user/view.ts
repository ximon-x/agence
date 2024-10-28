import { User } from ".";

export type GetUserParams = {
  id: string;
};

export type GetUserResponse = {
  data: User;
};
