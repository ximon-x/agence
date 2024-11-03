import { Proposal } from ".";

export type GetProposalsParams = unknown;

export type GetProposalsResponse = {
  data: Proposal[];
  message: string;
  status: "success" | "error";
};
