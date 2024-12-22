export type EventStatus = "upcoming" | "ongoing" | "completed";

export interface EventResponse {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  registrationFee: number;
  status: EventStatus;
}
