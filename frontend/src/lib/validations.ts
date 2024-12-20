import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const requiredString = z.string().trim();

export const signInSchema = z.object({
  email: requiredString
    .email({ message: "Invalid Email" })
    .min(1, { message: "Field is required" }),
  password: requiredString.min(1, { message: "Field is required" }),
});

export const signUpSchema = z.object({
  email: requiredString
    .email({ message: "Invalid Email" })
    .min(1, { message: "Field is required" }),
  password: requiredString.min(1, { message: "Field is required" }),
  confirmPassword: requiredString.min(1, { message: "Field is required" }),
});
