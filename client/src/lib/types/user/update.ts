import { User } from ".";

export type UpdateUserParams = {
  id: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  password?: string;
  newPassword?: string;
};

export type UpdateUserResponse = {
  data: User;
  message: string;
  status: "success" | "error";
};
