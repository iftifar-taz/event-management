import { z } from "zod";
import { signInSchema, signUpSchema } from "./validations";

export type SignInInputs = z.infer<typeof signInSchema>;
export type SignUpInputs = z.infer<typeof signUpSchema>;
