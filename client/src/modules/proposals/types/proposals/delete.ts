import { Proposal } from ".";

export type DeleteProposalParams = {
  id: string;
};

export type DeleteProposalResponse = {
  data: Proposal;
  message: string;
  status: "success" | "error";
};
