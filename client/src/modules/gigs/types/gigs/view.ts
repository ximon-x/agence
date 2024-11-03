import { Gig } from ".";

export type GetGigParams = {
  id: string;
};

export type GetGigResponse = {
  data: Gig;
  message: string;
  status: "success" | "error";
};
