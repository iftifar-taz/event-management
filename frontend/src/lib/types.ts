import { z } from "zod";
import {
  changePasswordForm,
  createEventForm,
  forgotPasswordForm,
  loginForm,
  registerForm,
  resetPasswordForm,
  updateEventForm,
} from "./validations";

export type LoginForm = z.infer<typeof loginForm>;
export type RegisterForm = z.infer<typeof registerForm>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordForm>;
export type ResetPasswordForm = z.infer<typeof resetPasswordForm>;
export type ChangePasswordForm = z.infer<typeof changePasswordForm>;

export type CreateEventForm = z.infer<typeof createEventForm>;
export type UpdateEventForm = z.infer<typeof updateEventForm>;
