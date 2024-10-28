import { User } from ".";

export interface UpdateUserParams {
  id: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  password?: string;
  newPassword?: string;
}

export interface UpdateUserResponse {
  data: User;
}
