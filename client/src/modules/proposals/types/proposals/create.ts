import { Proposal, ProposalKind } from ".";

export type CreateProposalParams = {
  title: string;
  proposer: string;
  offender?: string;
  description?: string;
  proposalKind: ProposalKind;
};

export type CreateProposalResponse = {
  data: Proposal;
  message: string;
  status: "success" | "error";
};
