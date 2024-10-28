export type Role = "admin" | "ace" | "agency";

export type User = {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export * from "./create";
export * from "./delete";
export * from "./list";
export * from "./update";
export * from "./view";
