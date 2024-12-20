import { SignInInputs } from "@/lib/types";
import { http } from "./base";
import { User } from "@/models/User";

export const signin = async (signInInputs: SignInInputs): Promise<User> => {
  const result = await http.post<User>("/sign-in", signInInputs);
  // TO:DO implement return model
  return {
    id: "1",
    email: "asd",
  };
};

export const signup = async (signUpInputs: SignUpInputs): Promise<User> => {
  const result = await http.post<User>("/sign-up", signUpInputs);
  // TO:DO implement return model
  return {
    id: "1",
    email: "asd",
  };
};
