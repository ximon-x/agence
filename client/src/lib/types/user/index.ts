import { Chains } from "..";

export type Role = "Ace" | "Agency";

export type User = {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  minHourlyRate?: number;
  maxHourlyRate?: number;
  preferredBlockchain: Chains;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export * from "./create";
export * from "./delete";
export * from "./list";
export * from "./update";
export * from "./view";
