export type Gig = {
  id: number;
  title: string;
  description: string;
  minHourlyRate: number;
  maxHourlyRate: number;
  agency: string;
  ace?: string;
  bindingAmount: number;
  status: string;
  creationDate: string;
};

export * from "./create";
export * from "./delete";
export * from "./list";
export * from "./update";
export * from "./view";
