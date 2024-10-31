import { Role, User } from ".";
import { Chains } from "..";

export type CreateUserParams = {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  minHourlyRate?: number;
  maxHourlyRate?: number;
  preferredBlockchain: Chains;
};

export type CreateUserResponse = {
  data: User;
  message: string;
  status: "success" | "error";
};
