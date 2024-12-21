import {
  ForgotPasswordInputs,
  LoginInputs,
  RegisterInputs,
  ResetPasswordInputs,
} from "@/lib/types";
import { http } from "./base";
import { AuthResponse } from "@/models/AuthResponse";

export const login = async (
  loginInputs: LoginInputs
): Promise<AuthResponse> => {
  const result = await http.post<AuthResponse>("/auth/login", loginInputs);
  return result.data;
};

export const register = async (
  registerInputs: RegisterInputs
): Promise<AuthResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...dto } = registerInputs;
  const result = await http.post<AuthResponse>("/auth/register", dto);
  return result.data;
};

export const logout = async (): Promise<void> => {
  await http.post("/auth/logout");
};

export const forgotPassword = async (
  forgotPasswordInputs: ForgotPasswordInputs
): Promise<AuthResponse> => {
  const result = await http.post<AuthResponse>(
    "/auth/password/forgot",
    forgotPasswordInputs
  );
  return result.data;
};

export const resetPassword = async (
  resetPasswordInputs: ResetPasswordInputs
): Promise<AuthResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...dto } = resetPasswordInputs;
  const result = await http.post<AuthResponse>("/auth/password/reset", dto);
  return result.data;
};
