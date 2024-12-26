import { z } from "zod";
import {
  changePasswordForm,
  eventForm,
  forgotPasswordForm,
  loginForm,
  registerForm,
  resetPasswordForm,
} from "./validations";

export type LoginForm = z.infer<typeof loginForm>;
export type RegisterForm = z.infer<typeof registerForm>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordForm>;
export type ResetPasswordForm = z.infer<typeof resetPasswordForm>;
export type ChangePasswordForm = z.infer<typeof changePasswordForm>;

export type EventForm = z.infer<typeof eventForm>;
