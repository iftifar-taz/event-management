import { RequestHandler } from "express";
import { SessionResponse } from "../interfaces/session.interfaces";
import {
  CreateUserBody,
  ForgotPasswordBody,
  ResetPasswordBody,
  UserResponse,
  ChangeAuthenticatedUserPasswordBody,
} from "../interfaces/user.interfaces";
import * as userService from "../services/user.service";
import * as emailService from "../services/email.service";

export const createUser: RequestHandler<
  unknown,
  UserResponse,
  CreateUserBody,
  unknown
> = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    req.session.userId = newUser.id;
    req.session.email = newUser.email;
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const forgotPassword: RequestHandler<
  unknown,
  SessionResponse,
  ForgotPasswordBody,
  unknown
> = async (req, res, next) => {
  try {
    const resetToken = await userService.generateResetPasswordToken(
      req.body.email
    );
    await emailService.sendResetpasswordEmail(req.body.email!, resetToken);
    res.status(200).json({
      isSuccess: true,
      message: `Reset token: ${resetToken}`,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword: RequestHandler<
  unknown,
  SessionResponse,
  ResetPasswordBody,
  unknown
> = async (req, res, next) => {
  try {
    await userService.resetPassword(req.body);
    res.status(200).json({
      isSuccess: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};

export const getAuthenticatedUser: RequestHandler<
  unknown,
  UserResponse,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const user = await userService.getAuthenticatedUser(req.session.userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const changeAuthenticatedUserPassword: RequestHandler<
  unknown,
  SessionResponse,
  ChangeAuthenticatedUserPasswordBody,
  unknown
> = async (req, res, next) => {
  try {
    await userService.changeAuthenticatedUserPassword(
      req.body,
      req.session.userId
    );

    res.status(200).json({
      isSuccess: true,
      message: "Password change successful",
    });
  } catch (error) {
    next(error);
  }
};
