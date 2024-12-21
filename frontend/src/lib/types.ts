import { z } from "zod";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./validations";

export type LoginInputs = z.infer<typeof loginSchema>;
export type RegisterInputs = z.infer<typeof registerSchema>;
export type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInputs = z.infer<typeof changePasswordSchema>;
