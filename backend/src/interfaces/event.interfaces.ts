import { Types } from "mongoose";
import { EventStatus } from "../schemas/Event";

export interface EventResponse {
  id: Types.ObjectId;
  name: string;
  description: string;
  startDate: NativeDate;
  endDate: NativeDate;
  registrationFee: number;
  status: EventStatus;
}

export interface CreateEventBody {
  name: string;
  description: string;
  startDate: NativeDate;
  endDate: NativeDate;
  registrationFee: number;
}

export interface UpdateEventBody {
  name: string;
  description: string;
  startDate: NativeDate;
  endDate: NativeDate;
  registrationFee: number;
  status: EventStatus;
}
