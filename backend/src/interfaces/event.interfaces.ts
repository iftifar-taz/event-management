import { Types } from "mongoose";
import { EventStatus } from "../schemas/Event";

export interface EventResponse {
  _id: Types.ObjectId;
  name: string;
  description: string;
  startDate: NativeDate;
  endDate: NativeDate;
  registrationFee: number;
  status: EventStatus;
}
