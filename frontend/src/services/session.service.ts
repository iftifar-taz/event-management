import { LoginInputs } from "@/lib/types";
import { http } from "./base";
import { SessionResponse } from "@/interfaces/session.interfaces";
import { UserResponse } from "@/interfaces/user.interfaces";

export const createSessoin = async (
  loginInputs: LoginInputs
): Promise<UserResponse> => {
  const result = await http.post<UserResponse>("/sessions", loginInputs);
  return result.data;
};

export const deleteSessoin = async (): Promise<SessionResponse> => {
  const result = await http.delete<SessionResponse>("/sessions");
  return result.data;
};
