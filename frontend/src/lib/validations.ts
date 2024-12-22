import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const requiredString = z.string().trim();
export const requiredDate = z.date().refine((val) => !isNaN(val.getTime()), {
  message: "Invalid date format",
});

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

export const createEventForm = z.object({
  name: requiredString.min(1, { message: "Field is required" }),
  description: optionalString,
  startDate: requiredDate,
  endDate: requiredDate,
  registrationFee: z.number().min(1, { message: "Field is required" }),
});

export const updateEventForm = z.object({
  ...createEventForm.shape,
  status: requiredString.min(1, { message: "Field is required" }),
});
