import {
  CreateUserParams,
  CreateUserResponse,
  DeleteUserParams,
  DeleteUserResponse,
  GetUserParams,
  GetUserResponse,
  GetUsersParams,
  GetUsersResponse,
  UpdateUserParams,
  UpdateUserResponse,
} from "@/lib/types";

import { apiRequest } from ".";

export const getUser = (params: GetUserParams) => {
  return apiRequest<GetUserParams, GetUserResponse>({
    url: `/users/${params.id}`,
    method: "GET",
    params,
  });
};

export const getUsers = (params: GetUsersParams) => {
  return apiRequest<GetUsersParams, GetUsersResponse>({
    url: `/users/`,
    method: "GET",
    params,
  });
};

export const createUser = async (params: CreateUserParams) => {
  "use server";

  return apiRequest<CreateUserParams, CreateUserResponse>({
    url: `/users/`,
    method: "POST",
    params,
  });
};

export const updateUser = async (params: UpdateUserParams) => {
  "use server";

  return apiRequest<UpdateUserParams, UpdateUserResponse>({
    url: `/users/${params.id}`,
    method: "PATCH",
    params,
  });
};

export const deleteUser = async (params: DeleteUserParams) => {
  "use server";

  return apiRequest<DeleteUserParams, DeleteUserResponse>({
    url: `/users/`,
    method: "DELETE",
    params,
  });
};
