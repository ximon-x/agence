import { Proposal } from ".";

export type GetProposalParams = {
  id: string;
};

export type GetProposalResponse = {
  data: Proposal;
  message: string;
  status: "success" | "error";
};
