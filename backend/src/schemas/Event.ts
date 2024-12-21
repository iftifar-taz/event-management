import { InferSchemaType, model, Schema, Types } from "mongoose";

export type EventStatus = "upcoming" | "ongoing" | "completed";

const eventStatuses: EventStatus[] = ["upcoming", "ongoing", "completed"];

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    registrationFee: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: eventStatuses,
    },
    createdBy: Types.ObjectId,
  },
  { timestamps: true }
);

export type Event = InferSchemaType<typeof eventSchema>;

export default model<Event>("Event", eventSchema);
