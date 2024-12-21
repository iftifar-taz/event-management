import { ChangePasswordInputs } from "@/lib/types";
import { http } from "./base";
import { User } from "@/models/User";
import { AuthResponse } from "@/models/AuthResponse";

export const getCurrentUser = async (): Promise<User> => {
  const result = await http.get<User>("/users/current");
  return result.data;
};

export const changePassword = async (
  changePasswordInputs: ChangePasswordInputs
): Promise<AuthResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmNewPassword, ...dto } = changePasswordInputs;
  const result = await http.patch<AuthResponse>("/current/password", dto);
  return result.data;
};
