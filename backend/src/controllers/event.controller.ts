import { RequestHandler } from "express";
import {
  CreateEventBody,
  EventResponse,
  UpdateEventBody,
} from "../interfaces/event.interfaces";
import * as eventService from "../services/event.service";
import { Types } from "mongoose";

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

export const createEvent: RequestHandler<
  unknown,
  EventResponse,
  CreateEventBody,
  unknown
> = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.body, req.session.userId!);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const getEvent: RequestHandler<
  { id: Types.ObjectId },
  EventResponse,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventService.getEvent(id);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent: RequestHandler<
  { id: Types.ObjectId },
  EventResponse,
  UpdateEventBody,
  unknown
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventService.updateEvent(id, req.body);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent: RequestHandler<
  { id: Types.ObjectId },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    await eventService.deleteEvent(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
