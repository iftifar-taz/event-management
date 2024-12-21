import createHttpError from "http-errors";
import { RequestHandler } from "express";
import UserSchema from "../schemas/User";
import mongoose from "mongoose";
import { AuthResponse } from "../models/AuthResponse";
import bcrypt from "bcrypt";

interface UserResponse {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
}

export const getAuthenticatedUser: RequestHandler<
  unknown,
  UserResponse,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const user = await UserSchema.findById(req.session.userId)
      .select("+email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid session");
    }

    res.status(200).json({
      _id: user._id as mongoose.Types.ObjectId,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

interface ChangePasswordBody {
  currentPassword: string;
  newPassword: string;
}

export const changePassword: RequestHandler<
  unknown,
  AuthResponse,
  ChangePasswordBody,
  unknown
> = async (req, res, next) => {
  try {
    const { currentPassword: currentPasswordRaw, newPassword: newPasswordRaw } =
      req.body;

    const user = await UserSchema.findById(req.session.userId)
      .select("+password")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(
      currentPasswordRaw,
      user.password
    );

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordHashed = await bcrypt.hash(newPasswordRaw, 10);

    user.password = passwordHashed;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    res.status(200).json({
      isSuccess: true,
      message: "Password change successful",
    });
  } catch (error) {
    next(error);
  }
};
