import {
  ChangePasswordInputs,
  ForgotPasswordInputs,
  RegisterInputs,
  ResetPasswordInputs,
} from "@/lib/types";
import { http } from "./base";
import { UserResponse } from "@/interfaces/user.interfaces";

export const getCurrentUser = async (): Promise<UserResponse> => {
  const result = await http.get<UserResponse>("/users/current");
  return result.data;
};

export const createUser = async (
  registerInputs: RegisterInputs
): Promise<UserResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...dto } = registerInputs;
  const result = await http.post<UserResponse>("/users", dto);
  return result.data;
};

export const changePassword = async (
  changePasswordInputs: ChangePasswordInputs
): Promise<UserResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmNewPassword, ...dto } = changePasswordInputs;
  const result = await http.patch<UserResponse>("/current/password", dto);
  return result.data;
};

export const forgotPassword = async (
  forgotPasswordInputs: ForgotPasswordInputs
): Promise<UserResponse> => {
  const result = await http.post<UserResponse>(
    "/auth/password/forgot",
    forgotPasswordInputs
  );
  return result.data;
};

export const resetPassword = async (
  resetPasswordInputs: ResetPasswordInputs
): Promise<UserResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...dto } = resetPasswordInputs;
  const result = await http.post<UserResponse>("/auth/password/reset", dto);
  return result.data;
};
