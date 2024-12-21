import { RequestHandler } from "express";
import EventSchema, { EventStatus } from "../schemas/Event";
import { Types } from "mongoose";

interface EventResponse {
  _id: Types.ObjectId;
  name: string;
  description: string;
  startDate: NativeDate;
  endDate: NativeDate;
  registrationFee: number;
  status: EventStatus;
}

export const getAllEvent: RequestHandler<
  unknown,
  EventResponse[],
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const events = await EventSchema.find().select(
      "-updatedAt -createdAt -createdBy"
    );

    res.status(200).json(
      events.map((event) => {
        return {
          _id: event._id as Types.ObjectId,
          name: event.name,
          description: event.description || "",
          startDate: event.startDate,
          endDate: event.endDate,
          registrationFee: event.registrationFee,
          status: event.status,
        };
      })
    );
  } catch (error) {
    next(error);
  }
};
