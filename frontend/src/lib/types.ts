import { z } from "zod";
import { loginSchema, registerSchema } from "./validations";

export type LoginInputs = z.infer<typeof loginSchema>;
export type RegisterInputs = z.infer<typeof registerSchema>;
