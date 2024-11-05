export type ProposalStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Removed"
  | "Expired";

export type ProposalKind =
  | "ReportScam"
  | "ReportSpam"
  | "ReportSham"
  | "ChangePolicy";

export type Votes = {
  approve: number;
  reject: number;
  remove: number;
};

export type Proposal = {
  id: number;
  title: string;
  proposer: string;
  offender?: string;
  description?: string;
  proposalKind: ProposalKind;
  votes: Votes;
  proposalStatus: ProposalStatus;
  submissionTime: string;
};

export * from "./create";
export * from "./delete";
export * from "./list";
export * from "./update";
export * from "./view";
