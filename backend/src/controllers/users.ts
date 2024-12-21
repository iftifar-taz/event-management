import createHttpError from "http-errors";
import { RequestHandler } from "express";
import UserSchema from "../schemas/User";
import mongoose from "mongoose";

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
