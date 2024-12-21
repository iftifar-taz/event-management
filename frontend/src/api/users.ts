import { http } from "./base";
import { User } from "@/models/User";

export const getCurrentUser = async (): Promise<User> => {
  const result = await http.get<User>("/users/current");
  return result.data;
};
