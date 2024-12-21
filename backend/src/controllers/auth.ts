import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import UserSchema from "../schemas/User";
import mongoose from "mongoose";
import crypto from "crypto";
import env from "../util/validateEnv";
import { AuthResponse } from "../models/AuthResponse";

interface RegisterBody {
  name?: string;
  email?: string;
  password?: string;
}

export const register: RequestHandler<
  unknown,
  AuthResponse,
  RegisterBody,
  unknown
> = async (req, res, next) => {
  const { name, email, password: passwordRaw } = req.body;

  try {
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

    req.session.userId = newUser._id as mongoose.Types.ObjectId;
    res.status(201).json({
      isSuccess: true,
      message: "Registration successsful",
    });
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  email?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  AuthResponse,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await UserSchema.findOne({ email: email })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id as mongoose.Types.ObjectId;
    res.status(201).json({
      isSuccess: true,
      message: "Login successsful",
    });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};

interface ForgotPasswordBody {
  email?: string;
}

export const forgotPassword: RequestHandler<
  unknown,
  AuthResponse,
  ForgotPasswordBody,
  unknown
> = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = new Date(resetTokenExpiresAt);

    await user.save();

    // TO:DO send email

    res.status(200).json({
      isSuccess: true,
      message: `Reset password link ${env.CLIENT_URL}/reset-password/${resetToken}`,
    });
  } catch (error) {
    next(error);
  }
};

interface ResetPasswordBody {
  token: string;
  password: string;
}

export const resetPassword: RequestHandler<
  unknown,
  AuthResponse,
  ResetPasswordBody,
  unknown
> = async (req, res, next) => {
  try {
    const { token, password: passwordRaw } = req.body;

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

    res.status(200).json({
      isSuccess: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};
