"use server";

import {
  CreateProposalParams,
  CreateProposalResponse,
  DeleteProposalParams,
  DeleteProposalResponse,
  GetProposalParams,
  GetProposalResponse,
  GetProposalsParams,
  GetProposalsResponse,
  UpdateProposalParams,
  UpdateProposalResponse,
} from "@/modules/proposals/types";

import { apiRequest } from ".";

export const getProposal = (params: GetProposalParams) => {
  return apiRequest<GetProposalParams, GetProposalResponse>({
    url: `/proposals/${params.id}`,
    method: "GET",
    params,
  });
};

export const getProposals = (params: GetProposalsParams) => {
  return apiRequest<GetProposalsParams, GetProposalsResponse>({
    url: `/proposals/`,
    method: "GET",
    params,
  });
};

export const createProposal = async (params: CreateProposalParams) => {
  return apiRequest<CreateProposalParams, CreateProposalResponse>({
    url: `/proposals/`,
    method: "POST",
    params,
  });
};

export const updateProposal = async (params: UpdateProposalParams) => {
  return apiRequest<UpdateProposalParams, UpdateProposalResponse>({
    url: `/proposals/${params.id}`,
    method: "PATCH",
    params,
  });
};

export const deleteProposal = async (params: DeleteProposalParams) => {
  return apiRequest<DeleteProposalParams, DeleteProposalResponse>({
    url: `/proposals/`,
    method: "DELETE",
    params,
  });
};
