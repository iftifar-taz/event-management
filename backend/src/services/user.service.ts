import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import UserSchema from "../schemas/User";
import {
  ChangeAuthenticatedUserPasswordBody,
  CreateUserBody,
  ResetPasswordBody,
  UserResponse,
} from "../interfaces/user.interfaces";
import { Types } from "mongoose";
import { CreateSessionBody } from "../interfaces/session.interfaces";
import crypto from "crypto";

export const findUserByEmailAndPassword = async (
  body: CreateSessionBody
): Promise<UserResponse> => {
  const { email, password } = body;

  if (!email || !password) {
    throw createHttpError(400, "Parameters missing");
  }

  const user = await UserSchema.findOne({ email })
    .select("+password +email")
    .exec();

  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw createHttpError(401, "Invalid credentials");
  }

  return {
    id: user._id as Types.ObjectId,
    name: user.name,
    email: user.email,
  };
};

export const createUser = async (
  body: CreateUserBody
): Promise<UserResponse> => {
  const { name, email, password: passwordRaw } = body;

  if (!name || !email || !passwordRaw) {
    throw createHttpError(400, "Parameters missing");
  }

  const existingEmail = await UserSchema.findOne({ email: email }).exec();

  if (existingEmail) {
    throw createHttpError(
      409,
      "A user with this email address already exists. Please log in instead."
    );
  }

  const passwordHashed = await bcrypt.hash(passwordRaw, 10);

  const newUser = await UserSchema.create({
    name: name,
    email: email,
    password: passwordHashed,
    resetPasswordToken: undefined,
    resetPasswordExpiresAt: undefined,
  });

  return {
    id: newUser._id as Types.ObjectId,
    name: newUser.name,
    email: newUser.email,
  };
};

export const getAuthenticatedUser = async (
  userId?: Types.ObjectId
): Promise<UserResponse> => {
  if (!userId) {
    throw createHttpError(401, "Invalid credentials");
  }

  const user = await UserSchema.findById(userId).select("+email").exec();

  if (!user) {
    throw createHttpError(401, "Invalid session");
  }

  return {
    id: user._id as Types.ObjectId,
    name: user.name,
    email: user.email,
  };
};

export const changeAuthenticatedUserPassword = async (
  body: ChangeAuthenticatedUserPasswordBody,
  userId?: Types.ObjectId
): Promise<void> => {
  if (!userId) {
    throw createHttpError(401, "Invalid credentials");
  }

  const user = await UserSchema.findById(userId).select("+email").exec();

  if (!user) {
    throw createHttpError(401, "Invalid session");
  }

  const { currentPassword: currentPasswordRaw, newPassword: newPasswordRaw } =
    body;

  const passwordMatch = await bcrypt.compare(currentPasswordRaw, user.password);

  if (!passwordMatch) {
    throw createHttpError(401, "Invalid credentials");
  }

  const passwordHashed = await bcrypt.hash(newPasswordRaw, 10);

  user.password = passwordHashed;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();
};

export const generateResetPasswordToken = async (
  email?: string
): Promise<string> => {
  if (!email) {
    throw createHttpError(401, "Invalid credentials");
  }
  const user = await UserSchema.findOne({ email });

  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiresAt = new Date(resetTokenExpiresAt);

  await user.save();
  return resetToken;
};

export const resetPassword = async (body: ResetPasswordBody): Promise<void> => {
  const { token, password: passwordRaw } = body;

  const user = await UserSchema.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }

  const passwordHashed = await bcrypt.hash(passwordRaw, 10);

  user.password = passwordHashed;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();
};
