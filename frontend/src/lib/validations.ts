import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const requiredString = z.string().trim();

export const loginSchema = z.object({
  email: requiredString
    .email({ message: "Invalid Email" })
    .min(1, { message: "Field is required" }),
  password: requiredString.min(1, { message: "Field is required" }),
});

export const registerSchema = z.object({
  name: requiredString.min(1, { message: "Field is required" }),
  email: requiredString
    .email({ message: "Invalid Email" })
    .min(1, { message: "Field is required" }),
  password: requiredString.min(1, { message: "Field is required" }),
  confirmPassword: requiredString.min(1, { message: "Field is required" }),
});

export const forgotPasswordSchema = z.object({
  email: requiredString
    .email({ message: "Invalid Email" })
    .min(1, { message: "Field is required" }),
});

export const resetPasswordSchema = z.object({
  password: requiredString.min(1, { message: "Field is required" }),
  confirmPassword: requiredString.min(1, { message: "Field is required" }),
});

export const changePasswordSchema = z.object({
  currentPassword: requiredString.min(1, { message: "Field is required" }),
  newPassword: requiredString.min(1, { message: "Field is required" }),
  confirmNewPassword: requiredString.min(1, { message: "Field is required" }),
});
