import { User } from ".";

export type GetUsersParams = unknown;

export type GetUsersResponse = {
  data: User[];
  message: string;
  status: "success" | "error";
};
