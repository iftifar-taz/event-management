import { LoginInputs, RegisterInputs } from "@/lib/types";
import { http } from "./base";
import { User } from "@/models/User";

export const getCurrentUser = async (): Promise<User> => {
  const result = await http.get<User>("/auth/user");
  return result.data;
};

export const login = async (loginInputs: LoginInputs): Promise<User> => {
  const result = await http.post<User>("/auth/login", loginInputs);
  return result.data;
};

export const register = async (
  registerInputs: RegisterInputs
): Promise<User> => {
  const result = await http.post<User>("/auth/register", registerInputs);
  return result.data;
};

export const logout = async (): Promise<void> => {
  await http.post<User>("/auth/logout");
};
