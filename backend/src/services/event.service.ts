import { Types } from "mongoose";
import EventSchema from "../schemas/Event";
import { EventResponse } from "../interfaces/event.interfaces";

export const getEvents = async (): Promise<EventResponse[]> => {
  const events = await EventSchema.find().select(
    "-updatedAt -createdAt -createdBy"
  );

  return events.map((event) => {
    return {
      _id: event._id as Types.ObjectId,
      name: event.name,
      description: event.description || "",
      startDate: event.startDate,
      endDate: event.endDate,
      registrationFee: event.registrationFee,
      status: event.status,
    };
  });
};
