"use server";

import {
  CreateGigParams,
  CreateGigResponse,
  DeleteGigParams,
  DeleteGigResponse,
  GetGigParams,
  GetGigResponse,
  GetGigsParams,
  GetGigsResponse,
  UpdateGigParams,
  UpdateGigResponse,
} from "@/modules/gigs/types";

import { apiRequest } from ".";

export const getGig = (params: GetGigParams) => {
  return apiRequest<GetGigParams, GetGigResponse>({
    url: `/gigs/${params.id}`,
    method: "GET",
    params,
  });
};

export const getGigs = (params: GetGigsParams) => {
  return apiRequest<GetGigsParams, GetGigsResponse>({
    url: `/gigs/`,
    method: "GET",
    params,
  });
};

export const createGig = async (params: CreateGigParams) => {
  return apiRequest<CreateGigParams, CreateGigResponse>({
    url: `/gigs/`,
    method: "POST",
    params,
  });
};

export const updateGig = async (params: UpdateGigParams) => {
  return apiRequest<UpdateGigParams, UpdateGigResponse>({
    url: `/gigs/${params.id}`,
    method: "PATCH",
    params,
  });
};

export const deleteGig = async (params: DeleteGigParams) => {
  return apiRequest<DeleteGigParams, DeleteGigResponse>({
    url: `/gigs/`,
    method: "DELETE",
    params,
  });
};
