import { Gig } from ".";

export type UpdateGigParams = {
  id: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  password?: string;
  newPassword?: string;
};

export type UpdateGigResponse = {
  data: Gig;
  message: string;
  status: "success" | "error";
};
