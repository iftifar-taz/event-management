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
  const result = await http.post<AuthResponse>(
    "/users/current/password/change",
    changePasswordInputs
  );
  return result.data;
};
