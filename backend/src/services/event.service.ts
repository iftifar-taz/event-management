import { Types } from "mongoose";
import EventSchema from "../schemas/Event";
import {
  CreateEventBody,
  EventResponse,
  UpdateEventBody,
} from "../interfaces/event.interfaces";
import createHttpError from "http-errors";

export const getEvents = async (): Promise<EventResponse[]> => {
  const events = await EventSchema.find().select(
    "-updatedAt -createdAt -createdBy"
  );

  return events.map((event) => {
    return {
      id: event._id as Types.ObjectId,
      name: event.name,
      description: event.description || "",
      startDate: event.startDate,
      endDate: event.endDate,
      registrationFee: event.registrationFee,
      status: event.status,
    };
  });
};

export const createEvent = async (
  body: CreateEventBody,
  userId: Types.ObjectId
): Promise<EventResponse> => {
  const { name, description, startDate, endDate, registrationFee } = body;

  if (!name || !startDate || !endDate || !registrationFee) {
    throw createHttpError(400, "Parameters missing");
  }

  const newEvent = await EventSchema.create({
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    registrationFee: registrationFee,
    status: "upcoming",
    createdBy: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    id: newEvent._id as Types.ObjectId,
    name: newEvent.name,
    description: newEvent.description!,
    startDate: newEvent.startDate,
    endDate: newEvent.endDate,
    registrationFee: newEvent.registrationFee,
    status: newEvent.status,
  };
};

export const getEvent = async (id: Types.ObjectId): Promise<EventResponse> => {
  if (!id) {
    throw createHttpError(400, "Parameters missing");
  }

  const event = await EventSchema.findById(id);
  if (!event) {
    throw createHttpError(400, "No Event found");
  }

  return {
    id: event._id as Types.ObjectId,
    name: event.name,
    description: event.description!,
    startDate: event.startDate,
    endDate: event.endDate,
    registrationFee: event.registrationFee,
    status: event.status,
  };
};

export const updateEvent = async (
  id: Types.ObjectId,
  body: UpdateEventBody
): Promise<EventResponse> => {
  const { name, description, startDate, endDate, registrationFee, status } =
    body;

  if (!id || !name || !startDate || !endDate || !registrationFee || !status) {
    throw createHttpError(400, "Parameters missing");
  }

  const event = await EventSchema.findById(id);
  if (!event) {
    throw createHttpError(400, "No Event found");
  }

  event.name = name;
  event.description = description;
  event.startDate = startDate;
  event.endDate = endDate;
  event.registrationFee = registrationFee;
  event.status = status;
  event.updatedAt = new Date();
  await event.save();

  return {
    id: event._id as Types.ObjectId,
    name: event.name,
    description: event.description!,
    startDate: event.startDate,
    endDate: event.endDate,
    registrationFee: event.registrationFee,
    status: event.status,
  };
};

export const deleteEvent = async (id: Types.ObjectId): Promise<void> => {
  if (!id) {
    throw createHttpError(400, "Parameters missing");
  }

  const event = await EventSchema.findById(id);
  if (!event) {
    throw createHttpError(400, "No Event found");
  }
  await event.deleteOne();
};
