import { RequestHandler } from "express";
import { EventResponse } from "../interfaces/event.interfaces";
import * as eventService from "../services/event.service";

export const getEvents: RequestHandler<
  unknown,
  EventResponse[],
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const events = await eventService.getEvents();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};
