import { Gig } from ".";

export type GetGigsParams = unknown;

export type GetGigsResponse = {
  data: Gig[];
  message: string;
  status: "success" | "error";
};
