import { Gig } from ".";

export type CreateGigParams = {
  id: number;
  title: string;
  description: string;
  minHourlyRate: number;
  maxHourlyRate: number;
  agency: string;
  bindingAmount: number;
};

export type CreateGigResponse = {
  data: Gig;
  message: string;
  status: "success" | "error";
};
