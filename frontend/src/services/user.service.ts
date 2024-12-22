import {
  ChangePasswordForm,
  ForgotPasswordForm,
  RegisterForm,
  ResetPasswordForm,
} from "@/lib/types";
import { http } from "./base";
import { UserResponse } from "@/interfaces/user.interfaces";
import { SessionResponse } from "@/interfaces/session.interfaces";

export const getAuthenticatedUser = async (): Promise<UserResponse> => {
  const result = await http.get<UserResponse>("/users/current");
  return result.data;
};

export const createUser = async (
  RegisterForm: RegisterForm
): Promise<UserResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...dto } = RegisterForm;
  const result = await http.post<UserResponse>("/users", dto);
  return result.data;
};

export const changeAuthenticatedUserPassword = async (
  ChangePasswordForm: ChangePasswordForm
): Promise<SessionResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmNewPassword, ...dto } = ChangePasswordForm;
  const result = await http.patch<SessionResponse>("/current/password", dto);
  return result.data;
};

export const forgotPassword = async (
  ForgotPasswordForm: ForgotPasswordForm
): Promise<SessionResponse> => {
  const result = await http.post<SessionResponse>(
    "/users/password/forgot",
    ForgotPasswordForm
  );
  return result.data;
};

export const resetPassword = async (
  ResetPasswordForm: ResetPasswordForm
): Promise<SessionResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...dto } = ResetPasswordForm;
  const result = await http.post<SessionResponse>("/users/password/reset", dto);
  return result.data;
};
