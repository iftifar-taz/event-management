import { RequestHandler } from "express";
import * as userService from "../services/user.service";
import {
  CreateSessionBody,
  SessionResponse,
} from "../interfaces/session.interfaces";

export const createSession: RequestHandler<
  unknown,
  SessionResponse,
  CreateSessionBody,
  unknown
> = async (req, res, next) => {
  try {
    const user = await userService.findUserByEmailAndPassword(req.body);
    req.session.userId = user.id;
    req.session.email = user.email;
    res.status(201).json({
      isSuccess: true,
      message: "Session created",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSession: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (!error) {
      res.status(200).json({
        isSuccess: true,
        message: "Session deleted",
      });
    } else {
      next(error);
    }
  });
};
