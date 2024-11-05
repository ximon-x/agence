import { Gig } from ".";

export type UpdateGigParams = {
  id: string;
};

export type UpdateGigResponse = {
  data: Gig;
  message: string;
  status: "success" | "error";
};
