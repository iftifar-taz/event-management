import { LoginInputs, RegisterInputs } from "@/lib/types";
import { http } from "./base";
import { User } from "@/models/User";

export const login = async (loginInputs: LoginInputs): Promise<User> => {
  const result = await http.post<User>("/auth/login", loginInputs);
  console.log(result);
  // TO:DO implement return model
  return {
    email: "asd",
  };
};

export const register = async (
  registerInputs: RegisterInputs
): Promise<User> => {
  const result = await http.post<User>("/auth/register", registerInputs);
  console.log(result);
  // TO:DO implement return model
  return {
    email: "asd",
  };
};

export const logout = async (): Promise<void> => {
  await http.post<User>("/auth/logout");
};
