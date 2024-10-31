import { User } from ".";

export type DeleteUserParams = {
  id: string;
};

export type DeleteUserResponse = {
  data: User;
  message: string;
  status: "success" | "error";
};
