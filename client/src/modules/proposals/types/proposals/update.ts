import { Proposal } from ".";

export type UpdateProposalParams = {
  id: string;
};

export type UpdateProposalResponse = {
  data: Proposal;
  message: string;
  status: "success" | "error";
};
