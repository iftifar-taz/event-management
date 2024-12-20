import { LoginInputs, RegisterInputs } from "@/lib/types";
import { http } from "./base";
import { User } from "@/models/User";

export const login = async (loginInputs: LoginInputs): Promise<User> => {
  const result = await http.post<User>("/login", loginInputs);
  // TO:DO implement return model
  return {
    id: "1",
    email: "asd",
  };
};

export const register = async (
  registerInputs: RegisterInputs
): Promise<User> => {
  const result = await http.post<User>("/register", registerInputs);
  // TO:DO implement return model
  return {
    id: "1",
    email: "asd",
  };
};
