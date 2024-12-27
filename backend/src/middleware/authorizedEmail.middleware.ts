import { RequestHandler } from "express";
import createHttpError from "http-errors";
import env from "../util/validateEnv";

export const authorizedEmail: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = (req, res, next) => {
  const authorizedEmails = env.AUTHORIZED_EMAILS.split(",");
  if (req.session.email && authorizedEmails.includes(req.session.email)) {
    next();
  } else {
    next(createHttpError(403, "User not authorized"));
  }
};
