import { Gig } from ".";

export type DeleteGigParams = {
  id: string;
};

export type DeleteGigResponse = {
  data: Gig;
  message: string;
  status: "success" | "error";
};
