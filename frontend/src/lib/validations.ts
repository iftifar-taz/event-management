import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const requiredString = z.string().trim();

export const loginForm = z.object({
  email: requiredString
    .email({ message: "Invalid Email" })
    .min(1, { message: "Field is required" }),
  password: requiredString.min(1, { message: "Field is required" }),
});

export const registerForm = z
  .object({
    name: requiredString.min(1, { message: "Field is required" }),
    email: requiredString
      .email({ message: "Invalid Email" })
      .min(1, { message: "Field is required" }),
    password: requiredString.min(1, { message: "Field is required" }),
    confirmPassword: requiredString.min(1, { message: "Field is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordForm = z.object({
  email: requiredString
    .email({ message: "Invalid Email" })
    .min(1, { message: "Field is required" }),
});

export const resetPasswordForm = z
  .object({
    password: requiredString.min(1, { message: "Field is required" }),
    confirmPassword: requiredString.min(1, { message: "Field is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const changePasswordForm = z
  .object({
    currentPassword: requiredString.min(1, { message: "Field is required" }),
    newPassword: requiredString.min(1, { message: "Field is required" }),
    confirmNewPassword: requiredString.min(1, { message: "Field is required" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password do not match",
    path: ["confirmNewPassword"],
  });

export const eventForm = z.object({
  name: requiredString.min(1, { message: "Field is required" }),
  description: optionalString,
  startDate: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
  endDate: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
  registrationFee: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(0, "Field is required")
  ),
  status: requiredString.min(1, { message: "Field is required" }),
});
