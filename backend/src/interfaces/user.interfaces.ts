import { Types } from "mongoose";

export interface CreateUserBody {
  name?: string;
  email?: string;
  password?: string;
}

export interface ForgotPasswordBody {
  email?: string;
}

export interface ResetPasswordBody {
  token: string;
  password: string;
}

export interface ChangeAuthenticatedUserPasswordBody {
  currentPassword: string;
  newPassword: string;
}

export interface UserResponse {
  id: Types.ObjectId;
  name: string;
  email: string;
}
