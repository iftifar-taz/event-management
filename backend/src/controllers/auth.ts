import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import UserSchema from "../schemas/User";
import mongoose from "mongoose";
import { UserResponse } from "../models/UserResponse";

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

interface RegisterBody {
  name?: string;
  email?: string;
  password?: string;
}

export const register: RequestHandler<
  unknown,
  UserResponse,
  RegisterBody,
  unknown
> = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!email || !passwordRaw) {
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
    });

    req.session.userId = newUser._id as mongoose.Types.ObjectId;
    res.status(201).json({
      _id: req.session.userId,
      name: newUser.name,
      email: newUser.email,
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
  UserResponse,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

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
      _id: req.session.userId,
      name: user.name,
      email: user.email,
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
