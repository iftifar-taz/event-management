import { LoginForm } from "@/lib/types";
import { http } from "./base";
import { SessionResponse } from "@/interfaces/session.interfaces";
import { UserResponse } from "@/interfaces/user.interfaces";

export const createSessoin = async (
  LoginForm: LoginForm
): Promise<UserResponse> => {
  const result = await http.post<UserResponse>("/sessions", LoginForm);
  return result.data;
};

export const deleteSessoin = async (): Promise<SessionResponse> => {
  const result = await http.delete<SessionResponse>("/sessions");
  return result.data;
};
